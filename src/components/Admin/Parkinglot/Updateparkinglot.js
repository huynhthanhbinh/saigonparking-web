import React, { useEffect } from 'react'
import Modal from 'react-modal';

import '../../../css/modal.css'

Modal.setAppElement(document.getElementById("root"));
const UpdateModal = () => {
    
    const [bach, setbach]= React.useState(null)

    useEffect(()=>{
        
    },[])

    console.log(bach)
    
    return (
        <div>{bach}</div>
    )



}
export default UpdateModal;

