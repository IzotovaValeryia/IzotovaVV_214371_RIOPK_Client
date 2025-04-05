import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import BidService from "../../services/BidService";
import Select from "react-select";
import ApplicationUserService from "../../services/ApplicationUserService";
import SupportMeasureService from "../../services/SupportMeasureService";
import StatusBidService from "../../services/StatusBidService";

class UpdateBidComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectOptionsApplicationUser: [],
      oIdApplicationUser: "",
      oNameApplicationUser: "",


      selectOptionsSupportMeasure: [],
      oIdSupportMeasure: "",
      oNameSupportMeasure: "",


      selectOptionsStatusBid: [],
      oIdStatusBid: "",
      oNameStatusBid: "",


id: this.props.match.params.id, errors: null,
      comment: "",
      }

    //Handlers
    this.changeCommentHandler = this.changeCommentHandler.bind(this);

    //void
    this.updateBid = this.updateBid.bind(this);
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
    //ApplicationUser
    ApplicationUserService.getApplicationUsers().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.email,
      }));
      this.setState({ selectOptionsApplicationUser: options });
    });

    //SupportMeasure
    SupportMeasureService.getSupportMeasure().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.shortName,
      }));
      this.setState({ selectOptionsSupportMeasure: options });
    });

    //StatusBid
    StatusBidService.getStatusBid().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.name,
      }));
      this.setState({ selectOptionsStatusBid: options });
    });

    BidService.getBidById(this.state.id).then((res) => {
      let bidjson = res.data;
      this.setState({
        oIdApplicationUser: bidjson.applicationUser.id,
        oNameApplicationUser: bidjson.applicationUser.email,
        oIdSupportMeasure: bidjson.supportMeasure.id,
        oNameSupportMeasure: bidjson.supportMeasure.shortName,
        oIdStatusBid: bidjson.statusBid.id,
        oNameStatusBid: bidjson.statusBid.name,
        comment: bidjson.сomment,
      });
    });}//void Update Bid
  updateBid = (e) => {
    e.preventDefault();
    let bidjson = {
        id: this.state.id,
        comment: this.state.comment,
        applicationUserId: this.state.oIdApplicationUser,
        supportMeasureId: this.state.oIdSupportMeasure,
        statusBidId: this.state.oIdStatusBid
    };
    console.log("bidjson => " + JSON.stringify(bidjson));

    BidService.updateBid(bidjson)
      .then((response) => {
        this.setState({ statusCode: response.status });
        this.props.history.push("/bid");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errors: error.response.data.errors });
      });
  };

  changeCommentHandler = (event) => {
    this.setState({ comment: event.target.value });
  };

  cancel() {
    this.props.history.push("/bid");
    window.location.reload();
  }



  render() {

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3"><br></br>
              <h3 className="text-center">Редактирование Заявки</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>
                      Выберите пользователь:
                      <Select
                        placeholder={<div>Выберите пользователь</div>}
value={{
                          id: this.state.oIdApplicationUser,
                          label: this.state.oNameApplicationUser,
                        }}                        options={this.state.selectOptionsApplicationUser}
                        onChange={this.handleChangeApplicationUser.bind(this)}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите соцподдержка:
                      <Select
                        placeholder={<div>Выберите соцподдержка</div>}
value={{
                          id: this.state.oIdSupportMeasure,
                          label: this.state.oNameSupportMeasure,
                        }}                        options={this.state.selectOptionsSupportMeasure}
                        onChange={this.handleChangeSupportMeasure.bind(this)}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите статус:
                      <Select
                        placeholder={<div>Выберите статус</div>}
value={{
                          id: this.state.oIdStatusBid,
                          label: this.state.oNameStatusBid,
                        }}                        options={this.state.selectOptionsStatusBid}
                        onChange={this.handleChangeStatusBid.bind(this)}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label> Комментарий: </label>
                    <input
                      placeholder="Комментарий"
                      name="comment"
                      className="form-control"
                      value={this.state.comment}
                      onChange={this.changeCommentHandler}
                    />
                  </div>



                  <button className="btn btn-success" onClick={this.updateBid}>
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
                        Ошибка при редактировании элемента.
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

export default UpdateBidComponent;