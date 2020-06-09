
import React from 'react'
import Modal from 'react-modal';
import Landing from '../Landing'
import '../../css/modal.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import AuthApi from "../Auth/AuthAPI";
import Cookies from 'js-cookie'
import sessionstorage from 'sessionstorage' 

Modal.setAppElement(document.getElementById("root"));
const ModalActivateAccountError = ({ modalErrorIsOpen, closeModalError, myError, setmyError }) => {
    // const [loi,setloi]=React.useState(null)
    // React.useEffect(()=>{
    //     if(modalErrorIsOpen===true)
    //     {
    //         setloi(myError)
    //     }
    //     return()=>{

    //         setmyError(null)
    //         setloi(null)
    //     }
    // },[modalErrorIsOpen,myError])
    // /** Mã lỗi khoong co token */
    const Auth = React.useContext(AuthApi)
    const ClickLogOut = () => {
        Auth.setAuth(false)
      
        Auth.setcheckUserName(null)
        Cookies.remove("checkUserName");
        Cookies.remove("token");
        
        Cookies.remove("refreshtoken");

        sessionstorage.clear()
    }

    if (myError != null) {


        if (myError === "SPE#00008") {
            return (<Modal
                isOpen={modalErrorIsOpen}

                onRequestClose={() => {
                    closeModalError()

                    ClickLogOut()

                }}

                contentLabel="Example Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h1>KHÔNG TÌM THẤY USER  </h1>
            </Modal>)
        }
        else if (myError === "SPE#00010") {
            return (<Modal
                isOpen={modalErrorIsOpen}

                onRequestClose={() => {
                    closeModalError()

                    ClickLogOut()

                }}

                contentLabel="Example Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h1>TÀI KHOẢN ĐÃ KÍCH HOẠT RỒI </h1>
            </Modal>)
        }
        else if (myError === "SPE#00011") {
            return (<Modal
                isOpen={modalErrorIsOpen}

                onRequestClose={() => {
                    closeModalError()

                    ClickLogOut()

                }}

                contentLabel="Example Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h1>TÀI KHOẢN CHƯA ĐƯỢC KÍCH HOẠT </h1>
            </Modal>)
        }

    }
    else {
        return (<Landing></Landing>)
    }



}
export default ModalActivateAccountError;

