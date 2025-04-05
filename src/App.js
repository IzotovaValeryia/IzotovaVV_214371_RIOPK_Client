import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./style.css";
import "./bootstrap.min.css";
import "react-widgets/styles.css";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import AuthVerify from "./common/auth-verify";


//Positions
import ListPositionsComponent from './components/Position/ListPositionsComponent';
import CreatePositionComponent from './components/Position/CreatePositionComponent';
import UpdatePositionComponent from './components/Position/UpdatePositionComponent';

import ListFamilyMemberComponent from './components/FamilyMember/ListFamilyMemberComponent';
import CreateFamilyMemberComponent from './components/FamilyMember/CreateFamilyMemberComponent';
import UpdateFamilyMemberComponent from './components/FamilyMember/UpdateFamilyMemberComponent';

import ListFamilyMemberByUserComponent from './components/FamilyMember/ListFamilyMemberByUserComponent';

import ListFamilyMemberUserComponent from './components/FamilyMember/ListFamilyMemberUserComponent';
import CreateFamilyMemberUserComponent from './components/FamilyMember/CreateFamilyMemberUserComponent';
import UpdateFamilyMemberUserComponent from './components/FamilyMember/UpdateFamilyMemberUserComponent';

import ListBidComponent from './components/Bid/ListBidComponent';
import ListBidUserComponent from './components/Bid/ListBidUserComponent';
import CreateBidComponent from './components/Bid/CreateBidComponent';
import CreateBidUserComponent from './components/Bid/CreateBidUserComponent';
import UpdateBidComponent from './components/Bid/UpdateBidComponent';

import ListTypeSupportMeasureComponent from './components/TypeSupportMeasure/ListTypeSupportMeasureComponent';
import CreateTypeSupportMeasureComponent from './components/TypeSupportMeasure/CreateTypeSupportMeasureComponent';
import UpdateTypeSupportMeasureComponent from './components/TypeSupportMeasure/UpdateTypeSupportMeasureComponent';

import ListTypeFamilyMemberComponent from './components/TypeFamilyMember/ListTypeFamilyMemberComponent';
import CreateTypeFamilyMemberComponent from './components/TypeFamilyMember/CreateTypeFamilyMemberComponent';
import UpdateTypeFamilyMemberComponent from './components/TypeFamilyMember/UpdateTypeFamilyMemberComponent';

import ListSupportMeasureComponent from './components/SupportMeasure/ListSupportMeasureComponent';
import ListSupportMeasureUserComponent from './components/SupportMeasure/ListSupportMeasureUserComponent';
import CreateSupportMeasureComponent from './components/SupportMeasure/CreateSupportMeasureComponent';
import UpdateSupportMeasureComponent from './components/SupportMeasure/UpdateSupportMeasureComponent';

import ListStatusBidComponent from './components/StatusBid/ListStatusBidComponent';
import CreateStatusBidComponent from './components/StatusBid/CreateStatusBidComponent';
import UpdateStatusBidComponent from './components/StatusBid/UpdateStatusBidComponent';

import ListLevelDisabilityComponent from './components/LevelDisability/ListLevelDisabilityComponent';
import CreateLevelDisabilityComponent from './components/LevelDisability/CreateLevelDisabilityComponent';
import UpdateLevelDisabilityComponent from './components/LevelDisability/UpdateLevelDisabilityComponent';

//ApplicationRoleUser
import ListApplicationUsersComponent from './components/ApplicationUsers/ListApplicationUsersComponent';
import UpdateAppUserRolesComponent from './components/ApplicationUsers/UpdateAppUserRolesComponent';

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showDefUserBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.role.includes("Administrator"),
        showDefUserBoard: user.role.includes("User"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showAdminBoard: false,
      showDefUserBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const {
      currentUser,
      showAdminBoard,
      showDefUserBoard,
    } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand me-2" href="/">
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Переключатель навигации"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {showDefUserBoard && (
                    <>
                      <ButtonGroup>
                        <Button size="lg" variant="info" href="/bid-user">Заявки</Button>
                        <Button size="lg" variant="info" href="/familymember-user">Члены семьи</Button>
                        <Button size="lg" variant="info" href="/supportmeasure-user">Соцподдержка</Button>
                        
                        
                        
                        
                      </ButtonGroup>
                  </>
                  )}

