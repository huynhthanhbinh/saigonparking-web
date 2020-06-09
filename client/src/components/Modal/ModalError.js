
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
        else if (myError === "SPE#00001") {

            return null
        }
        else if (myError === "SPE#0000DB") {

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
                <h1> REFRESHTOKEN HẾT HẠN </h1>
                <button onClick={() => {
                        closeModalError()

                        ClickLogOut()

                    }}>ĐĂNG NHẬP LẠI</button>
            </Modal>)
        }
        else if (myError === "SPE#00000") {
            return (<Modal
                isOpen={modalErrorIsOpen}

                onRequestClose={closeModalError}

                contentLabel="Example Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h1>MÃ LỖI QUÁ MỚI </h1>
            </Modal>)
        }
        else if (myError === "SPE#00002") {
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
                <h1>ĐỪNG SỬA TOKEN NỮA NHA </h1>
            </Modal>)
        }
        else if (myError === "SPE#00003") {
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
                <h1>TOKEN SAI FORMAT </h1>
            </Modal>)
        }
        else if (myError === "SPE#00004") {
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
                <h1>KHÔNG THỂ GIẢI MÃ TOKEN </h1>
            </Modal>)
        }
        else if (myError === "SPE#00006") {
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
                <h1>LOẠI TOKEN SAI NHÉ </h1>
            </Modal>)
        }
        else if (myError === "SPE#00007") {
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
                <h1>REFRESH TOKEN KHÔNG CÒN GIÁ TRỊ </h1>
            </Modal>)
        }
        else if (myError === "SPE#00008") {
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
                <h1>KHÔNG TÌM THẤY ENTITY ĐÓ </h1>
            </Modal>)
        }
        else if (myError === "SPE#00014") {
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
                <h1>NGHI NGỜ CÓ HACK</h1>
            </Modal>)
        }

    }
    else {
        return (<Landing></Landing>)
    }



}
export default ModalError;

