import React from 'react'
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie'

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { UserServiceClient } from '../api/Actor_grpc_web_pb';

import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb'
import userMapper from '../mapper/UserMapper'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../saigonparking';
import {
   
    Link,
  
} from "react-router-dom";

const userService = new UserServiceClient(API_URL)


// const customer = new UserProto.Customer();
// const user = new UserProto.User();

// let customerObject;

const Information = () => {


    const Auth = React.useContext(AuthApi)
    const [tmp, settmp] = React.useState(null)
    const [nextpage, setnextpage] = React.useState(true)
    let [customerObject, setCustomerObject] = React.useState()
    const getInformationUser = async (Auth) => {
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }
        const request = new StringValue()
        request.setValue(Auth.checkUserName)

        userService.getCustomerByUsername(request, metadata, (err, res) => {
            if (err) {
                console.log(err)
            } else {

                setCustomerObject(userMapper.toCustomerObject(res))

            }

        })


    }

    React.useEffect(() => {

        getInformationUser(Auth);

    }, [])

    const MyTextInput = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and also replace ErrorMessage entirely.
        const [field, meta] = useField(props);
        return (
            <>
                <Container>
                    <Row style={{ margin: 5 }}>
                        <Col xs={4}> <label htmlFor={props.id || props.name}>{label}</label></Col>
                        <Col xs={4}> <input className="text-input" {...field} {...props} /></Col>
                        <Col xs={4}>  {meta.touched && meta.error ? (
                            <div className="error">{meta.error}</div>
                        ) : null}</Col>
                    </Row>
                </Container>



            </>
        );
    };



    const ClickLogOut = () => {
        Auth.setAuth(false)
        Cookies.remove("checkUserName");
        Cookies.remove("token");
        localStorage.clear()
    }

    console.log(customerObject)
    return (
        <>
            <h1>Your Information</h1>
            {customerObject ? <Formik
                initialValues={{
                    userName: customerObject.username,
                    passWord: customerObject.password,
                    email: customerObject.email,
                    firstName: customerObject.firstName,
                    lastName: customerObject.lastName,
                    phone: customerObject.phone


                }}
                validationSchema={Yup.object({
                    userName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    passWord: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),

                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),

                    firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    lastName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    phone: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),

                })}
                onSubmit={(values, { setSubmitting }) => {
                    setnextpage(false)

                }}
            >
                <Form >

                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="Username"
                            name="userName"
                            type="text"
                            disabled="disabled"
                        />
                    </div>

                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="Password"
                            name="passWord"
                            type="passWord"
                            disabled="disabled"
                        />
                    </div>
                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="Email "
                            name="email"
                            type="email"
                            disabled="disabled"

                        />
                    </div>

                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="First Name"
                            name="firstName"
                            type="text"
                            disabled="disabled"

                        />
                    </div>

                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="Last Name"
                            name="lastName"
                            type="text"
                            disabled="disabled"

                        />
                    </div>
                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="Phone"
                            name="phone"
                            type="phone"
                            disabled="disabled"

                        />
                    </div>
                    <div style={{ margin: 10 }}>
                        <Link to="/profile/update">
                            <button type="button">
                                update your information
                        </button>
                        </Link>


                        <button style={{ margin: 10 }} onClick={ClickLogOut}>Logout</button>

                    </div>

                </Form>
            </Formik> : <button onClick={ClickLogOut}>Logout</button>}
        </>
    )

}

export default Information
