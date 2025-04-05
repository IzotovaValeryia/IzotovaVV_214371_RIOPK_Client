import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import StatusBidService from "../../services/StatusBidService";

class UpdateStatusBidComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
id: this.props.match.params.id, errors: null,
      name: '',
      }

    //Handlers
    this.changeNameHandler = this.changeNameHandler.bind(this);

    //void
    this.updateStatusBid = this.updateStatusBid.bind(this);
  }

  //#region Handlers For Select

  //#endregion

  componentDidMount() {
    StatusBidService.getStatusBidById(this.state.id).then((res) => {
      let statusbidjson = res.data;
      this.setState({
        name: statusbidjson.name,
      });
    });}//void Update StatusBid
  updateStatusBid = (e) => {
    e.preventDefault();
    let statusbidjson = {id: this.state.id,
      name: this.state.name,
    };
    console.log("statusbidjson => " + JSON.stringify(statusbidjson));

    StatusBidService.updateStatusBid(statusbidjson)
      .then((response) => {
        this.setState({ statusCode: response.status });
        this.props.history.push("/statusbid");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errors: error.response.data.errors });
      });
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  cancel() {
    this.props.history.push("/statusbid");
    window.location.reload();
  }



  render() {

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3"><br></br>
              <h3 className="text-center">Редактирование Статуса заявки</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Название: </label>
                    <input
                      placeholder="Название"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.changeNameHandler}
                    />
                  </div>



                  <button className="btn btn-success" onClick={this.updateStatusBid}>
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
                        Ошибка при редактировании.
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

export default UpdateStatusBidComponent;