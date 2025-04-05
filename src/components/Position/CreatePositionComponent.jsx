import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import PositionService from "../../services/PositionService";

class CreatePositionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
id: this.props.match.params.id, errors: null,
      nameposition: '',
      }

    //Handlers
    this.changeNamePositionHandler = this.changeNamePositionHandler.bind(this);

    //void
    this.savePosition = this.savePosition.bind(this);
  }

  //#region Handlers For Select

  //#endregion

  componentDidMount() {
    }//void Save Position
  savePosition = (e) => {
    e.preventDefault();
    let positionjson = {
      nameposition: this.state.nameposition,
    };
    console.log("positionjson => " + JSON.stringify(positionjson));

    PositionService.createPosition(positionjson)
      .then((response) => {
        this.setState({ loading: false, statusCode: response.status });
        this.props.history.push("/position");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false, errors: error.response.data.errors });
      });
  };

  changeNamePositionHandler = (event) => {
    this.setState({ nameposition: event.target.value });
  };

  cancel() {
    this.props.history.push("/position");
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
                    <label> Название должности: </label>
                    <input
                      placeholder="Название должности"
                      name="nameposition"
                      className="form-control"
                      value={this.state.nameposition}
                      onChange={this.changeNamePositionHandler}
                    />
                  </div>



                  <button className="btn btn-success" onClick={this.savePosition}>
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
                        Ошибка при добавлении элемента.
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

export default CreatePositionComponent;