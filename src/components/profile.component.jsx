import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import AuthService from "../services/auth.service";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBListGroup,
  MDBListGroupItem
} from "mdb-react-ui-kit";

class Profile extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      picture : "https://microsac.es/wp-content/uploads/2019/06/8V1z7D_t20_YX6vKm.jpg",
      name : '',
      userGoogle : []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.userGoogle = AuthService.getCurrentUserGoogle();
    
    console.log(this.userGoogle)
    if (this.userGoogle !== null) {
      this.setState({ picture: this.userGoogle.picture, name : this.userGoogle.name });
    }

  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }
   
    return (
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" className="mt-5">
            <MDBCard style={{ borderRadius: "15px", width: "750px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>Профиль</MDBCardTitle>

                    {this.state.name ? (
                  <MDBCardText> {this.state.name}</MDBCardText>
                ) : (
                  <MDBCardText> {currentUser.username}</MDBCardText>
                )}
                   

                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}
                    >
                      <div className="px-3">
                        <p className="small text-muted mb-1"><strong>Токен</strong></p>
                        <p className="mb-0">{currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1"><strong>Эл. почта</strong></p>
                        <p className="mb-0">{currentUser.email}</p>
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}
                    >
                      <div>
                        <p className="small text-muted mb-1"><strong>Права</strong></p>
        <MDBListGroup style={{ minWidth: '25rem' }} light>
        {currentUser.rolesInrussian &&
            currentUser.rolesInrussian.map((rolesInrussian, index) => <MDBListGroupItem tag='a' href='#' action color='dark' className='px-3 rounded-3 mb-2' key={index}>{rolesInrussian}</MDBListGroupItem>)}
    </MDBListGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    
      
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
