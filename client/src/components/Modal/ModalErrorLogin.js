
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
import sessionStorage from 'sessionstorage' 

Modal.setAppElement(document.getElementById("root"));
const ModalErrorLogin = ({ modalErrorIsOpen, closeModalError, myError, setmyError }) => {
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
        
        sessionStorage.clear();
    }

    if (myError != null) {

        if (myError === "SPE#00008") { /** KHÔNG CÓ TOKEN */
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
                    <h1>TÀI KHOẢN KHÔNG TỒN TẠI</h1>

                    <button onClick={() => {
                        closeModalError()

                        ClickLogOut()

                    }}>ĐĂNG NHẬP LẠI</button>


                </Modal>

            )
        }
        if (myError === "SPE#00011") { /** KHÔNG CÓ TOKEN */
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
                    <h1>TÀI KHOẢN CHƯA KÍCH HOẠT</h1>

                    <button onClick={() => {
                        closeModalError()

                        ClickLogOut()

                    }}>ĐĂNG NHẬP LẠI</button>


                </Modal>

            )
        }
        if (myError === "SPE#00012") { /** KHÔNG CÓ TOKEN */
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
                    <h1>BẠN KHÔNG CÓ QUYỀN ĐĂNG NHẬP TRANG NÀY</h1>

                    <button onClick={() => {
                        closeModalError()

                        ClickLogOut()

                    }}>ĐĂNG NHẬP LẠI</button>


                </Modal>

            )
        }
        if (myError === "SPE#00013") { /** KHÔNG CÓ TOKEN */
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
                    <h1>SAI MẬT KHẨU</h1>

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
export default ModalErrorLogin;