{showAdminBoard && (<>
                      <ButtonGroup>
                        <Button size="lg" variant="info" href="/users">Пользователи</Button>
                        <Button size="lg" variant="info" href="/typesupportmeasure">Типы поддержки</Button>
                        <Button size="lg" variant="info" href="/typefamilymember">Тип члена семьи</Button>
                        <Button size="lg" variant="info" href="/position">Должности</Button>
                        <Button size="lg" variant="info" href="/statusbid">Статус заявок</Button>
                        <Button size="lg" variant="info" href="/leveldisability">Уровень инвалидности</Button>
                        <Button size="lg" variant="info" href="/supportmeasure">Соцподдержка</Button>
                        <Button size="lg" variant="info" href="/familymember">Члены семей</Button>
                        <Button size="lg" variant="info" href="/bid">Заявки</Button>
                      </ButtonGroup>


 
</>)}
                </ul>

                {currentUser ? (
                  <div className="d-flex align-items-center">
                  <Link to="/" className="btn btn-info me-3">{currentUser.username}</Link>

                    <Link to="/login" className="btn btn-primary me-3" onClick={this.logOut}>Выйти</Link>
                  
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                <Link to="/login" className="btn btn-info px-3 me-2">Войти</Link>
                <Link to="/register" className="btn btn-primary me-3">Регистрация</Link>

                  </div>
                )}
              </div>
            </div>
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />

              <Route path="/typesupportmeasure" component = {ListTypeSupportMeasureComponent}></Route>
              <Route path="/add-typesupportmeasure" component = {CreateTypeSupportMeasureComponent}></Route>
              <Route path="/update-typesupportmeasure/:id" component = {UpdateTypeSupportMeasureComponent}></Route>

              <Route path="/typefamilymember" component = {ListTypeFamilyMemberComponent}></Route>
              <Route path="/add-typefamilymember" component = {CreateTypeFamilyMemberComponent}></Route>
              <Route path="/update-typefamilymember/:id" component = {UpdateTypeFamilyMemberComponent}></Route>

              <Route path="/statusbid" component = {ListStatusBidComponent}></Route>
              <Route path="/add-statusbid" component = {CreateStatusBidComponent}></Route>
              <Route path="/update-statusbid/:id" component = {UpdateStatusBidComponent}></Route>

              <Route path="/position" component = {ListPositionsComponent}></Route>
              <Route path="/add-position" component = {CreatePositionComponent}></Route>
              <Route path="/update-position/:id" component = {UpdatePositionComponent}></Route>

              <Route path="/leveldisability" component = {ListLevelDisabilityComponent}></Route>
              <Route path="/add-leveldisability" component = {CreateLevelDisabilityComponent}></Route>
              <Route path="/update-leveldisability/:id" component = {UpdateLevelDisabilityComponent}></Route>

              <Route path="/supportmeasure" component = {ListSupportMeasureComponent}></Route>
              <Route path="/supportmeasure-user" component = {ListSupportMeasureUserComponent}></Route>
              <Route path="/add-supportmeasure" component = {CreateSupportMeasureComponent}></Route>
              <Route path="/update-supportmeasure/:id" component = {UpdateSupportMeasureComponent}></Route>

              <Route path="/familymember" component = {ListFamilyMemberComponent}></Route>
              <Route path="/add-familymember" component = {CreateFamilyMemberComponent}></Route>
              <Route path="/update-familymember/:id" component = {UpdateFamilyMemberComponent}></Route>
              <Route path="/familymember-user" component = {ListFamilyMemberUserComponent}></Route>
              <Route path="/familymember-byuser/:id" component = {ListFamilyMemberByUserComponent}></Route>
              <Route path="/add-familymember-user" component = {CreateFamilyMemberUserComponent}></Route>
              <Route path="/update-familymember-user/:id" component = {UpdateFamilyMemberUserComponent}></Route>

              <Route path="/bid" component = {ListBidComponent}></Route>
              <Route path="/add-bid" component = {CreateBidComponent}></Route>
              <Route path="/add-bid-user" component = {CreateBidUserComponent}></Route>
              <Route path="/update-bid/:id" component = {UpdateBidComponent}></Route>
              <Route path="/bid-user" component = {ListBidUserComponent}></Route>

              <Route path="/users" component = {ListApplicationUsersComponent}></Route>
              <Route path="/update-roleuser/:id" component = {UpdateAppUserRolesComponent}></Route>

            </Switch>
          </div>
         
           <AuthVerify logOut={this.logOut}/> 
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
