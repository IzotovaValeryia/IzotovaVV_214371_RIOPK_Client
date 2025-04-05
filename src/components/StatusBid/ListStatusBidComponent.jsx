import React, { Component } from "react";
import StatusBidService from "../../services/StatusBidService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

class ListStatusBidComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusbid: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addStatusBid = this.addStatusBid.bind(this);
    this.editStatusBid = this.editStatusBid.bind(this);
    this.deleteStatusBid = this.deleteStatusBid.bind(this);
  }

  deleteStatusBid(id) {
    StatusBidService.deleteStatusBid(id)
      .then((res) => {
        this.setState({
          statusbid: this.state.statusbid.filter(
            (statusbid) => statusbid.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editStatusBid(id) {
    this.props.history.push(`/update-statusbid/${id}`);
    window.location.reload();
  }

  addStatusBid() {
    this.props.history.push("/add-statusbid");
    window.location.reload();
  }

  componentDidMount() {
    StatusBidService.getStatusBid()
      .then((res) => {
        this.setState({
          statusbid: res.data,
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
            <h2 class="mb-5">Статус заявки</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addStatusBid}>
                <i className="fa-solid fa-plus"></i> Добавить Статус заявки
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
                  {this.state.statusbid.map((statusbid) => (
                    <>
                      <tr key={statusbid.id}>
                        <td> {statusbid.name} </td>

                        <td>
                          <button
                            onClick={() => this.editStatusBid(statusbid.id)}
                            className="btn btn-info"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>{" "}
                            Изменить
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deleteStatusBid(statusbid.id)}
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

export default ListStatusBidComponent;