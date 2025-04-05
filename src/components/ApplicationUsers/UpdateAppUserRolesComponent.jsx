import Alert from "react-bootstrap/Alert";
import React, { Component } from "react";
import ApplicationUserService from "../../services/ApplicationUserService";
import Listbox from "react-widgets/Listbox";

class UpdateAppUserRolesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectOptionsRoles: [],
      selectedRoles: [], 
      id: this.props.match.params.id,
      errors: null,
      namecurrency: "",
      currencycode: "",
    };
    this.updateRoles = this.updateRoles.bind(this);
  }

  componentDidMount() {
    //Status
    ApplicationUserService.getApplicationRoles().then((res) => {
        const options = res.data.map((d) => ({
        value: d.id,
        label: d.name,
        }));
        this.setState({ selectOptionsRoles: options });
    });
  }

  updateRoles = (e) => {
    e.preventDefault();
    let rolesJson = {
      id: this.state.id,
      selectedRoles: this.state.selectedRoles,
    };
    console.log("updateRoles => " + JSON.stringify(rolesJson));

    ApplicationUserService.updateApplicationRoles(rolesJson)
      .then((response) => {
        this.setState({ statusCode: response.status });
        this.props.history.push("/users");
        window.location.reload();
      })
      .catch((error) => {
        this.setState({ errors: error.response.data.errors });
      });
  };


  cancel() {
    this.props.history.push("/users");
    window.location.reload();
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <br></br>
              <h3 className="text-center">Изменение прав для пользователя</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Доступные роли: </label>
                    <Listbox
                        dataKey="id"
                        multiple
                        textField="label"
                        value={this.state.selectedRoles}
                        data={this.state.selectOptionsRoles}
                        onChange={selected => this.setState({ selectedRoles: selected })}/>
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.updateRoles}><i class="fa-solid fa-floppy-disk"></i> Сохранить
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    <i class="fa-solid fa-xmark"></i> Закрыть
                  </button>
                </form>{" "}
                <br></br>
                {this.state.errors && (
                  <div>
                    <Alert variant="danger">
                      <Alert.Heading>
                        Ошибка при изменении прав.
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

export default UpdateAppUserRolesComponent;
