import React, { Component } from "react";
import LevelDisabilityService from "../../services/LevelDisabilityService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

class ListLevelDisabilityComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leveldisability: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addLevelDisability = this.addLevelDisability.bind(this);
    this.editLevelDisability = this.editLevelDisability.bind(this);
    this.deleteLevelDisability = this.deleteLevelDisability.bind(this);
  }

  deleteLevelDisability(id) {
    LevelDisabilityService.deleteLevelDisability(id)
      .then((res) => {
        this.setState({
          leveldisability: this.state.leveldisability.filter(
            (leveldisability) => leveldisability.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editLevelDisability(id) {
    this.props.history.push(`/update-leveldisability/${id}`);
    window.location.reload();
  }

  addLevelDisability() {
    this.props.history.push("/add-leveldisability");
    window.location.reload();
  }

  componentDidMount() {
    LevelDisabilityService.getLevelDisability()
      .then((res) => {
        this.setState({
          leveldisability: res.data,
          loading: true,
          statusCode: res.status,
          isDelete: 0,
          render: true,
        });
      })
      .catch((error) => {
        console.error("Код ошибки " + error.response.status);
        this.setState({ loading: false, statusCode: error.response.status });
      });
  }

  render() {
    if (
      !this.state.render &&
      !this.state.loading &&
      this.state.statusCode !== 403
    ) {
      return (
        <div
          style={{
            position: "fixed",
            bottom: 450,
            right: 1000,
            margin: "auto",
          }}
        >
          <HashLoader color={"#fff"} size={250} />
        </div>
      );
    }

    if (!this.state.loading && this.state.statusCode === 403) {
      return (
        <Alert variant="danger">
          <Alert.Heading>
            У вас нет прав для просмотра этой страницы.
          </Alert.Heading>
          <p>Возможно, возникли проблемы на стороне сервера.</p>
          <hr />
          <p className="mb-0">Обратитесь к администратору.</p>
        </Alert>
      );
    }

    if (this.state.statusCode === 200) {
      return (
        <div className="container">
          <header className="jumbotron">
            <h2 class="mb-5">Уровень инвалидности</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addLevelDisability}>
                <i className="fa-solid fa-plus"></i> Добавить Уровень инвалидности
              </button>
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.leveldisability.map((leveldisability) => (
                    <>
                      <tr key={leveldisability.id}>
                        <td> {leveldisability.name} </td>

                        <td>
                          <button
                            onClick={() => this.editLevelDisability(leveldisability.id)}
                            className="btn btn-info"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>{" "}
                            Изменить
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deleteLevelDisability(leveldisability.id)}
                            className="btn btn-danger"
                          >
                            <i className="fa-solid fa-trash"></i> Удалить
                          </button>
                        </td>
                      </tr>
                      <tr class="spacer">
                        <td colspan="100"></td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>

              {this.state.isDelete === 1 && (
                <div>
                  {" "}
                  <Alert variant="success">
                    <Alert.Heading>Удаление прошло успешно.</Alert.Heading>
                    <p>Если возникнут проблемы обращайтесь к администратору!</p>
                  </Alert>
                </div>
              )}

              {this.state.isDelete === 2 && (
                <div>
                  {" "}
                  <Alert variant="danger">
                    <Alert.Heading>Возникла ошибка при удалении.</Alert.Heading>
                    <p></p>
                  </Alert>
                </div>
              )}
            </div>
          </header>
        </div>
      );
    }
  }
}

export default ListLevelDisabilityComponent;