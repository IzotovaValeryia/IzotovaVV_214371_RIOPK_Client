import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import BidService from "../../services/BidService";
import Select from "react-select";
import ApplicationUserService from "../../services/ApplicationUserService";
import SupportMeasureService from "../../services/SupportMeasureService";
import StatusBidService from "../../services/StatusBidService";

class CreateBidComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectOptionsSupportMeasure: [],
      oIdSupportMeasure: "",
      oNameSupportMeasure: "",

id: this.props.match.params.id, errors: null,
      comment: '',
      }

    //Handlers
    this.changeCommentHandler = this.changeCommentHandler.bind(this);

    //void
    this.saveBid = this.saveBid.bind(this);
  }

  //#region Handlers For Select

  handleChangeApplicationUser(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdApplicationUser: e.value, oNameApplicationUser: e.label });
  }

  handleChangeSupportMeasure(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdSupportMeasure: e.value, oNameSupportMeasure: e.label });
  }

  handleChangeStatusBid(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdStatusBid: e.value, oNameStatusBid: e.label });
  }

  //#endregion

  componentDidMount() {
    //SupportMeasure
    SupportMeasureService.getSupportMeasure().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.shortName,
      }));
      this.setState({ selectOptionsSupportMeasure: options });
    });

    }//void Save Bid
  saveBid = (e) => {
    e.preventDefault();
    let bidjson = {
      applicationUserId: JSON.parse(localStorage.getItem("user")).idUser,
      supportMeasureId: this.state.oIdSupportMeasure,
      statusBidId: 1,
      comment: '',
    };
    console.log("bidjson => " + JSON.stringify(bidjson));

    BidService.createBid(bidjson)
      .then((response) => {
        this.setState({ loading: false, statusCode: response.status });
        this.props.history.push("/bid-user");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false, errors: error.response.data.errors });
      });
  };

  changeCommentHandler = (event) => {
    this.setState({ comment: event.target.value });
  };

  cancel() {
    this.props.history.push("/bid-user");
    window.location.reload();
  }



  render() {

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <div className="card-body">
                <form>

                  <div className="form-group">
                    <label>
                      Выберите соцподдержку:
                      <Select
                        placeholder={<div>Выберите соцподдержку</div>}
                        options={this.state.selectOptionsSupportMeasure}
                        onChange={this.handleChangeSupportMeasure.bind(this)}
                      />
                    </label>
                  </div>

                  <button className="btn btn-success" onClick={this.saveBid}>
                    <i class="fa-solid fa-floppy-disk"></i> Сохранить
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    <i class="fa-solid fa-xmark"></i> Закрыть
                  </button>
                </form>  <br></br>
                {this.state.errors && (
                  <div>
                    <Alert variant="danger">
                      <Alert.Heading>
                        Ошибка при добавлении.
                      </Alert.Heading>
                      {Object.keys(this.state.errors).map((key) => (
                        <p>{this.state.errors[key]}</p>
                      ))}
                    </Alert>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBidComponent;