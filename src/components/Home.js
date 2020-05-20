import React,{useRef} from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../css/navbar.css';
import Information from "./Information"
import Login from './Login';
import Register from './Register';
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";


function Home() {
    const [auth,setAuth] = React.useState(false);
    const [checkUserName,setcheckUserName] = React.useState(null)

    const readcookie = ()=>{
        const token = Cookies.get("token");
        const checkUserName = Cookies.get("checkUserName");
        if(token && checkUserName )
        {
            setAuth(true);
            setcheckUserName(checkUserName)
        }
    }
    
    React.useEffect(()=>{
        readcookie()
    },[])

    return (
       <AuthApi.Provider value={{checkUserName,setcheckUserName,auth,setAuth,}}>
        <Router>
            <Links></Links>
            <Routes></Routes>
        </Router>
       </AuthApi.Provider> 
        
        
    );
}
const Links = ()=>{
    return (
        <nav>
        <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li style={{float:"right"}}>
            <Link to="/login">Login</Link>
        </li>
        <li style={{float:"right"}}>
            <Link to="/register">register</Link>
        </li>
        </ul>
    </nav>

    )
    
}
const Routes = () =>{
    const Auth = React.useContext(AuthApi)
    return(
        <Switch>
            <ProtectedLogin path="/login" component={Login} auth={Auth.auth}  ></ProtectedLogin>
            <ProtectedRegister path="/register" component={Register} auth={Auth.auth} ></ProtectedRegister>
            <ProtectedRoute path="/Information" auth={Auth.auth} checkUserName={Auth.checkUserName} component={Information}></ProtectedRoute>
        </Switch>
    )
}
const ProtectedRoute = ({auth,checkUserName,component:Component,...rest}) =>{
    return(
        <Route
            {...rest}
            render={()=>
            (auth===true)?(<Component/>):(<Redirect to = "/login"/>)
                
            }
        />

    )
}
const ProtectedLogin = ({auth,component:Component,...rest}) =>{
    
    return(
        <Route
            {...rest}
            
            render={()=>
            (!auth)?(<Component/>):(<Redirect to = "/Information"/>)
                
            }
        />

    )
}

const ProtectedRegister = ({auth,component:Component,...rest}) =>{
    
    return(
        <Route
            {...rest}
            
            render={()=>
            (!auth)?(<Component/>):(<Redirect to = "/Information"/>)
                
            }
        />

    )
}

export default Home;
