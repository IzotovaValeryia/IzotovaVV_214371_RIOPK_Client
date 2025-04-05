import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import LevelDisabilityService from "../../services/LevelDisabilityService";

class CreateLevelDisabilityComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
id: this.props.match.params.id, errors: null,
      name: '',
      }

    //Handlers
    this.changeNameHandler = this.changeNameHandler.bind(this);

    //void
    this.saveLevelDisability = this.saveLevelDisability.bind(this);
  }

  //#region Handlers For Select

  //#endregion

  componentDidMount() {
    }//void Save LevelDisability
  saveLevelDisability = (e) => {
    e.preventDefault();
    let leveldisabilityjson = {
      name: this.state.name,
    };
    console.log("leveldisabilityjson => " + JSON.stringify(leveldisabilityjson));

    LevelDisabilityService.createLevelDisability(leveldisabilityjson)
      .then((response) => {
        this.setState({ loading: false, statusCode: response.status });
        this.props.history.push("/leveldisability");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false, errors: error.response.data.errors });
      });
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  cancel() {
    this.props.history.push("/leveldisability");
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
                    <label> Название: </label>
                    <input
                      placeholder="Название"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.changeNameHandler}
                    />
                  </div>



                  <button className="btn btn-success" onClick={this.saveLevelDisability}>
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

export default CreateLevelDisabilityComponent;