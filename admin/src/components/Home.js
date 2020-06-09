import React from 'react';
import ControlledCarousel from './Home/Slider'

import Container from 'react-bootstrap/Container';

import { Nav, Navbar } from "react-bootstrap";
//css
import styled from 'styled-components';


import NavDropdown from 'react-bootstrap/NavDropdown'
//admin
import LoginAdmin from './Admin/LoginAdmin'
import Admin from './Admin/Admin'
import Admingetalluser from './Admin/User/Admingetalluser'
import Admingetallparkinglot from './Admin/Parkinglot/Admingetallparkinglot'
//
//Activate Account
import ClickActivateAccount from './ActivateAccount/ClickActivateAccount'
import PreActivateAccount from './ActivateAccount/PreActivateAccount'
//
import CovidDashboard from './Map/CovidDashboard'
import Information from "./Information"


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
import auth from '../api/Auth_grpc_web_pb';



function Home() {
    const [auth, setAuth] = React.useState(false);
    const [checkUserName, setcheckUserName] = React.useState(null)



    const readcookie = () => {
        const token = Cookies.get("token");
        const refreshtoken = Cookies.get("refreshtoken");

        const checkUserName = Cookies.get("checkUserName");

        if (token && checkUserName && refreshtoken) {
            setAuth(true);
            setcheckUserName(checkUserName)



        }
    }

    React.useEffect(() => {
        readcookie()
    })
    console.log(auth)
    return (
        <AuthApi.Provider value={{ checkUserName, setcheckUserName, auth, setAuth }}>
            <Router>
                <Links />
                <Container>
                    <Routes></Routes>
                </Container>

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

        Auth.setcheckUserName(null)
        Cookies.remove("checkUserName");
        Cookies.remove("token");

        Cookies.remove("refreshtoken");

        localStorage.clear()
    }

    if (Auth.auth === true) {
        return (
            <Styles>

                <Navbar expand="lg">
                    <Link to="/">
                        <Navbar.Brand >HOME</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/mymap">
                                <Nav >MAP</Nav>
                            </Link>

                        </Nav>

                        <div style={{ marginRight: "50px" }} >
                            <NavDropdown title="INFORMATION" id="basic-nav-dropdown" >

                                <NavDropdown.Item ><Link to="/profile" >PROFILE</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to="/" >ADMIN</Link></NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={ClickLogOut} >LOGOUT</NavDropdown.Item>
                            </NavDropdown>
                        </div>

                    </Navbar.Collapse>
                </Navbar>
            </Styles >

        )

    }
    else if (Auth.auth === false) {
        return (
            <Styles>
                <Navbar expand="lg">
                    <Link to="/">
                        <Navbar.Brand >HOME</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/mymap">
                                <Nav >MAP</Nav>
                            </Link>

                        </Nav>

                        <div style={{ marginRight: "50px" }} >
                            <Nav className="mr-auto">
                                <Link to="/login">
                                    <Nav >LOGIN</Nav>
                                </Link>

                            </Nav>
                        </div>

                    </Navbar.Collapse>
                </Navbar>
            </Styles >
        )

    }
}
const Routes = () => {
    const Auth = React.useContext(AuthApi)

    const ProtectedAdmingetalluser = ({ auth, checkUserName, component: Component, ...rest }) => {
        document.title = 'ADMIN USER'

        const token = Cookies.get("token");
        const refreshtoken = Cookies.get("refreshtoken");
        const Username = Cookies.get("checkUserName");
        if (token && refreshtoken && Username) {
            return (<Component />)
        }
        else {
            return (<Redirect to="/login" />)
        }
    }
    const ProtectedAdmingetallparkinglot = ({ auth, checkUserName, component: Component, ...rest }) => {
        document.title = 'ADMIN PARKING LOT'
        const token = Cookies.get("token");
        const refreshtoken = Cookies.get("refreshtoken");
        const Username = Cookies.get("checkUserName");
        if (token && refreshtoken && Username) {
            return (<Component />)
        }
        else {
            return (<Redirect to="/login" />)
        }


    }

    const ProtectedAdmin = ({ auth, checkUserName, component: Component, ...rest }) => {
        document.title = 'ADMIN'
        return (
            <Route

                {...rest}

                render={() =>
                    (auth === true) ? (<Component />) : (<Redirect to="/login" />)
                }
            />

        )
    }
    const ProtectedLoginAdmin = ({ auth, checkUserName, component: Component, ...rest }) => {
        document.title = 'LOGIN ADMIN'

        return (
            <Route

                {...rest}

                render={() =>

                    (auth === true) ? (<Redirect to="/" />) : (<Component />)

                }
            />

        )
    }
    const ProtectedMap = ({ auth, checkUserName, component: Component, ...rest }) => {
        document.title = 'MAP'
        return (
            <Route

                {...rest}

                render={() =>
                    (auth === true) ? (<Component />) : (<Redirect to="/login" />)

                }
            />

        )
    }


    const ProtectedProfile = ({ auth, checkUserName, component: Component, ...rest }) => {
        document.title = 'YOUR INFORMATION'
        document.title = 'ADMIN PARKING LOT'
        const token = Cookies.get("token");
        const refreshtoken = Cookies.get("refreshtoken");
        const Username = Cookies.get("checkUserName");
        if (token && refreshtoken && Username) {
            return (<Component />)
        }
        else {
            return (<Redirect to="/login" />)
        }
    }


    const ProtectedUpdate = ({ auth, checkUserName, component: Component, ...rest }) => {
        document.title = 'UPDATE'
        return (
            <Route

                {...rest}

                render={() =>
                    (auth === true) ? (<Component />) : (<Redirect to="/login" />)


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
    const ProtectedResetPassword = ({ checkUserName, auth, component: Component, ...rest }) => {
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

    return (

        <Switch>

            <ProtectedAdmin exact path="/" component={Admin} auth={Auth.auth} checkUserName={Auth.checkUserName} ></ProtectedAdmin>
            <ProtectedLoginAdmin path="/login" component={LoginAdmin} auth={Auth.auth} checkUserName={Auth.checkUserName} ></ProtectedLoginAdmin>


            <ProtectedAdmingetallparkinglot exact path="/getallparkinglot" component={Admingetallparkinglot} auth={Auth.auth} checkUserName={Auth.checkUserName}  ></ProtectedAdmingetallparkinglot>

            <ProtectedAdmingetalluser exact path="/getalluser" component={Admingetalluser} auth={Auth.auth} checkUserName={Auth.checkUserName} ></ProtectedAdmingetalluser>


            <ProtectedMap path="/mymap" component={CovidDashboard} auth={Auth.auth}  ></ProtectedMap>


            <ProtectedProfile exact path="/profile" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Information}></ProtectedProfile>
            <ProtectedUpdate exact path="/profile/update" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Update}></ProtectedUpdate>

            <ProtectedForgetPassword exact path="/forget-password" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Forgetpassword}></ProtectedForgetPassword>
            <ProtectedResetPassword exact path="/reset-password" auth={Auth.auth} checkUserName={Auth.checkUserName} component={PreResetPassword}></ProtectedResetPassword>

            <ProtectedClickActivateAccount exact path="/clickactivateaccount" auth={Auth.auth} checkUserName={Auth.checkUserName} component={ClickActivateAccount}></ProtectedClickActivateAccount>
            <ProtectedActivateAccount exact path="/activate-account" auth={Auth.auth} checkUserName={Auth.checkUserName} component={PreActivateAccount}></ProtectedActivateAccount>

        </Switch>


    )
}


export default Home;
