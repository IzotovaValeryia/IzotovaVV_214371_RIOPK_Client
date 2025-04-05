import React, { Component } from "react";
import BidService from "../../services/BidService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

//Icons
import DangerousIcon from "@mui/icons-material/Dangerous";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import InfoIcon from "@mui/icons-material/Info";
import StartIcon from "@mui/icons-material/Start";
import WarningIcon from "@mui/icons-material/Warning";

//mui
import Chip from "@mui/material/Chip";

class ListBidComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bid: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addBid = this.addBid.bind(this);
    this.editBid = this.editBid.bind(this);
    this.deleteBid = this.deleteBid.bind(this);
    this.viewFamilyMember = this.viewFamilyMember.bind(this);
  }

  viewFamilyMember(id) {
    this.props.history.push(`/familymember-byuser/${id}`);
    window.location.reload();
  }

  deleteBid(id) {
    BidService.deleteBid(id)
      .then((res) => {
        this.setState({
          bid: this.state.bid.filter(
            (bid) => bid.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editBid(id) {
    this.props.history.push(`/update-bid/${id}`);
    window.location.reload();
  }

  addBid() {
    this.props.history.push("/add-bid");
    window.location.reload();
  }

  componentDidMount() {
    BidService.getBid()
      .then((res) => {
        this.setState({
          bid: res.data,
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
     const getChipProps = (statusId) => {
          switch (statusId) {
            case 1:
              return { icon: <StartIcon />, color: "default" };
            case 2:
              return { icon: <DangerousIcon />, color: "error" };
            case 3:
              return { icon: <WarningIcon />, color: "warning" };
            case 5:
            case 4:
              return { icon: <DoneAllIcon />, color: "success" };  
            case 6:
              return { icon: <InfoIcon />, color: "primary" };
            default:
              return { icon: null, color: "default" };
          }
        };



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
            <h2 class="mb-5">Заявки</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addBid}>
                <i className="fa-solid fa-plus"></i> Добавить Заявки
              </button>
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Пользователь</th>
                    <th scope="col">Соцподдержка</th>
                    <th scope="col">Дата и время создания</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Комментарий</th>
                    <th scope="col" class="w-25">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.bid.map((bid) => (
                    <>
                      <tr key={bid.id}>
                        <td> {bid.id} </td>
                        <td> {bid.applicationUser.email} </td>
                        <td> {bid.supportMeasure.shortName} </td>
                        <td> {formatDate(bid.dateCreated)} {formatTime(bid.dateCreated)} </td>
                        <td>
                          <Chip
                            label={bid.statusBid.name}
                            size="medium"
                            icon={
                              getChipProps(bid.statusBid.id).icon
                            }
                            color={
                              getChipProps(bid.statusBid.id).color
                            }
                          />
                        </td>
                        <td> {bid.comment} </td>

                        <td>
                          <button onClick={() => this.editBid(bid.id)} className="btn btn-info">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button style={{ marginLeft: "10px" }} onClick={() => this.deleteBid(bid.id)} className="btn btn-danger">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button style={{ marginLeft: "10px" }} onClick={() => this.viewFamilyMember(bid.applicationUser.id)} className="btn btn-primary">
                          <i class="fa-solid fa-clipboard"></i>
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
    if (string == null) return "";
  
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }
  
  function formatTime(string) {
    if (string == null) return "";
  
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Date(string).toLocaleTimeString([], options);
  }

export default ListBidComponent;