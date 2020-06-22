
import React from 'react'
import Landing from '../Landing'
import { Button, Modal, TransitionablePortal } from 'semantic-ui-react'
import {
    Redirect
} from "react-router-dom";
import AuthApi from "../Auth/AuthAPI";
import sessionstorage from 'sessionstorage'
import Cookies from 'js-cookie'
import styles from './Modal.module.css'
import {ReactComponent as IconError} from '../Admin/svg/error.svg';

const ModalError = ({ modalErrorIsOpen, closeModalError, myError, setmyError }) => {
    const [isOpen, setIsOpen] = React.useState(modalErrorIsOpen)
    const Auth = React.useContext(AuthApi)
    const ClickLogOut = () => {
        Auth.setAuth(false)
        Auth.setcheckUserName(null)
        Cookies.remove("checkUserName");
        Cookies.remove("token");
        Cookies.remove("refreshtoken");
        sessionstorage.clear()
        Redirect('/login')
    }

    const ButtonReLogin = () => {
        return (
            <Button negative onClick={() => {
                setIsOpen(false)
                closeModalError()
            }}>ĐĂNG NHẬP LẠI</Button>
        )
    }

    const CodeError = (myError) => {
        switch (myError) {
            case "SPE#00001":
                return 'BẠN ĐÃ ĐƯỢC CẤP ACCESS TOKEN';
            case "SPE#00000":
                return 'MÃ LỖI QUÁ MỚI';
            case "SPE#00002":
                return 'ĐỪNG SỬA TOKEN NỮA NHA';
            case "SPE#00003":
                return 'TOKEN SAI';
            case "SPE#00004":
                return 'KHÔNG THỂ GIẢI MÃ TOKEN';
            case "SPE#00006":
                return 'LOẠI TOKEN SAI NHÉ';
            case "SPE#00007":
                return 'REFRESH TOKEN KHÔNG CÒN GIÁ TRỊ';
            case "SPE#00008":
                return 'KHÔNG TÌM THẤY ENTITY ĐÓ';
            case "SPE#00014":
                return 'NGHI NGỜ CÓ HACK';
            case "SPE#00005":
                return 'KHÔNG CÓ TOKEN';
            case "SPE#0000DB":
                return 'REFRESHTOKEN HẾT HẠN';
            default:
                return myError;
        }
    }

    if (myError != null) {
        console.log(myError)
        return (
            <TransitionablePortal open={isOpen} transition={{ animation: 'scale', duration: 500 }}>
                <Modal
                    style={{ height: 'auto', position: 'relative' }}
                    open={true}
                    onClose={() => {
                        ClickLogOut()
                        closeModalError()
                    }}
                    size={'small'}
                >
                    <Modal.Header>Error</Modal.Header>
                    <Modal.Content>
                        <div className={styles.container}>
                            <div className={`${styles.icon} ${styles.error}`}>
                                <IconError />
                            </div>
                        </div>
                        <h1 className={styles.h1Modal}>{CodeError(myError)}</h1>
                    </Modal.Content>
                    <Modal.Actions>
                        {(myError === "SPE#00005" || myError === "SPE#0000DB") ? <ButtonReLogin /> : <></>}
                    </Modal.Actions>
                </Modal>
            </TransitionablePortal>
        )
    }
    else {
        return (<Landing></Landing>)
    }



}
export default ModalError;

