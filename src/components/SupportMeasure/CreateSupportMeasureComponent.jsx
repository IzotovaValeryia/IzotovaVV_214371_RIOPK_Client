import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import SupportMeasureService from "../../services/SupportMeasureService";
import Select from "react-select";
import TypeSupportMeasureService from "../../services/TypeSupportMeasureService";

class CreateSupportMeasureComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectOptionsTypeSupportMeasure: [],
      oIdTypeSupportMeasure: "",
      oNameTypeSupportMeasure: "",


id: this.props.match.params.id, errors: null,
      shortname: '',
      description: '',
      requirement: '',
      }

    //Handlers
    this.changeShortNameHandler = this.changeShortNameHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeRequirementHandler = this.changeRequirementHandler.bind(this);

    //void
    this.saveSupportMeasure = this.saveSupportMeasure.bind(this);
  }

  //#region Handlers For Select

  handleChangeTypeSupportMeasure(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdTypeSupportMeasure: e.value, oNameTypeSupportMeasure: e.label });
  }

  //#endregion

  componentDidMount() {
    //TypeSupportMeasure
    TypeSupportMeasureService.getTypeSupportMeasure().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.name,
      }));
      this.setState({ selectOptionsTypeSupportMeasure: options });
    });

    }//void Save SupportMeasure
  saveSupportMeasure = (e) => {
    e.preventDefault();
    let supportmeasurejson = {
      shortname: this.state.shortname,
      description: this.state.description,
      requirement: this.state.requirement,
      typeSupportMeasureId: this.state.oIdTypeSupportMeasure,
    };
    console.log("supportmeasurejson => " + JSON.stringify(supportmeasurejson));

    SupportMeasureService.createSupportMeasure(supportmeasurejson)
      .then((response) => {
        this.setState({ loading: false, statusCode: response.status });
        this.props.history.push("/supportmeasure");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false, errors: error.response.data.errors });
      });
  };

  changeShortNameHandler = (event) => {
    this.setState({ shortname: event.target.value });
  };

  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  changeRequirementHandler = (event) => {
    this.setState({ requirement: event.target.value });
  };

  cancel() {
    this.props.history.push("/supportmeasure");
    window.location.reload();
  }



  render() {

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Название: </label>
                    <input
                      placeholder="Название"
                      name="shortname"
                      className="form-control"
                      value={this.state.shortname}
                      onChange={this.changeShortNameHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Описание: </label>
                    <input
                      placeholder="Описание"
                      name="description"
                      className="form-control"
                      value={this.state.description}
                      onChange={this.changeDescriptionHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Требования: </label>
                    <input
                      placeholder="Требования"
                      name="requirement"
                      className="form-control"
                      value={this.state.requirement}
                      onChange={this.changeRequirementHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите тип:
                      <Select
                        placeholder={<div>Выберите тип</div>}
                        options={this.state.selectOptionsTypeSupportMeasure}
                        onChange={this.handleChangeTypeSupportMeasure.bind(this)}
                      />
                    </label>
                  </div>



                  <button className="btn btn-success" onClick={this.saveSupportMeasure}>
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

export default CreateSupportMeasureComponent;