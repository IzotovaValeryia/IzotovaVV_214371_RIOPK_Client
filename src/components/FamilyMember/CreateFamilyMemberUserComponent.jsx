import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import FamilyMemberService from "../../services/FamilyMemberService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import TypeFamilyMemberService from "../../services/TypeFamilyMemberService";
import LevelDisabilityService from "../../services/LevelDisabilityService";
import PositionService from "../../services/PositionService";
import ApplicationUserService from "../../services/ApplicationUserService";

class CreateFamilyMemberComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectOptionsTypeFamilyMember: [],
      oIdTypeFamilyMember: "",
      oNameTypeFamilyMember: "",


      selectOptionsLevelDisability: [],
      oIdLevelDisability: "",
      oNameLevelDisability: "",


      selectOptionsPosition: [],
      oIdPosition: "",
      oNamePosition: "",


id: this.props.match.params.id, errors: null,
      surname: '',
      firstname: '',
      patronymic: '',
      birthdate: new Date(),
      income: Number,
      }

    //Handlers
    this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changePatronymicHandler = this.changePatronymicHandler.bind(this);
    this.changeIncomeHandler = this.changeIncomeHandler.bind(this);

    //void
    this.saveFamilyMember = this.saveFamilyMember.bind(this);
  }

  //#region Handlers For Select

  handleChangeTypeFamilyMember(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdTypeFamilyMember: e.value, oNameTypeFamilyMember: e.label });
  }

  handleChangeLevelDisability(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdLevelDisability: e.value, oNameLevelDisability: e.label });
  }

  handleChangePosition(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdPosition: e.value, oNamePosition: e.label });
  }

  handleChangeApplicationUser(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdApplicationUser: e.value, oNameApplicationUser: e.label });
  }

  //#endregion

  componentDidMount() {
    //TypeFamilyMember
    TypeFamilyMemberService.getTypeFamilyMember().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.name,
      }));
      this.setState({ selectOptionsTypeFamilyMember: options });
    });

    //LevelDisability
    LevelDisabilityService.getLevelDisability().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.name,
      }));
      this.setState({ selectOptionsLevelDisability: options });
    });

    //Position
    PositionService.getPositions().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.namePosition,
      }));
      this.setState({ selectOptionsPosition: options });
    });

    }//void Save FamilyMember
  saveFamilyMember = (e) => {
    e.preventDefault();
    let familymemberjson = {
      surname: this.state.surname,
      firstname: this.state.firstname,
      patronymic: this.state.patronymic,
      typeFamilyMemberId: this.state.oIdTypeFamilyMember,
      levelDisabilityId: this.state.oIdLevelDisability,
      positionId: this.state.oIdPosition,
      applicationUserId: JSON.parse(localStorage.getItem("user")).idUser,
      birthdate: this.state.birthdate,
      income: this.state.income,
    };
    console.log("familymemberjson => " + JSON.stringify(familymemberjson));

    FamilyMemberService.createFamilyMember(familymemberjson)
      .then((response) => {
        this.setState({ loading: false, statusCode: response.status });
        this.props.history.push("/familymember-user");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false, errors: error.response.data.errors });
      });
  };

  changeSurnameHandler = (event) => {
    this.setState({ surname: event.target.value });
  };

  changeFirstNameHandler = (event) => {
    this.setState({ firstname: event.target.value });
  };

  changePatronymicHandler = (event) => {
    this.setState({ patronymic: event.target.value });
  };

  changeIncomeHandler = (event) => {
    this.setState({ income: event.target.value });
  };

  cancel() {
    this.props.history.push("/familymember-user");
    window.location.reload();
  }

  handleChangeBirthDate = (birthdate) => {
    this.setState({
      birthdate,
    });
  };



  render() {
    const { birthdate } = this.state;

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Фамилия: </label>
                    <input
                      placeholder="Фамилия"
                      name="surname"
                      className="form-control"
                      value={this.state.surname}
                      onChange={this.changeSurnameHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Имя: </label>
                    <input
                      placeholder="Имя"
                      name="firstname"
                      className="form-control"
                      value={this.state.firstname}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Отчество: </label>
                    <input
                      placeholder="Отчество"
                      name="patronymic"
                      className="form-control"
                      value={this.state.patronymic}
                      onChange={this.changePatronymicHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите тип:
                      <Select
                        placeholder={<div>Выберите тип</div>}
                        options={this.state.selectOptionsTypeFamilyMember}
                        onChange={this.handleChangeTypeFamilyMember.bind(this)}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите инвалидность:
                      <Select
                        placeholder={<div>Выберите инвалидность</div>}
                        options={this.state.selectOptionsLevelDisability}
                        onChange={this.handleChangeLevelDisability.bind(this)}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите должность:
                      <Select
                        placeholder={<div>Выберите должность</div>}
                        options={this.state.selectOptionsPosition}
                        onChange={this.handleChangePosition.bind(this)}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label> Дата рождения: </label>
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      showYearDropdown
                      scrollableMonthYearDropdown
                      selected={birthdate}
                      onChange={this.handleChangeBirthDate}
                      placeholderText="Очистка прошла успешно!"
                    />
                  </div>

                  <div className="form-group">
                    <label> Доход: </label>
                    <input
                      placeholder="Доход"
                      name="income"
                      className="form-control"
                      value={this.state.income}
                      onChange={this.changeIncomeHandler}
                    />
                  </div>



                  <button className="btn btn-success" onClick={this.saveFamilyMember}>
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

export default CreateFamilyMemberComponent;