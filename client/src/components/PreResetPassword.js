import React from 'react';
import Resetpassword from "./Resetpassword"
import AuthApi from "./Auth/AuthAPI";
import Cookies, { set } from 'js-cookie';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb'

import { AuthServiceClient } from '../api/Auth_grpc_web_pb';

import Container from './Landing'

import { API_URL } from '../saigonparking';


const authService = new AuthServiceClient(API_URL)



const PreResetPassword = () => {
    const Auth = React.useContext(AuthApi)
    const [status, setstatus] = React.useState(true)
    const [statusmail, setstatusmail] = React.useState(true)
    const [tmp, settmp] = React.useState(null)
    var url_string = window.location.href
    var url = new URL(url_string);
    var tmptoken = url.searchParams.get("token");


    const callgenerateNewToken = () => {
        const token = 'Bearer ' + tmptoken;
        const metadata = { 'Authorization': token }
        const request = new Empty()
        authService.generateNewToken(request, metadata, (err, res) => {
            if (err) {
                alert("Link khong con kha dung")
                setstatus(false)
            } else {
                Auth.setforgetpass(true)
                settmp(res.getUsername())
                setstatusmail(false)

                Cookies.set("token", res.getAccesstoken())
                Cookies.set("refreshtoken", res.getRefreshtoken())
                Cookies.set("checkUserName", res.getUsername())
            }

        })
    }


    React.useEffect(() => {

        if (tmptoken === null) {
            setstatus(false)
        }
        else {
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
                            : (<Resetpassword username={tmp} />)

                    )
                    :
                    (<h1>CÓ LỖI XẢY RA , CẦN GỬI LẠI MAIL MỚI </h1>)
            }


        </>
    );
};
export default PreResetPassword;
