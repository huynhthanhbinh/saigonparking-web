
import React from 'react'
import { Modal, TransitionablePortal, ModalActions, ModalContent } from 'semantic-ui-react'
import styles from './Modal.module.css'


const RegisterModal = ({ modalRegisterIsOpen, closeModalRegister }) => {
    const [isOpen] = React.useState(modalRegisterIsOpen)

    return (
        <TransitionablePortal open={isOpen} transition={{ animation: 'scale', duration: 500 }}>
            <Modal
                style={{ height: 'auto', position: 'relative' }}
                open={true}
                size={'small'}
                onRequestClose={closeModalRegister}
            >
                <ModalContent>
                    {/* <div className={styles.container}>
                        <div className={`${styles.icon} ${styles.error}`}>
                        <IconError />
                        </div>
                    </div> */}
                    <h1 className={styles.h1Modal} >ĐĂNG KÝ THÀNH CÔNG , KIỂM TRA EMAIL CỦA BẠN </h1>
                </ModalContent>
                <ModalActions>
                    <button onClick={closeModalRegister}>Đóng</button>
                </ModalActions>
            </Modal>
        </TransitionablePortal>
    )
}
export default RegisterModal;

