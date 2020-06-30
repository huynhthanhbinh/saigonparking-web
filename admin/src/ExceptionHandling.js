import { AuthServiceClient } from './api/Auth_grpc_web_pb';
import AuthProto from './api/Auth_pb';
import Landing from './components/Landing'
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

import { API_URL } from './saigonparking';
import Cookies from 'js-cookie'
import Modal from 'react-modal';
const authService = new AuthServiceClient(API_URL)

let exceptionHandler = {}

exceptionHandler.handleAccessTokenExpired = (errCode) => { /** != Auth Service */
    /** 
     * 1. Gui refresh token xuong xin cap access token moi
     * 2. Neu tra ve refresh token het han: vui long dang nhap lai
     * 3. Neu thanh cong, co 2 truong hop tra ve:
     *  3.1. Tra ve access token only (refresh token con hsd hon 7 ngay)
     *      -> luu lai access token
     *  3.2. Tra ve ca access token va refresh token (refresh token sap het han: duoc cap refresh token moi)
     *      -> luu lai access token  + refresh token
     */
    if (errCode === 'SPE#00001') {
        const refreshtoken = Cookies.get('refreshtoken')
        const token = 'Bearer ' + refreshtoken;
        const metadata = { 'Authorization': token }
        const request = new Empty()

        authService.generateNewToken(request, metadata, (err, res) => {
            if (err) {
                exceptionHandler.handleRefreshTokenExpired(err.message)
                return false

            } else {

                if (res.getRefreshtoken() === '') {
                    /** luu access token */
                    Cookies.set("token", res.getAccesstoken())
                    

                } else {
                    /** luu new access token + new refresh token */
                    Cookies.set("token", res.getAccesstoken())
                    Cookies.set("refreshtoken", res.getRefreshtoken())
                }
                // console.log("accesstoken mới")
                return true
            }
        })
    }

}

exceptionHandler.handleRefreshTokenExpired = (errCode) => {
    /** khi da gui request generate new access token va nhan ve error refresh token da het han  */
    /** Vui long dang nhap lai */
    if (errCode === 'SPE#00001') {
        Cookies.remove("checkUserName");
        Cookies.remove("token");
        Cookies.remove("isAdmin");
        Cookies.remove("refreshtoken");
        
        localStorage.clear()
    }
}

exceptionHandler.handleActivateAccountTokenExpired = (errCode) => {
    /** khi nguoi dung bam do link trong mail, gui request kem token xuong server, neu token het han se tra loi */
    /** Thong bao token da het han, vui long chon gui lai mail 
     * Luu y voi user: mail chi co gia tri su dung trong vong 5 phut !
    */
    if (errCode === 'SPE#00001') {

    }
}

exceptionHandler.handleResetPasswordTokenExpired = (errCode) => {
    /** khi nguoi dung bam do link trong mail, gui request kem token xuong server, neu token het han se tra loi */
    /** Thong bao token da het han, vui long chon gui lai mail 
     * Luu y voi user: mail chi co gia tri su dung trong vong 5 phut !
    */
    if (errCode === 'SPE#00001') {

    }
}

export default exceptionHandler;