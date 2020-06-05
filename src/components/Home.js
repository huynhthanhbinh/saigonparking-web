import React from 'react';
import ControlledCarousel from './Home/Slider'



import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Container from 'react-bootstrap/Container';

import { Nav, Navbar, NavItem } from "react-bootstrap";



import NavDropdown from 'react-bootstrap/NavDropdown'
//admin
import LoginAdmin from './Admin/LoginAdmin'
import Admin from './Admin/Admin'
import Admingetalluser from './Admin/User/Admingetalluser'
import Admingetallparkinglot from './Admin/Parkinglot/Admingetallparkinglot'
//
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
import auth from '../api/Auth_grpc_web_pb';



function Home() {
    const [auth, setAuth] = React.useState(false);
    const [checkUserName, setcheckUserName] = React.useState(null)
    const [isupdate, setIsupdate] = React.useState("asd")
    const [isAdmin, setIsAdmin] = React.useState(null);

    const readcookie = () => {
        const token = Cookies.get("token");
        const checkUserName = Cookies.get("checkUserName");
        const isadmin = Cookies.get("isAdmin");
        if (token && checkUserName ) {
            setAuth(true);
            setcheckUserName(checkUserName)
            if(isadmin!=null)
            {
                setIsAdmin(isadmin)
            }
            
        }
    }

    React.useEffect(() => {
        readcookie()
    }, [])

    return (
        <AuthApi.Provider value={{ checkUserName, setcheckUserName, isAdmin, setIsAdmin, auth, setAuth }}>
            <Router>
                <div>
                    <Links></Links>
                    <main>
                        <Container>
                            <Routes ></Routes>
                        </Container>
                    </main>

                    {/* <footer className="footer">
                        <Footer></Footer>
                    </footer> */}
                </div>


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
    const Auth = React.useContext(AuthApi)
    const ClickLogOut = () => {
        Auth.setAuth(false)
        Auth.setIsAdmin(null)
        Auth.setcheckUserName(null)
        Cookies.remove("checkUserName");
        Cookies.remove("token");
        Cookies.remove("isAdmin");
        localStorage.clear()
    }
    if (Auth.auth === true && Auth.isAdmin != null) {
        return (
            <>
                <Navbar bg="dark" expand="lg">
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
                            <NavDropdown title={
                                <span className="text-primary my-auto">{Auth.checkUserName}</span>
                            }
                                id="nav-dropdown">

                                <NavDropdown.Item ><Link to="/profile" >PROFILE</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to="/admin" >ADMIN</Link></NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={ClickLogOut} >LOGOUT</NavDropdown.Item>
                            </NavDropdown>
                        </div>

                    </Navbar.Collapse>
                </Navbar>
            </>

        )

    }
    if (Auth.auth === true) {
        return (
            <>
                <Navbar bg="dark" expand="lg">
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
                            <NavDropdown title={
                                <span className="text-primary my-auto">{Auth.checkUserName}</span>
                            }
                                id="nav-dropdown">

                                <NavDropdown.Item ><Link to="/profile" >PROFILE</Link></NavDropdown.Item>


                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={ClickLogOut} >LOGOUT</NavDropdown.Item>
                            </NavDropdown>
                        </div>

                    </Navbar.Collapse>
                </Navbar>
            </>

        )

    }
    else if (Auth.auth == false) {
        return (
            <>
                <Navbar bg="dark" expand="lg">
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
                            <NavDropdown title="ĐĂNG NHẬP" id="basic-nav-dropdown" >
                                <NavDropdown.Item ><Link to="/login" >LOGIN</Link></NavDropdown.Item>

                                <NavDropdown.Item ><Link to="/register" >REGISTER</Link></NavDropdown.Item>

                                <NavDropdown.Divider />

                            </NavDropdown>
                        </div>

                    </Navbar.Collapse>
                </Navbar>
            </>

        )

    }
}
const Routes = () => {
    const Auth = React.useContext(AuthApi)
    return (
        <>
            <Switch>
                <ProtectedHome exact path="/" component={ControlledCarousel} auth={Auth.auth}  ></ProtectedHome>

                <ProtectedLoginAdmin path="/loginadmin" component={LoginAdmin} auth={Auth.auth} isAdmin={Auth.isAdmin} checkUserName={Auth.checkUserName} ></ProtectedLoginAdmin>
                <ProtectedAdmin path="/admin" component={Admin} auth={Auth.auth} isAdmin={Auth.isAdmin} checkUserName={Auth.checkUserName} ></ProtectedAdmin>

                <ProtectedAdmingetallparkinglot exact path="/getallparkinglot" component={Admingetallparkinglot} auth={Auth.auth} isAdmin={Auth.isAdmin} checkUserName={Auth.checkUserName}  ></ProtectedAdmingetallparkinglot>
                <ProtectedAdminupdateparkinglot exact path="/getallparkinglot/update/:parkinglotId" component={Admingetallparkinglot} auth={Auth.auth} isAdmin={Auth.isAdmin}  checkUserName={Auth.checkUserName} ></ProtectedAdminupdateparkinglot>



                <ProtectedAdmingetalluser exact path="/getalluser" component={Admingetalluser} auth={Auth.auth} isAdmin={Auth.isAdmin} checkUserName={Auth.checkUserName} ></ProtectedAdmingetalluser>


                <ProtectedMap path="/mymap" component={CovidDashboard} auth={Auth.auth}  ></ProtectedMap>
                <ProtectedLogin path="/login" component={Login} auth={Auth.auth}  ></ProtectedLogin>
                <ProtectedRegister path="/register" component={Register} auth={Auth.auth} ></ProtectedRegister>
                <ProtectedProfile exact path="/profile" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Information}></ProtectedProfile>
                <ProtectedUpdate path="/profile/update" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Update}></ProtectedUpdate>
                <ProtectedForgetPassword path="/forget-password" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Forgetpassword}></ProtectedForgetPassword>
                <ProtectedResetPassword path="/reset-password" auth={Auth.auth} checkUserName={Auth.checkUserName} component={PreResetPassword}></ProtectedResetPassword>

            </Switch>

        </>
    )
}
const ProtectedAdmingetalluser = ({ auth, checkUserName, isAdmin, component: Component, ...rest }) => {
    document.title = 'ADMIN USER'
    return (
        <Route

            {...rest}

            render={() =>
                // (isAdmin != null && auth === true && checkUserName != null) ? (<Component />) : (<Redirect to="/loginadmin" />)
                    <Component></Component>
            }
        />

    )
}
const ProtectedAdmingetallparkinglot = ({ auth, checkUserName, isAdmin, component: Component, ...rest }) => {
    document.title = 'ADMIN PARKING LOT'
    return (
        <Route

            {...rest}

            render={() =>
                // (isAdmin != null && auth === true && checkUserName != null) ? (<Component />) : (<Redirect to="/loginadmin" />)
                <Component></Component>
            }
        />

    )
}
const ProtectedAdminupdateparkinglot = ({ auth, checkUserName, isAdmin, component: Component, ...rest }) => {
    document.title = 'UPDATE PARKING LOT'
    
    return (
        <Route

            {...rest}

            render={({ match }) => {
                const currentId = match.params.parkinglotId;
                console.log(match)
                return (
                    <div>
                        <h3>Welcome to the {currentId} </h3>
                    </div>
                );
            }
            }
        />

    )
}

