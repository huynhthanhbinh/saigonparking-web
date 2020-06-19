import React from 'react';
import ControlledCarousel from './Home/Slider'

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import { Nav, Navbar } from "react-bootstrap";
//Error 404

//CSS
import styled from 'styled-components';
import '../css/Error404.css'

import NavDropdown from 'react-bootstrap/NavDropdown'

//
//Activate Account
import ClickActivateAccount from './ActivateAccount/ClickActivateAccount'
import PreActivateAccount from './ActivateAccount/PreActivateAccount'
//
import Resetpassword from './Resetpassword'

import LoginWithGoogle from './LoginWithGoogle'
import CovidDashboard from './Map/CovidDashboard'
import Information from "./Information"
import Login from './Login';
import Register from './Register';
import Forgetpassword from './Forgetpassword'
import PreResetPassword from './PreResetPassword'
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie'
import Update from './Update'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import sessionstorage from 'sessionstorage'
import auth from '../api/Auth_grpc_web_pb';



function Home() {
    const [auth, setAuth] = React.useState(false);
    const [checkUserName, setcheckUserName] = React.useState(null)
    const [forgetpass,setforgetpass] = React.useState(false)

    const readcookie = async () => {
        const token = Cookies.get("token");
        const refreshtoken = Cookies.get("refreshtoken");
        const checkUserName = Cookies.get("checkUserName");

        if (token && checkUserName && refreshtoken) {
            setAuth(true);


        }
    }

    React.useEffect(() => {

        readcookie()
    })

    return (
        <AuthApi.Provider value={{ auth, setAuth, checkUserName, setcheckUserName , forgetpass,setforgetpass }}>

            <Router>
                <Links />
                <Container>
                    <Routes></Routes>
                </Container>
                <Footer />

            </Router>
        </AuthApi.Provider>


    );
}
const Footer = () => {
    var style = {
        backgroundColor: "gray",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "70px",
        width: "100%",
    }

    var phantom = {
        display: 'block',
        padding: '20px',
        height: '60px',
        width: '100%',
    }
    return (
        <div>

            <div style={style}>
                <div className="container-fluid text-center text-md-left">
                    <div className="row">
                        <div className="col-md-6 mt-md-0 mt-3">
                            <h5 className="text-uppercase font-weight-bold">LUÔN LUÔN LẮNG NGHE LÂU LÂU MỚI HIỂU</h5>

                        </div>
                        <div className="footer-copyright text-center py-3">© 2020 Copyright:
                             <a href="https://www.facebook.com/profile.php?id=100009196064931"> ParkingMapSaiGon</a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )

}
const Links = () => {
    const Styles = styled.div`
    .navbar {
      background-color: rgb(52,116,116);
      
    }
  
    a, .navbar-brand, .navbar-nav .nav-link {
      color: white;
  
      &:hover {
        color: yellow;
      }
    }
  `;

    const Auth = React.useContext(AuthApi)
    const ClickLogOut = () => {
        Auth.setAuth(false)
        Auth.setforgetpass(false)
        Auth.setcheckUserName(null)
        Cookies.remove("checkUserName");
        Cookies.remove("token");

        Cookies.remove("refreshtoken");

        sessionstorage.clear();
    }

    if (Auth.auth === true || Auth.forgetpass === true) {
        return (
            <Styles>

                <Navbar expand="lg">
                    <Link to="/">
                        <Navbar.Brand >HOME</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/parkingmap">
                                <Nav >MAP</Nav>
                            </Link>

                        </Nav>

                        <div style={{ marginRight: "50px" }} >
                            <NavDropdown title="INFORMATION" id="basic-nav-dropdown" >

                                <NavDropdown.Item ><Link to="/profile" >PROFILE</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to="/profile/changepassword" >CHANGEPASSWORD</Link></NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={ClickLogOut} >LOGOUT</NavDropdown.Item>
                            </NavDropdown>
                        </div>

                    </Navbar.Collapse>
                </Navbar>
            </Styles >

        )

    }
    else if (Auth.auth === false ) {
        return (
            <Styles>
                <Navbar expand="lg">
                    <Link to="/">
                        <Navbar.Brand >HOME</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/parkingmap">
                                <Nav >MAP</Nav>
                            </Link>

                        </Nav>

                        <div style={{ marginRight: "50px" }} >
                            <NavDropdown title="ĐĂNG NHẬP" id="basic-nav-dropdown" >

                                <NavDropdown.Item ><Link to="/login" >LOGIN</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to="/register" >REGISTER</Link></NavDropdown.Item>

                                <NavDropdown.Divider />

                            </NavDropdown>
                        </div>

                    </Navbar.Collapse>
                </Navbar>
            </Styles >
        )

    }
}
const Routes = () => {
    const Auth = React.useContext(AuthApi)

    return (

        <Switch>
            <ProtectedHome exact path="/" component={ControlledCarousel} auth={Auth.auth}  ></ProtectedHome>


            <ProtectedMap path="/parkingmap" component={CovidDashboard} auth={Auth.auth} forgetpass={Auth.forgetpass} ></ProtectedMap>
            <ProtectedLogin exact path="/login" component={Login} auth={Auth.auth} checkUserName={Auth.checkUserName}  ></ProtectedLogin>
            <ProtectedRegister exact path="/register" component={Register} auth={Auth.auth} checkUserName={Auth.checkUserName} ></ProtectedRegister>
            
            <ProtectedProfile exact path="/profile" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Information}></ProtectedProfile>
            <ProtectedUpdate exact path="/profile/update" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Update}></ProtectedUpdate>
            <ProtectedChangePassword exact path="/profile/changepassword" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Resetpassword}></ProtectedChangePassword>
            
            <ProtectedForgetPassword exact path="/forget-password" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Forgetpassword}></ProtectedForgetPassword>
            <ProtectedResetPassword exact path="/reset-password" forgetpass={Auth.forgetpass} auth={Auth.auth} checkUserName={Auth.checkUserName} component={PreResetPassword}></ProtectedResetPassword>

            <ProtectedClickActivateAccount exact path="/clickactivateaccount" auth={Auth.auth} checkUserName={Auth.checkUserName} component={ClickActivateAccount}></ProtectedClickActivateAccount>
            <ProtectedActivateAccount exact path="/activate-account" auth={Auth.auth} checkUserName={Auth.checkUserName} component={PreActivateAccount}></ProtectedActivateAccount>


            <ProtectedError404 exact path="/404" />
            <Redirect from="*" to="/404" />
        </Switch>


    )
}
const ProtectedError404 = () => {
    document.title = 'ERROR404'

    window.onload = function () {
        document.querySelector('.cont_principal')
            .className = "cont_principal cont_error_active";
    }

    return (
        <Route


            render={() =>
                (
                    <div className="cont_principal">
                        <div class="cont_error">
                            <h2 className="Binh">Saigon Parking Service</h2>
                            <h1 className="Binh">Oops</h1>
                            <p className="Binh">The page you're looking for isn't here.</p>
                        </div>
                        <div class="cont_aura_1"></div>
                        <div class="cont_aura_2"></div>
                    </div>
                )

            }
        />

    )
}

