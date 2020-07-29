
import React from 'react'
import { Button, Modal, TransitionablePortal } from 'semantic-ui-react'
import Landing from '../Landing'


import AuthApi from "../Auth/AuthAPI";
import Cookies from 'js-cookie'
import sessionstorage from 'sessionstorage'


import styles from './Modal.module.css'
import { ReactComponent as IconError } from '../Home/images/error.svg';

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
        Auth.setforgetpass(false)
        Auth.setcheckUserName(null)
        Cookies.remove("checkUserName");
        Cookies.remove("token");
        Cookies.remove("isAdmin");
        Cookies.remove("refreshtoken");

        sessionstorage.clear();
    }

    const [isOpen, setIsOpen] = React.useState(modalErrorIsOpen)

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
            case "SPE#00005":
                return 'KHÔNG CÓ TOKEN';
            case "SPE#00001":
                return null;
            case "SPE#0000DB":
                return 'REFRESHTOKEN HẾT HẠN';
            case "SPE#00000":
                return 'MÃ LỖI QUÁ MỚI';
            case "SPE#00002":
                return 'ĐỪNG SỬA TOKEN NỮA NHA';
            case "SPE#00003":
                return 'TOKEN SAI FORMAT';
            case "SPE#00004":
                return 'KHÔNG THỂ GIẢI MÃ TOKEN';
            case "SPE#00006":
                return 'LOẠI TOKEN SAI NHÉ';
            case "SPE#00007":
                return 'REFRESH TOKEN KHÔNG CÒN GIÁ TRỊ';
            case "SPE#00008":
                return 'KHÔNG TÌM THẤY ENTITY ĐÓ';

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
export default ModalError;

