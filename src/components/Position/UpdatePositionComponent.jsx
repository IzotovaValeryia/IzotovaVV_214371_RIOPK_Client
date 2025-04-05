import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import PositionService from "../../services/PositionService";

class UpdatePositionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
id: this.props.match.params.id, errors: null,
      nameposition: '',
      }

    //Handlers
    this.changeNamePositionHandler = this.changeNamePositionHandler.bind(this);

    //void
    this.updatePosition = this.updatePosition.bind(this);
  }

  //#region Handlers For Select

  //#endregion

  componentDidMount() {
    PositionService.getPositionById(this.state.id).then((res) => {
      let positionjson = res.data;
      this.setState({
        nameposition: positionjson.namePosition,
      });
    });}//void Update Position
  updatePosition = (e) => {
    e.preventDefault();
    let positionjson = {id: this.state.id,
      namePosition: this.state.nameposition,
    };
    console.log("positionjson => " + JSON.stringify(positionjson));

    PositionService.updatePosition(positionjson)
      .then((response) => {
        this.setState({ statusCode: response.status });
        this.props.history.push("/position");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errors: error.response.data.errors });
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
            <div className="card col-md-6 offset-md-3 offset-md-3"><br></br>
              <h3 className="text-center">Редактирование Должности</h3>
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



                  <button className="btn btn-success" onClick={this.updatePosition}>
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

export default UpdatePositionComponent;