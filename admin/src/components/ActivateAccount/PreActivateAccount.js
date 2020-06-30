import React, { useCallback } from 'react';
import ActivateAccount from "./ActivateAccount"
import AuthApi from "../Auth/AuthAPI";
import Cookies from 'js-cookie';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb'
import { AuthServiceClient } from '../../api/Auth_grpc_web_pb';
import Container from '../Landing'
import { API_URL } from '../../saigonparking';

const authService = new AuthServiceClient(API_URL)

const PreActivateAccount = () => {
    const Auth = React.useContext(AuthApi)
    const [status, setstatus] = React.useState(true)
    const [statusmail, setstatusmail] = React.useState(true)
    let url_string = window.location.href
    let url = new URL(url_string);
    let tmptoken = url.searchParams.get("token");

    const callactivateNewAccount = useCallback(
        () => {
            const token = 'Bearer ' + tmptoken;
            const metadata = { 'Authorization': token }
            const request = new Empty()
            authService.activateNewAccount(request, metadata, (err, res) => {
                if (err) {
                    alert("Link khong con kha dung")
                    setstatus(false)
                } else {
                    setstatusmail(false)
                    Auth.setcheckUserName(res.getUsername())
                    Auth.setAuth(true)
                    Cookies.set("token", res.getAccesstoken())
                    Cookies.set("refreshtoken", res.getRefreshtoken())
                    Cookies.set("checkUserName", res.getUsername())
                }
            })
        },[Auth, tmptoken],
    )

    React.useEffect(() => {
        if (tmptoken === null) {
            setstatus(false)
        }
        else {
            callactivateNewAccount(Auth);
        }
    }, [Auth, callactivateNewAccount, tmptoken])

    return (
        <>
            {
                (status === true) ?
                    (
                        (statusmail === true) ?
                            <Container ></Container>
                            : (<ActivateAccount />)

                    )
                    :
                    (<h1>CÓ LỖI XẢY RA , CẦN GỬI LẠI MAIL MỚI </h1>)
            }


        </>
    );
};
export default PreActivateAccount;
