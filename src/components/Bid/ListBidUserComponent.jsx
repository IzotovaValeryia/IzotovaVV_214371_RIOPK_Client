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
  }

  addBid() {
    this.props.history.push("/add-bid-user");
    window.location.reload();
  }

  componentDidMount() {

    console.log();

    BidService.getBidByApplicationUserId(JSON.parse(localStorage.getItem("user")).idUser)
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
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Соцподдержка</th>
                    <th scope="col">Дата и время создания</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Комментарий</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.bid.map((bid) => (
                    <>
                      <tr key={bid.id}>
                      <td> {bid.id} </td>
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
                      </tr>
                      <tr class="spacer">
                        <td colspan="100"></td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
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