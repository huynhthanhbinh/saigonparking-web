
import React from 'react'
import { Button, Modal, TransitionablePortal } from 'semantic-ui-react'
import Landing from '../Landing'

import AuthApi from "../Auth/AuthAPI";
import Cookies from 'js-cookie'
import sessionstorage from 'sessionstorage'

import styles from './Modal.module.css'
import { ReactComponent as IconError } from '../Home/images/error.svg';

const ModalErrorLogin = ({ modalErrorIsOpen, closeModalError, myError, setmyError }) => {

    const Auth = React.useContext(AuthApi)
    const ClickLogOut = () => {
        Auth.setAuth(false)
        Auth.setforgetpass(false)
        Auth.setcheckUserName(null)
        Cookies.remove("checkUserName");
        Cookies.remove("token");
        Cookies.remove("refreshtoken");
        sessionstorage.clear();
    }

    const [isOpen] = React.useState(modalErrorIsOpen)

    const ButtonReLogin = () => {
        return (
            <Button negative onClick={() => {
                closeModalError()
                ClickLogOut()
            }}>ĐĂNG NHẬP LẠI</Button>
        )
    }

    const CodeError = (myError) => {
        switch (myError) {
            case "SPE#00008":
                return 'TÀI KHOẢN KHÔNG TỒN TẠI';
            case "SPE#00011":
                return 'TÀI KHOẢN CHƯA KÍCH HOẠT';
            case "SPE#00012":
                return 'BẠN KHÔNG CÓ QUYỀN ĐĂNG NHẬP TRANG NÀY';
            case "SPE#00013":
                return 'SAI MẬT KHẨU';
            default:
                return myError;
        }
    }

    if (myError != null) {
        return (
            <TransitionablePortal open={isOpen} transition={{ animation: 'scale', duration: 500 }}>
                <Modal
                    style={{ height: 'auto', position: 'relative' }}
                    open={true}
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
                        <ButtonReLogin />
                    </Modal.Actions>
                </Modal>
            </TransitionablePortal>
        )
    }
    else {
        return (<Landing></Landing>)
    }



}
export default ModalErrorLogin;

