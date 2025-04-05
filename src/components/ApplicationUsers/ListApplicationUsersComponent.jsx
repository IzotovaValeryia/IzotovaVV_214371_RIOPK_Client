import React, { Component } from "react";
import ApplicationUserService from "../../services/ApplicationUserService";
import Alert from "react-bootstrap/Alert";

class ListApplicationUsersComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.editRoleUser = this.editRoleUser.bind(this);
  }

  editRoleUser(id) {
    this.props.history.push(`/update-roleuser/${id}`);
    window.location.reload();
  }


  componentDidMount() {
    ApplicationUserService.getApplicationUsers()
      .then((res) => {
        this.setState({
            users: res.data,
          loading: true,
          statusCode: res.status,
          isDelete: 0,
          render: true,
        });
      })
      .catch((error) => {
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
            <h2 class="mb-5">Пользователи</h2>
            <div className="row">
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">Код</th>
                    <th scope="col">Пользователь</th>
                    <th scope="col">Электронная почта</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((users) => (
                    <>
                      <tr key={users.id}>
                        <td> {users.id} </td>
                        <td> {users.userName} </td>
                        <td> {users.email} </td>
                        <td>
                          <button
                            onClick={() => this.editRoleUser(users.id)}
                            className="btn btn-info"><i className="fa-solid fa-pen-to-square"></i> Права доступа</button>
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

export default ListApplicationUsersComponent;