const ProtectedMap = ({forgetpass, auth, checkUserName, component: Component, ...rest }) => {
    document.title = 'MAP'
    return (
        <Route

            {...rest}

            render={() =>
                (auth === true || forgetpass === true ) ? (<Component />) : (<Redirect to="/login" />)

            }
        />

    )
}

const ProtectedHome = ({ auth, checkUserName, component: Component, ...rest }) => {
    document.title = 'HOME'
    return (
        <Route

            {...rest}

            render={() =>

                <Component />

            }
        />

    )
}
const ProtectedChangePassword = ({ auth, checkUserName, component: Component, ...rest }) => {
    document.title = 'CHANGE YOURPASSWORD'

    const token = Cookies.get("token");
    const refreshtoken = Cookies.get("refreshtoken");
    const Username = Cookies.get("checkUserName");

    if (token && Username && refreshtoken) {
        return (
            <Route

                {...rest}

                render={() =>
                    (<Component />)


                }
            />
        )

    }
    else {
        return (
            <Route

                {...rest}

                render={() =>
                    <Redirect to="/login" />


                }
            />
        )

    }

}
const ProtectedProfile = ({ auth, checkUserName, component: Component, ...rest }) => {
    document.title = 'YOUR INFORMATION'

    const token = Cookies.get("token");
    const refreshtoken = Cookies.get("refreshtoken");
    const Username = Cookies.get("checkUserName");

    if (token && Username && refreshtoken) {
        return (
            <Route

                {...rest}

                render={() =>
                    (<Component />)


                }
            />
        )

    }
    else {
        return (
            <Route

                {...rest}

                render={() =>
                    <Redirect to="/login" />


                }
            />
        )

    }

}
const ProtectedLogin = ({ checkUserName, auth, component: Component, ...rest }) => {
    document.title = 'LOGIN'
    var url_string = window.location.href
    var url = new URL(url_string);
    var token = url.searchParams.get("token");

    return (
        <Route
            {...rest}

            render={() =>
                (auth === true) ? (<Redirect to="/parkingmap" />) : (<Component />)


            }
        />

    )
}

const ProtectedUpdate = ({ auth, checkUserName, component: Component, ...rest }) => {
    document.title = 'UPDATE'

    const token = Cookies.get("token");
    const refreshtoken = Cookies.get("refreshtoken");
    const Username = Cookies.get("checkUserName");

    if (token && Username && refreshtoken) {
        return (
            <Route

                {...rest}

                render={() =>
                    (<Component />)


                }
            />
        )

    }
    else {
        return (
            <Route

                {...rest}

                render={() =>
                    <Redirect to="/login" />


                }
            />
        )

    }
}

const ProtectedRegister = ({ auth, checkUserName, component: Component, ...rest }) => {
    document.title = 'REGISTER'
    return (
        <Route
            {...rest}

            render={() =>
                (auth === true) ? (<Redirect to="/profile" />) : (<Component />)

            }
        />

    )
}

const ProtectedForgetPassword = ({ checkUserName, auth, component: Component, ...rest }) => {
    document.title = 'FORGETPASSWORD'
    return (
        <Route
            {...rest}

            render={() =>

                (auth === true) ? (<Redirect to="/profile" />) : (<Component />)


            }
        />

    )
}
const ProtectedResetPassword = ({ forgetpass,checkUserName, auth, component: Component, ...rest }) => {
    document.title = 'RESETPASSWORD'
  
    return (
        <Route
            {...rest}

            render={() =>

                (auth === true) ? (<Redirect to="/profile" />) : (<Component />)

            }
        />

    )
}
const ProtectedClickActivateAccount = ({ checkUserName, auth, component: Component, ...rest }) => {
    document.title = 'ProtectedClickActivateAccount'

    return (
        <Route
            {...rest}

            render={() =>

                (auth === true) ? (<Redirect to="/profile" />) : (<Component />)


            }
        />

    )
}
const ProtectedActivateAccount = ({ checkUserName, auth, component: Component, ...rest }) => {
    document.title = 'ProtectedActivateAccount'
    return (
        <Route
            {...rest}

            render={() =>

                (auth === true) ? (<Redirect to="/profile" />) : (<Component />)


            }
        />

    )
}


export default Home;
