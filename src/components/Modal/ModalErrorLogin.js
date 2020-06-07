
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

Modal.setAppElement(document.getElementById("root"));
const ModalError = ({ modalErrorIsOpen, closeModalError, myError, setmyError }) => {
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
        Auth.setIsAdmin(null)
        Auth.setcheckUserName(null)
        Cookies.remove("checkUserName");
        Cookies.remove("token");
        Cookies.remove("isAdmin");
        Cookies.remove("refreshtoken");
        
        localStorage.clear()
    }

    if (myError != null) {

        if (myError === "SPE#00005") { /** KHÔNG CÓ TOKEN */
            return (

                <Modal
                    isOpen={modalErrorIsOpen}

                    onRequestClose={() => {
                        closeModalError()

                        ClickLogOut()

                    }}

                    contentLabel="Example Modal"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <h1>KHÔNG CÓ TOKEN</h1>

                    <button onClick={() => {
                        closeModalError()

                        ClickLogOut()

                    }}>ĐĂNG NHẬP LẠI</button>


                </Modal>

            )
        }
        

    }
    else {
        return (<Landing></Landing>)
    }



}
export default ModalError;

