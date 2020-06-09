import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthApi from "../Auth/AuthAPI";

import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb'

import { AuthServiceClient } from '../../api/Auth_grpc_web_pb';

//notification
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import {
    BrowserRouter as Router,

    Redirect
} from "react-router-dom";
import { API_URL } from '../../saigonparking';
//import modal

import '../../css/modal.css'

import ModalActivateAccountError from './ModalActivateAccountError'
const authService = new AuthServiceClient(API_URL)



const ClickActivateAccount = () => {
    const Auth = React.useContext(AuthApi)
    //config notification
    const createNotification = (type, errortype) => {
        switch (type) {
            case 'info':
                NotificationManager.info('Info message');
                break;
            case 'success':
                NotificationManager.success('ĐÃ GỬI EMAIL KÍCH HOẠT ĐẾN ' + errortype, 'GỬI EMAIL THÀNH CÔNG');
                break;
            case 'warning':
                NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                break;
            case 'error':
                if (errortype === 'SPE#00009') {
                    console.log(errortype)
                    NotificationManager.error("USERNAME HOẶC EMAIL ĐÃ TỒN TẠI", 'Error!', 5000, () => {
                        alert('callback');
                    });


                }
                break;
        }

    };

    //config Error 
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null)
    function openModalError() {

        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }



    //

    const [sendemail, setsendemail] = React.useState(true)

    const callsendActivateAccount = (username, Auth) => {
        const request = new StringValue()
        const metadata = {};
        request.setValue(username)

        authService.sendActivateAccountEmail(request, metadata, (err, res) => {
            if (err) {
                setmyError(err.message)
                openModalError()

            } else {
                
                createNotification('success',res.getValue())
            }

        })
    }

    const formik = useFormik({
        initialValues: {
            userName: '',


        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),


        }),
        onSubmit: values => {

            callsendActivateAccount(values.userName, Auth)


        },
    });

    return (
        <>

                <form onSubmit={formik.handleSubmit}>

                    <div style={{ margin: 10 }}>
                        {modalErrorIsOpen ? <ModalActivateAccountError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
                        <label htmlFor="userName">USERNAME</label>
                        <input
                            id="userName"
                            name="userName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                        />
                        {formik.touched.userName && formik.errors.userName ? (
                            <div>{formik.errors.userName}</div>
                        ) : null}
                    </div>

                    <div style={{ margin: 10 }}>
                        <button style={{ margin: 10 }} type="submit" >Submit</button>

                    </div>

                </form>
          

            <NotificationContainer />
        </>
    );

};
export default ClickActivateAccount;
