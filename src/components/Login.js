import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie';

import { AuthServiceClient } from '../api/Auth_grpc_web_pb';
import authProto from '../api/Auth_pb';

const userProto = require('../api/Actor_pb')


const gatewayHost = "http://localhost:8338";

const authService = new AuthServiceClient(gatewayHost)



const Login = () => {

   
    const Auth = React.useContext(AuthApi)
    const formik = useFormik({
        initialValues: {
            userName: '',
            passWord: '',

        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            passWord: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),

        }),
        onSubmit: values => {

            let tmp =callUserLoginService(values.userName, values.passWord, Auth)
         
            
        },
    });

    const callUserLoginService = (username, password, Auth) => {

        const metadata = { 'Authorization': 'Bon Map' }
        const request = new authProto.ValidateRequest();
        request.setUsername(username);
        request.setPassword(password);
        request.setRole(userProto.UserRole.CUSTOMER)
       
        authService.validateUser(request, metadata, (err, res) => {
    
            if (err) {
                console.log('Lỗi lỗi lỗi ');
                console.log(err)
            } else {
                console.log('BBBBBBBBBBBBBBBBBBBBB');
                const resType = res.getResponse();
                const ValidateResponseType = authProto.ValidateResponseType;
                switch (resType) {
                    case ValidateResponseType.AUTHENTICATED: {
                        console.log("Bon Map Authenticated");
                        
                        Auth.setcheckUserName(username)
                        Auth.setAuth(true)
                       
                        
                        Cookies.set("token", res.getAccesstoken())
                        Cookies.set("checkUserName", username)
                        alert("Authenticated")
                        break;
                    }
                    case ValidateResponseType.INCORRECT: {
                        alert("Incorrect Username or Password")
                        console.log("Incorrect Username or Password");
                        break;
                    }
                    case ValidateResponseType.INACTIVATED: {
                        alert(" Inactivated")
                        console.log(" Inactivated");
                        break;
                    }
                    case ValidateResponseType.DISALLOWED: {
                        alert("Disallowed")
                        console.log("Disallowed");
                        break;
                    }
                    default: { // non-exist
                        alert("User non-exist")
                        console.log("User non-exist");
                        break;
                    }
                }
            }
        })
    }

    return (



        <form onSubmit={formik.handleSubmit}>
            <div style={{ margin: 10 }}>
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
                <label htmlFor="passWord">PASSWORD</label>
                <input
                    id="passWord"
                    name="passWord"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passWord}
                />
                {formik.touched.passWord && formik.errors.passWord ? (
                    <div>{formik.errors.passWord}</div>
                ) : null}
            </div>


            <div style={{ margin: 10 }}>
                <button style={{ margin: 10 }} type="submit"  >Submit</button>
                <button
                    style={{ margin: 10 }}
                    onClick={formik.handleReset}
                    type="reset"
                >
                    Reset
        </button>
            </div>


        </form>

    );
};
export default Login;
