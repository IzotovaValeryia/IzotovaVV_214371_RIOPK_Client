import React, { Component } from "react";
import TypeSupportMeasureService from "../../services/TypeSupportMeasureService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

class ListTypeSupportMeasureComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typesupportmeasure: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addTypeSupportMeasure = this.addTypeSupportMeasure.bind(this);
    this.editTypeSupportMeasure = this.editTypeSupportMeasure.bind(this);
    this.deleteTypeSupportMeasure = this.deleteTypeSupportMeasure.bind(this);
  }

  deleteTypeSupportMeasure(id) {
    TypeSupportMeasureService.deleteTypeSupportMeasure(id)
      .then((res) => {
        this.setState({
          typesupportmeasure: this.state.typesupportmeasure.filter(
            (typesupportmeasure) => typesupportmeasure.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editTypeSupportMeasure(id) {
    this.props.history.push(`/update-typesupportmeasure/${id}`);
    window.location.reload();
  }

  addTypeSupportMeasure() {
    this.props.history.push("/add-typesupportmeasure");
    window.location.reload();
  }

  componentDidMount() {
    TypeSupportMeasureService.getTypeSupportMeasure()
      .then((res) => {
        this.setState({
          typesupportmeasure: res.data,
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
            <h2 class="mb-5">Тип поддержки</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addTypeSupportMeasure}>
                <i className="fa-solid fa-plus"></i> Добавить Тип поддержки
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
                  {this.state.typesupportmeasure.map((typesupportmeasure) => (
                    <>
                      <tr key={typesupportmeasure.id}>
                        <td> {typesupportmeasure.name} </td>

                        <td>
                          <button
                            onClick={() => this.editTypeSupportMeasure(typesupportmeasure.id)}
                            className="btn btn-info"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>{" "}
                            Изменить
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deleteTypeSupportMeasure(typesupportmeasure.id)}
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

export default ListTypeSupportMeasureComponent;