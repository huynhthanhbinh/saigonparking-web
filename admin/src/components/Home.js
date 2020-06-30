import React from 'react';

//Sidebar Default
import Navbardefault from './Nav/Navbar'

//404 Page
import Page404 from './404/Page404'

//admin
import LoginAdmin from './Admin/Login/LoginAdmin'
import Resetpassword from './Resetpassword'
import Dashboard from './Admin/Dashboard'
import Admingetalluser from './Admin/User/Admingetalluser'
import Admingetallparkinglot from './Admin/Parkinglot/Admingetallparkinglot'

//Activate Account
import ClickActivateAccount from './ActivateAccount/ClickActivateAccount'
import PreActivateAccount from './ActivateAccount/PreActivateAccount'
//
import Information from "./Information"
import Forgetpassword from './Forgetpassword'
import PreResetPassword from './PreResetPassword'
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie'
import sessionstorage from 'sessionstorage'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

// libary transition change page
import { CSSTransition, TransitionGroup } from 'react-transition-group'


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
    // console.log(auth)
    return (
        <AuthApi.Provider value={{ checkUserName, setcheckUserName, auth, setAuth }}>
            <Router>
                <Navbardefault />
                <main>
                    <Routes />
                </main>
            </Router>
        </AuthApi.Provider>


    );
}

const RemoveCookie = () => {
    Cookies.remove ("token");
    Cookies.remove ("refreshtoken");
    Cookies.remove ("checkUserName");
    sessionstorage.clear();
}

const Routes = (location) => {
    const Auth = React.useContext(AuthApi)

    //Page Error 404
    const ProtectedError404 = ({ component: Component }) => {
        document.title = 'ERROR404'
        return (<Component />)
    }

    const ProtectedAdmingetalluser = ({ auth, checkUserName, component: Component, ...rest }) => {
        document.title = 'ADMIN USER'
        const token = Cookies.get("token");
        const refreshtoken = Cookies.get("refreshtoken");
        const Username = Cookies.get("checkUserName");
        if (token && refreshtoken && Username) {
            return (<Component />)
        }
        else {
            RemoveCookie();
            window.location.href = "/login"
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
            RemoveCookie();
            window.location.href = "/login"
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

    // const ProtectedMap = ({ auth, checkUserName, component: Component, ...rest }) => {
    //     document.title = 'MAP'
    //     return (
    //         <Route
    //             {...rest}
    //             render={() =>
    //                 (auth === true) ? (<Component />) : (<Redirect to="/login" />)
    //             }
    //         />
    //     )
    // }

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
            RemoveCookie();
            window.location.href = "/login"
        }
    }

    // const ProtectedUpdate = ({ auth, checkUserName, component: Component, ...rest }) => {
    //     document.title = 'UPDATE'
    //     return (
    //         <Route
    //             {...rest}
    //             render={() =>
    //                 (auth === true) ? (<Component />) : (<Redirect to="/login" />)
    //             }
    //         />
    //     )
    // }

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

    return (
        /* Animation */
        <Route render={({ location }) => (
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={500}
                    classNames="fade">
                    <Switch location={location}>
                        {/* Add more route here */}
                        <ProtectedAdmin exact path="/" component={Dashboard} auth={Auth.auth} checkUserName={Auth.checkUserName} ></ProtectedAdmin>

                        <ProtectedLoginAdmin path="/login" component={LoginAdmin} auth={Auth.auth} checkUserName={Auth.checkUserName} ></ProtectedLoginAdmin>

                        <ProtectedAdmingetallparkinglot exact path="/getallparkinglot" component={Admingetallparkinglot} auth={Auth.auth} checkUserName={Auth.checkUserName}  ></ProtectedAdmingetallparkinglot>

                        <ProtectedAdmingetalluser exact path="/getalluser" component={Admingetalluser} auth={Auth.auth} checkUserName={Auth.checkUserName} ></ProtectedAdmingetalluser>

                        {/* <ProtectedMap path="/parkingmap" component={CovidDashboard} auth={Auth.auth}  ></ProtectedMap> */}

                        <ProtectedProfile exact path="/profile" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Information}></ProtectedProfile>

                        <ProtectedChangePassword exact path="/profile/changepassword" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Resetpassword}></ProtectedChangePassword>

                        <ProtectedForgetPassword exact path="/forget-password" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Forgetpassword}></ProtectedForgetPassword>

                        <ProtectedResetPassword exact path="/reset-password" auth={Auth.auth} checkUserName={Auth.checkUserName} component={PreResetPassword}></ProtectedResetPassword>

                        <ProtectedClickActivateAccount exact path="/clickactivateaccount" auth={Auth.auth} checkUserName={Auth.checkUserName} component={ClickActivateAccount}></ProtectedClickActivateAccount>

                        <ProtectedActivateAccount exact path="/activate-account" auth={Auth.auth} checkUserName={Auth.checkUserName} component={PreActivateAccount}></ProtectedActivateAccount>

                        <ProtectedError404 exact path="/404" component={Page404} />

                        <Redirect from="*" to="/404" />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        )} />

    )
}


export default Home;
