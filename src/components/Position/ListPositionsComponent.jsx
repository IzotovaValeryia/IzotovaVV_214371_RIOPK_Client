import React, { Component } from "react";
import PositionService from "../../services/PositionService";
import Alert from "react-bootstrap/Alert";

class ListPositionsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positions: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addPosition = this.addPosition.bind(this);
    this.editPosition = this.editPosition.bind(this);
    this.deletePosition = this.deletePosition.bind(this);
  }

  deletePosition(id) {
    PositionService.deletePosition(id)
      .then((res) => {
        this.setState({
          positions: this.state.positions.filter(
            (positions) => positions.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editPosition(id) {
    this.props.history.push(`/update-position/${id}`);
    window.location.reload();
  }

  addPosition() {
    this.props.history.push("/add-position");
    window.location.reload();
  }

  componentDidMount() {
    document.title = 'Должности'; 
    PositionService.getPositions()
      .then((res) => {
        this.setState({
          positions: res.data,
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
      this.state.statusCode !== 401
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
      
        </div>
      );
    }

    if (!this.state.loading && this.state.statusCode === 401) {
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
            <h2 class="mb-5">Должности</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addPosition}>
                <i className="fa-solid fa-plus"></i> Добавить Должности
              </button>
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">Название должности</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.positions.map((positions) => (
                    <>
                      <tr key={positions.id}>
                        <td> {positions.namePosition} </td>

                        <td>
                          <button
                            onClick={() => this.editPosition(positions.id)}
                            className="btn btn-info"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>{" "}
                            Изменить
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deletePosition(positions.id)}
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

export default ListPositionsComponent;