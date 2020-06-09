
import React from 'react'
import Modal from 'react-modal';
import { Row, Col, Container } from 'react-bootstrap'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import '../../../css/modal.css'
//import 
import { ParkingLotServiceClient } from '../../../api/ParkingLot_grpc_web_pb';
import ParkinglotProto from '../../../api/ParkingLot_pb';
import { API_URL } from '../../../saigonparking';
import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb';
import Cookies from 'js-cookie';
//Notification 
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';



const ParkinglotwebService = new ParkingLotServiceClient(API_URL)
Modal.setAppElement(document.getElementById("root"));
const AddModal = ({ modalAddIsOpen, closeModalAdd, parkinglot }) => {
    //config notification
    const createNotification = (type) => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
      
    };

    const calldeleteParkingLotById = () => {
        const request = new Int64Value();
        const token = 'Bearer ' + Cookies.get("token");

        const metadata = { 'Authorization': token }
        request.setValue(parkinglot.getId())
        ParkinglotwebService.deleteParkingLotById(request, metadata, (err, res) => {

            if (err) {
               


            } else {

               


            }
        })
    }


    return (
        <div>


            <Modal
                isOpen={modalAddIsOpen}

                onRequestClose={closeModalAdd}

                contentLabel="Example Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2>BẠN CÓ CHẮC MUỐN XÓA BÃI XE {parkinglot.getId()}</h2>


                <button onClick={()=>{
                    createNotification('success')
                }}>YES</button>
                <button onClick={closeModalAdd}>NO</button>
            </Modal>
            <NotificationContainer />
        </div>
    )






}
export default AddModal;