const ProtectedAdmin = ({ auth, checkUserName, isAdmin, component: Component, ...rest }) => {
    document.title = 'ADMIN'
    return (
        <Route

            {...rest}

            render={() =>
                (isAdmin != null && auth === true && checkUserName != null) ? (<Component />) : (<Redirect to="/loginadmin" />)
            }
        />

    )
}
const ProtectedLoginAdmin = ({ auth, checkUserName, isAdmin, component: Component, ...rest }) => {
    document.title = 'LOGIN ADMIN'
    console.log(isAdmin)
    console.log(checkUserName)
    console.log(auth)
    return (
        <Route

            {...rest}

            render={() =>

                (isAdmin != null && auth === true && checkUserName != null) ? (<Redirect to="/admin" />) : (<Component />)

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
const ProtectedProfile = ({ auth, checkUserName, component: Component, ...rest }) => {
    document.title = 'YOUR INFORMATION'
    return (
        <Route

            {...rest}

            render={() =>
                (auth === true) ? (<Component />) : (<Redirect to="/login" />)

            }
        />

    )
}
const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
    document.title = 'LOGIN'
    var url_string = window.location.href
    var url = new URL(url_string);
    var token = url.searchParams.get("token");
   
    return (
        <Route
            {...rest}

            render={() =>
                (auth===false) ? (<Component />) : (<Redirect to="/mymap" />)

            }
        />

    )
}

const ProtectedUpdate = ({ auth, checkUserName, component: Component, ...rest }) => {
    document.title = 'UPDATE'
    return (
        <Route

            {...rest}

            render={() =>
                // (auth === true) ? (<Component />) : (<Redirect to="/login" />)
                <Component></Component>

            }
        />

    )
}

const ProtectedRegister = ({ auth, component: Component, ...rest }) => {
    document.title = 'REGISTER'
    return (
        <Route
            {...rest}

            render={() =>
                (!auth) ? (<Component />) : (<Redirect to="/profile" />)

            }
        />

    )
}

const ProtectedForgetPassword = ({ auth, component: Component, ...rest }) => {
    document.title = 'FORGETPASSWORD'
    return (
        <Route
            {...rest}

            render={() =>

                <Component />

            }
        />

    )
}
const ProtectedResetPassword = ({ auth, component: Component, ...rest }) => {
    document.title = 'RESETPASSWORD'
    return (
        <Route
            {...rest}

            render={() =>

                <Component />

            }
        />

    )
}

export default Home;
