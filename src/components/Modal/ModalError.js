
import React from 'react'
import Modal from 'react-modal';
import Landing from '../Landing'
import '../../css/modal.css';



Modal.setAppElement(document.getElementById("root"));
const ModalError = ({ modalErrorIsOpen, closeModalError, myError,setmyError }) => {
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
    
    if(myError!=null)
    {

        if (myError === "SPE#00005") {
            return (<Modal
                isOpen={modalErrorIsOpen}
    
                onRequestClose={closeModalError}
    
                contentLabel="Example Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h1>KHÔNG CÓ TOKEN</h1>
            </Modal>)
        }
        else if (myError === "SPE#00001") {
            return (<Modal
                isOpen={modalErrorIsOpen}
    
                onRequestClose={closeModalError}
    
                contentLabel="Example Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h1>TOKEN HẾT HẠN </h1>
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
    
                onRequestClose={closeModalError}
    
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
    
                onRequestClose={closeModalError}
    
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
    
                onRequestClose={closeModalError}
    
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
    
                onRequestClose={closeModalError}
    
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
    
                onRequestClose={closeModalError}
    
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
    
                onRequestClose={closeModalError}
    
                contentLabel="Example Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h1>KHÔNG TÌM THẤY ENTITY ĐÓ </h1>
            </Modal>)
        }
    
    }
    else
    {
       return(<Landing></Landing>)
    }



}
export default ModalError;

