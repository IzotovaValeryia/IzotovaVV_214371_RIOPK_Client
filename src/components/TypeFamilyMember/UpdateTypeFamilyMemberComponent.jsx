import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import TypeFamilyMemberService from "../../services/TypeFamilyMemberService";

class UpdateTypeFamilyMemberComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
id: this.props.match.params.id, errors: null,
      name: '',
      }

    //Handlers
    this.changeNameHandler = this.changeNameHandler.bind(this);

    //void
    this.updateTypeFamilyMember = this.updateTypeFamilyMember.bind(this);
  }

  //#region Handlers For Select

  //#endregion

  componentDidMount() {
    TypeFamilyMemberService.getTypeFamilyMemberById(this.state.id).then((res) => {
      let typefamilymemberjson = res.data;
      this.setState({
        name: typefamilymemberjson.name,
      });
    });}//void Update TypeFamilyMember
  updateTypeFamilyMember = (e) => {
    e.preventDefault();
    let typefamilymemberjson = {id: this.state.id,
      name: this.state.name,
    };
    console.log("typefamilymemberjson => " + JSON.stringify(typefamilymemberjson));

    TypeFamilyMemberService.updateTypeFamilyMember(typefamilymemberjson)
      .then((response) => {
        this.setState({ statusCode: response.status });
        this.props.history.push("/typefamilymember");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errors: error.response.data.errors });
      });
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  cancel() {
    this.props.history.push("/typefamilymember");
    window.location.reload();
  }



  render() {

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3"><br></br>
              <h3 className="text-center">Редактирование Типа члена семьи</h3>
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



                  <button className="btn btn-success" onClick={this.updateTypeFamilyMember}>
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
                        Ошибка при редактировании.
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

export default UpdateTypeFamilyMemberComponent;