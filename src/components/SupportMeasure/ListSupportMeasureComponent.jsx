import React, { Component } from "react";
import SupportMeasureService from "../../services/SupportMeasureService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

class ListSupportMeasureComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      supportmeasure: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addSupportMeasure = this.addSupportMeasure.bind(this);
    this.editSupportMeasure = this.editSupportMeasure.bind(this);
    this.deleteSupportMeasure = this.deleteSupportMeasure.bind(this);
  }

  deleteSupportMeasure(id) {
    SupportMeasureService.deleteSupportMeasure(id)
      .then((res) => {
        this.setState({
          supportmeasure: this.state.supportmeasure.filter(
            (supportmeasure) => supportmeasure.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editSupportMeasure(id) {
    this.props.history.push(`/update-supportmeasure/${id}`);
    window.location.reload();
  }

  addSupportMeasure() {
    this.props.history.push("/add-supportmeasure");
    window.location.reload();
  }

  componentDidMount() {
    SupportMeasureService.getSupportMeasure()
      .then((res) => {
        this.setState({
          supportmeasure: res.data,
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
          <header
            className="jumbotron"
            style={{ width: "125%", margin: "0 auto", marginLeft: "-15%" }}
          >
            <h2 class="mb-5">Соцподдержка</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addSupportMeasure}>
                <i className="fa-solid fa-plus"></i> Добавить Соцподдержку
              </button>
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Описание</th>
                    <th scope="col">Требования</th>
                    <th scope="col">Тип рассмотрения</th>
                    <th scope="col" class="w-25">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.supportmeasure.map((supportmeasure) => (
                    <>
                      <tr key={supportmeasure.id}>
                        <td> {supportmeasure.shortName} </td>
                        <td> {supportmeasure.description} </td>
                        <td> {supportmeasure.requirement} </td>
                        <td> {supportmeasure.typeSupportMeasure.name} </td>

                        <td>
                          <button
                            onClick={() => this.editSupportMeasure(supportmeasure.id)}
                            className="btn btn-info"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deleteSupportMeasure(supportmeasure.id)}
                            className="btn btn-danger"
                          >
                            <i className="fa-solid fa-trash"></i> 
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

export default ListSupportMeasureComponent;