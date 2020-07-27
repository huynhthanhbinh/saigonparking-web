
import React from 'react'
import { Modal } from 'semantic-ui-react'
// import { Row, Col, Container } from 'react-bootstrap'
// import { Formik, Form, useField } from 'formik';
// import * as Yup from 'yup';
//import 
import { ParkingLotServiceClient } from '../../../api/ParkingLot_grpc_web_pb';
// import ParkinglotProto from '../../../api/ParkingLot_pb';
import { API_URL } from '../../../saigonparking';
import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb';
import Cookies from 'js-cookie';
//Notification 
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

//import Exception handling
import ExceptionHandling from '../../../ExceptionHandling'

const ParkinglotwebService = new ParkingLotServiceClient(API_URL)
const AddModal = ({ modalAddIsOpen, closeModalAdd, parkinglot }) => {
    //config notification
    const createNotification = (type, errortype) => {
        switch (type) {
            case 'info':
                NotificationManager.info('Info message');
                break;
            case 'success':
                NotificationManager.success('XÓA THÀNH CÔNG ' + parkinglot.getId(), 'Title here');
                break;
            case 'warning':
                NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                break;
            case 'error':
                if (errortype === 'SPE#00001') {
                    // cấp token với refresh token mới 
                    if (ExceptionHandling.handleAccessTokenExpired(errortype) === true) {
                        NotificationManager.success('BẠN ĐƯỢC TOKEN MỚI', 'Success');
                    }
                    else {
                        NotificationManager.error("BẠN HAY ĐĂNG NHẬP LẠI", 'Error!', 5000, () => {
                            alert('callback');
                        });
                    }
                }
                else if (errortype === 'SPE#00002') {
                    NotificationManager.error("ĐỪNG GIẢ CHỮ KÝ NỮA", 'Error!', 5000, () => {
                        alert('callback');
                    });
                }
                else if (errortype === 'SPE#00003') {
                    NotificationManager.error("TOKEN FORMAT SAI", 'Error!', 5000, () => {
                        alert('callback');
                    });
                }
                else if (errortype === 'SPE#00004') {
                    NotificationManager.error("KHÔNG THỂ GIẢ MÃ TOKEN", 'Error!', 5000, () => {
                        alert('callback');
                    });
                }
                else if (errortype === 'SPE#00005') {
                    NotificationManager.error("THIẾU TOKEN", 'Error!', 5000, () => {
                        alert('callback');
                    });
                }
                else if (errortype === 'SPE#00006') {
                    NotificationManager.error("TOKEN SAI", 'Error!', 5000, () => {
                        alert('callback');
                    });
                }
                else if (errortype === 'SPE#00008') {
                    NotificationManager.error("BÃI XE KHÔNG TỒN TẠI", 'Error!', 5000, () => {
                        alert('callback');
                    });
                }
                else if (errortype === 'SPE#00009') {
                    NotificationManager.error("KHÔNG THỂ XÓA DO RÀNG BUỘC DỮ LIỆU", 'Error!', 5000, () => {
                        alert('callback');
                    });
                }
                else if (errortype === 'SPE#00015') {
                    NotificationManager.error("BẠN KHÔNG THỂ THỰC HIỆN CHỨC NĂNG NÀY VÌ KHÔNG PHẢI ADMIN", 'Error!', 5000, () => {
                        alert('callback');
                    });
                }
                break;
            default:
                return
        }
    };

    const calldeleteParkingLotById = () => {
        const request = new Int64Value();
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }
        request.setValue(parkinglot.getId())
        ParkinglotwebService.deleteParkingLotById(request, metadata, (err, res) => {
            if (err) {
                createNotification('error', err.message)
            } else {
                createNotification('success', '')
            }
        })
    }

    return (
        <div>
            <Modal
                open={modalAddIsOpen}
                onClose={closeModalAdd}
                className="modal-content-delete"
            >
                <h2>BẠN CÓ CHẮC MUỐN XÓA BÃI XE {parkinglot.getId()}</h2>
                <div className='groupButton'>
                    <button onClick={() => {
                        calldeleteParkingLotById()
                    }}>YES</button>
                    <button onClick={closeModalAdd}>NO</button>
                </div>
            </Modal>
            <NotificationContainer />
        </div>
    )
}

export default AddModal;

