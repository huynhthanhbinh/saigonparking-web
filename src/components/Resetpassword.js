import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb'
import {StatusCode} from 'grpc-web'
import { AuthServiceClient } from '../api/Auth_grpc_web_pb';
import authProto from '../api/Auth_pb';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

const userProto = require('../api/Actor_pb')


const gatewayHost = "http://localhost:8338";

const authService = new AuthServiceClient(gatewayHost)



const Resetpassword = () => {
    const Auth = React.useContext(AuthApi)
    const [status , setstatus] = React.useState(true)
    var url_string = window.location.href
    var url = new URL(url_string);
    var tmptoken = url.searchParams.get("token");
    console.log(tmptoken)
    
    const callgenerateNewToken = ()=>{
        const token = 'Bearer ' + tmptoken;
        const metadata = { 'Authorization': token }
        const request = new Empty()
        authService.generateNewToken(request, metadata, (err, res) => {
            if (err) {
                console.log(err)
            } else {

            
                
            }

        })
    }
    
    
    React.useEffect(() => {

        callgenerateNewToken(Auth);

    }, [])


    return (
    
        <>
        {
            (status === true)?
            (<h1>Resetpassword </h1>)
            :
            (<h1>CÓ LỖI XẢY RA </h1>)
        }
                
            
        </>
    );
};
export default Resetpassword;
