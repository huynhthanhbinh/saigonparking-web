
import React from 'react'
import Landing from '../Landing'
import { Button, Modal, TransitionablePortal } from 'semantic-ui-react'

const ModalErrorLogin = ({ modalErrorIsOpen, closeModalError, myError, setmyError }) => {
    const [isOpen, setIsOpen] = React.useState(modalErrorIsOpen)

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
            case "SPE#00008":
                return 'TÀI KHOẢN KHÔNG TỒN TẠI';
            case "SPE#00011":
                return 'TÀI KHOẢN CHƯA KÍCH HOẠT';
            case "SPE#00012":
                return 'BẠN KHÔNG CÓ QUYỀN ĐĂNG NHẬP TRANG NÀY';
            case "SPE#00013":
                return 'SAI MẬT KHẨU';
        }
    }

    if (myError != null) {
        return (
            <TransitionablePortal open={isOpen} transition={{animation: 'scale', duration: 500}}>
                    <Modal
                        style={{ height: 'auto', position: 'relative' }}
                        open={true}
                        size={'small'}
                    >
                        <Modal.Header>Error</Modal.Header>
                        <Modal.Content>
                            <h1>{CodeError(myError)}</h1>
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

