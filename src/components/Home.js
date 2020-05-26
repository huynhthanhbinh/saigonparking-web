import React from 'react';
import '../css/navbar.css';
import Carousel from './Home/Slider'

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



function Home() {
    const [auth, setAuth] = React.useState(false);
    const [checkUserName, setcheckUserName] = React.useState(null)
    const [isupdate, setIsupdate] = React.useState("asd")

    const readcookie = () => {
        const token = Cookies.get("token");
        const checkUserName = Cookies.get("checkUserName");
        if (token && checkUserName) {
            setAuth(true);
            setcheckUserName(checkUserName)
        }
    }

    React.useEffect(() => {
        readcookie()
    }, [])

    return (
        <AuthApi.Provider value={{ checkUserName, setcheckUserName, auth, setAuth }}>
            <Router>

                <Links></Links>


                <Routes ></Routes>

            </Router>
        </AuthApi.Provider>


    );
}
const Links = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li style={{ float: "right" }}>
                    <Link to="/login">Login</Link>
                </li>
                <li style={{ float: "right" }}>
                    <Link to="/register">register</Link>
                </li>
            </ul>
        </nav>

    )

}
const Routes = () => {
    const Auth = React.useContext(AuthApi)
    return (
        <>
            <Switch>
                <ProtectedHome exact path="/" component={Carousel} auth={Auth.auth}  ></ProtectedHome>
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
const ProtectedHome = ({ auth, checkUserName, component: Component, ...rest }) => {

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
    var url_string = window.location.href
    var url = new URL(url_string);
    var token = url.searchParams.get("token");
    console.log(token)
    return (
        <Route
            {...rest}

            render={() =>
                (!auth) ? (<Component />) : (<Redirect to="/profile" />)

            }
        />

    )
}

const ProtectedUpdate = ({ auth, checkUserName, component: Component, ...rest }) => {
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
