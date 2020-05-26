import React, { useState, useEffect } from 'react';
import Resetpassword from "./Resetpassword"
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb'
import { StatusCode } from 'grpc-web'
import { AuthServiceClient } from '../api/Auth_grpc_web_pb';
import authProto from '../api/Auth_pb';
import Container from './Landing'
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


let username = localStorage.getItem("username");

const PreResetPassword = () => {
    const Auth = React.useContext(AuthApi)
    const [status, setstatus] = React.useState(true)
    const [statusmail, setstatusmail] = React.useState(true)
    var url_string = window.location.href
    var url = new URL(url_string);
    var tmptoken = url.searchParams.get("token");
  

    const callgenerateNewToken = () => {
        const token = 'Bearer ' + tmptoken;
        const metadata = { 'Authorization': token }
        const request = new Empty()
        authService.generateNewToken(request, metadata, (err, res) => {
            if (err) {
                console.log(err)
                setstatus(false)
            } else {

                setstatusmail(false)
                Cookies.set("token", res.getAccesstoken())

            }

        })
    }


    React.useEffect(() => {
     
        if(username===null || tmptoken === null ){
            setstatus(false)
        }
        else{
            callgenerateNewToken(Auth);
        }
           

    }, [])


    return (

        <>
            {
                (status === true) ?
                    (
                        (statusmail === true) ? 
                        <Container ></Container>
                        : (<Resetpassword />)

                    )
                    :
                    (<h1>CÓ LỖI XẢY RA </h1>)
            }


        </>
    );
};
export default PreResetPassword;
