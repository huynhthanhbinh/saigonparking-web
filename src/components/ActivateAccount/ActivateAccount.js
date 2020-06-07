import React from 'react'

import Cookies from 'js-cookie'

import { UserServiceClient } from '../../api/Actor_grpc_web_pb';
import UserProto from '../../api/Actor_pb';

import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import {

    Link,
    Redirect
} from "react-router-dom";
import  { API_URL } from '../../saigonparking';
import AuthApi from "../Auth/AuthAPI";
//modal Error
import ModalError from '../Modal/ModalError'
import exceptionHandler from '../../ExceptionHandling'
const userService = new UserServiceClient(API_URL)


// const customer = new UserProto.Customer();
// const user = new UserProto.User();

// let customerObject;
let username = Cookies.get("checkUserName");

const ActivateAccount = () => {
    //config modal Error
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null)
    function openModalError() {

        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }
    //
    const [nextpage, setnextpage] = React.useState(false)

    const Auth = React.useContext(AuthApi)
 


    if(nextpage===true)
    {
        return ( <Redirect to="/profile" />)
    }


    return (
        <>
            
            <h1> Chúc mừng  {username} đã kích hoạt thành công </h1>
            <button onClick={()=>{
                setnextpage(true)
            }}>TRỞ LẠI TRANG THÔNG TIN</button>

        </>
    )

}

export default ActivateAccount
