import React from 'react';
import ControlledCarousel from './Home/Slider'



import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
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
    const [isAdmin,setIsAdmin] = React.useState(false);

    const readcookie = () => {
        const token = Cookies.get("token");
        const checkUserName = Cookies.get("checkUserName");
        const isAdmin = Cookies.get("isAdmin");
        if (token && checkUserName) {
            setAuth(true);
            setcheckUserName(checkUserName)
            if(isAdmin!=null)
            {
                setIsAdmin(true)
            }
            else
            {
                setIsAdmin(false)
            }
        }
    }

    React.useEffect(() => {
        readcookie()
    }, [])

    return (
        <AuthApi.Provider value={{ checkUserName, setcheckUserName,isAdmin ,setIsAdmin,  auth, setAuth  }}>
            <Router>
                <div>
                    <Links></Links>
                    <main>
                        <Container>
                            <Routes ></Routes>
                        </Container>
                    </main>

                    <footer class="footer">
                        <Footer></Footer>
                    </footer>
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
        height: "60px",
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
                Xin chao
            </div>
        </div>
    )

}
const Links = () => {

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
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown" >
                            <NavDropdown.Item href="/login" >LOGIN</NavDropdown.Item>
                            <NavDropdown.Item ><Link to="/profile" >INFORMATION</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link to="/register" >REGISTER</Link></NavDropdown.Item>

                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </div>

                </Navbar.Collapse>
            </Navbar>


        </>
    
    
       
    
    )

}
const Routes = () => {
    const Auth = React.useContext(AuthApi)
    return (
        <>
            <Switch>
                <ProtectedHome exact path="/" component={ControlledCarousel} auth={Auth.auth}  ></ProtectedHome>
              
                <ProtectedLoginAdmin  path="/loginadmin" component={LoginAdmin} auth={Auth.auth} isAdmin={Auth.isAdmin} ></ProtectedLoginAdmin>
                <ProtectedAdmin  path="/admin" component={Admin} auth={Auth.auth} isAdmin={Auth.isAdmin} ></ProtectedAdmin>
                <ProtectedAdmingetallparkinglot  path="/getallparkinglot" component={Admingetallparkinglot} auth={Auth.auth} isAdmin={Auth.isAdmin}  ></ProtectedAdmingetallparkinglot>
                <ProtectedAdmingetalluser  path="/getalluser" component={Admingetalluser} auth={Auth.auth} isAdmin={Auth.isAdmin}  ></ProtectedAdmingetalluser>
                

                <ProtectedMap path="/mymap" component={CovidDashboard} auth={Auth.auth}  ></ProtectedMap>
                <ProtectedLogin path="/login" component={Login} auth={Auth.auth}  ></ProtectedLogin>
                <ProtectedRegister path="/register" component={Register} auth={Auth.auth} ></ProtectedRegister>
                <ProtectedRoute exact path="/profile" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Information}></ProtectedRoute>
                <ProtectedUpdate path="/profile/update" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Update}></ProtectedUpdate>
                <ProtectedForgetPassword path="/forget-password" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Forgetpassword}></ProtectedForgetPassword>
                <ProtectedResetPassword path="/reset-password" auth={Auth.auth} checkUserName={Auth.checkUserName} component={PreResetPassword}></ProtectedResetPassword>

            </Switch>

        </>
    )
}
const ProtectedAdmingetalluser = ({ auth, checkUserName,isAdmin, component: Component, ...rest }) => {
    document.title = 'ADMIN'
    return (
        <Route

            {...rest}

            render={() =>
                (auth === true && isAdmin === true) ? (<Component />) : (<Redirect to="/loginadmin" />)

            }
        />

    )
}
const ProtectedAdmingetallparkinglot = ({ auth, checkUserName,isAdmin, component: Component, ...rest }) => {
    document.title = 'ADMIN'
    return (
        <Route

            {...rest}

            render={() =>
                // (auth === true && isAdmin === true) ? (<Component />) : (<Redirect to="/loginadmin" />)
                <Component></Component>
            }
        />

    )
}
const ProtectedAdmin = ({ auth, checkUserName,isAdmin, component: Component, ...rest }) => {
    document.title = 'ADMIN'
    return (
        <Route

            {...rest}

            render={() =>
                (auth === true && isAdmin === true) ? (<Component />) : (<Redirect to="/loginadmin" />)
            }
        />

    )
}
const ProtectedLoginAdmin = ({ auth, checkUserName, isAdmin, component: Component, ...rest }) => {
    document.title = 'ADMIN'
    return (
        <Route

            {...rest}

            render={() =>
            //  (auth === false && isAdmin === false) ? (<Component />) : (<Redirect to="/admin" />)
             <Component></Component>
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
const ProtectedRoute = ({ auth, checkUserName, component: Component, ...rest }) => {
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
    console.log(token)
    return (
        <Route
            {...rest}

            render={() =>
                (!auth) ? (<Component />) : (<Redirect to="/mymap" />)

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
