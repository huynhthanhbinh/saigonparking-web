import React from "react";
import Navbardefault from './Navbar/Navbar'
import Body from './Body/Body'
// import { Nav, Navbar } from "react-bootstrap";
//Error 404
import '../css/Error404.css'
//Activate Account
import ClickActivateAccount from './ActivateAccount/ClickActivateAccount'
import PreActivateAccount from './ActivateAccount/PreActivateAccount'
import Resetpassword from './Resetpassword'
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
    Redirect
} from "react-router-dom";

function Home() {
    const [auth, setAuth] = React.useState(false);
    const [checkUserName, setcheckUserName] = React.useState(null)
    const [forgetpass, setforgetpass] = React.useState(false)

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
        <AuthApi.Provider value={{ auth, setAuth, checkUserName, setcheckUserName, forgetpass, setforgetpass }}>
            <Router>
                <Navbardefault />
                <Routes />
            </Router>
        </AuthApi.Provider>
    );
}

const Routes = () => {
    const Auth = React.useContext(AuthApi)

    return (
        <Switch>
            <ProtectedHome exact path="/" component={Body} auth={Auth.auth}  ></ProtectedHome>
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
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: '2'
                        }} class="cont_error">
                            < h2 style={{ color: 'black', fontSize: '4vh' }} className="Binh">Saigon Parking Service</h2>
                            <h1 style={{ color: 'black', fontSize: '15vh' }} className="Binh">Oops</h1>
                            <p style={{ color: 'black', fontSize: '3vh' }} className="Binh">The page you're looking for isn't here.</p>
                        </div >
                        <div class="cont_aura_1"></div>
                        <div class="cont_aura_2"></div>
                    </div >
                )
            }
        />
    )
}

const ProtectedMap = ({ forgetpass, auth, checkUserName, component: Component, ...rest }) => {
    document.title = 'MAP'
    return (
        <Route
            {...rest}
            render={() =>
                (auth === true || forgetpass === true) ? (<Component />) : (<Redirect to="/login" />)
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
const ProtectedResetPassword = ({ forgetpass, checkUserName, auth, component: Component, ...rest }) => {
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
    document.title = 'Active Acount'

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
    document.title = 'Activated Account'
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
