import React, { Component } from "react";
import FamilyMemberService from "../../services/FamilyMemberService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

class ListFamilyMemberComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      familymember: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addFamilyMember = this.addFamilyMember.bind(this);
    this.editFamilyMember = this.editFamilyMember.bind(this);
    this.deleteFamilyMember = this.deleteFamilyMember.bind(this);
  }

  deleteFamilyMember(id) {
    FamilyMemberService.deleteFamilyMember(id)
      .then((res) => {
        this.setState({
          familymember: this.state.familymember.filter(
            (familymember) => familymember.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editFamilyMember(id) {
    this.props.history.push(`/update-familymember/${id}`);
    window.location.reload();
  }

  addFamilyMember() {
    this.props.history.push("/add-familymember");
    window.location.reload();
  }

  componentDidMount() {
    FamilyMemberService.getFamilyMember()
      .then((res) => {
        this.setState({
          familymember: res.data,
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
            <h2 class="mb-5">Члены семьи</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addFamilyMember}>
                <i className="fa-solid fa-plus"></i> Добавить Члена семьи
              </button>
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">ФИО</th>
                    <th scope="col">Тип</th>
                    <th scope="col">Инвалидность</th>
                    <th scope="col">Должность</th>
                    <th scope="col">Пользователь</th>
                    <th scope="col">Дата рождения</th>
                    <th scope="col">Доход</th>
                    <th scope="col" class="w-25">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.familymember.map((familymember) => (
                    <>
                      <tr key={familymember.id}>
                        <td> {familymember.surname} {familymember.firstName} {familymember.patronymic}</td>
                        <td> {familymember.typeFamilyMember.name} </td>
                        <td> {familymember.levelDisability.name} </td>
                        <td> {familymember.position.namePosition} </td>
                        <td> {familymember.applicationUser.email} </td>
                        <td> {formatDate(familymember.birthDate)} </td>
                        <td> {familymember.income} </td>

                        <td>
                          <button
                            onClick={() => this.editFamilyMember(familymember.id)}
                            className="btn btn-info"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>

                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deleteFamilyMember(familymember.id)}
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

function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

export default ListFamilyMemberComponent;