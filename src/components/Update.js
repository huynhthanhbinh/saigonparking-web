import React from 'react'
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie'

import { UserServiceClient } from '../api/Actor_grpc_web_pb';
import UserProto from '../api/Actor_pb';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb'
import userMapper from '../mapper/UserMapper'
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../saigonparking';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

const userService = new UserServiceClient(API_URL)

// const customer = new UserProto.Customer();
// const user = new UserProto.User();

// let customerObject;

const Update = () => {


    const Auth = React.useContext(AuthApi)
    const [tmp, settmp] = React.useState(null)
    let [customerObject, setCustomerObject] = React.useState()
    const getInformationUser = async (Auth) => {
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }
        const checkUserName = Cookies.get("checkUserName");
        const request = new StringValue()
        request.setValue(checkUserName)

        userService.getCustomerByUsername(request, metadata, (err, res) => {
            if (err) {
                console.log(err)
            } else {

                // user.setRole(res.getUserinfo().getRole())
                // user.setUsername(res.getUserinfo().getUsername())
                // user.setPassword(res.getUserinfo().getPassword())
                // user.setEmail(res.getUserinfo().getEmail())
                // user.setVersion(res.getUserinfo().getVersion())
                // customer.setUserinfo(user)
                // customer.setFirstname(res.getFirstname())
                // customer.setLastname(res.getLastname())
                // customer.setPhone(res.getPhone())

                setCustomerObject(userMapper.toCustomerObject(res))



                // settmp({
                //     role: customer.getUserinfo().getRole(),
                //     username: customer.getUserinfo().getUsername(),
                //     password: customer.getUserinfo().getPassword(),
                //     email: customer.getUserinfo().getEmail(),
                //     version: customer.getUserinfo().getVersion(),
                //     firstName: customer.getFirstname(),
                //     lastName: customer.getLastname(),
                //     phone: customer.getPhone()
                // })

                // Auth.setIsupdate({
                //     role: customer.getUserinfo().getRole(),
                //     username: customer.getUserinfo().getUsername(),
                //     password: customer.getUserinfo().getPassword(),
                //     email: customer.getUserinfo().getEmail(),
                //     version: customer.getUserinfo().getVersion(),
                //     firstName: customer.getFirstname(),
                //     lastName: customer.getLastname(),
                //     phone: customer.getPhone()
                // })

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
                <label htmlFor={props.id || props.name}>{label}</label>
                <input className="text-input" {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </>
        );
    };



    const ClickLogOut = () => {

    }

    console.log(customerObject)
    return (
        <>
            <h1>Update Information</h1>
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

                    // if (values.userName === tmp.username) {
                    //     alert(" Username is not different before")

                    // }
                    // else if (values.passWord === tmp.password) {
                    //     alert(" Password is not different before")

                    // }
                    // else if (values.email === tmp.email) {
                    //     alert(" Email is not different before")

                    // }
                    // else {
                    //     alert("Update is done");
                    //     setSubmitting(false);
                    // }
                    const user = new UserProto.User()
                    const token = 'Bearer ' + Cookies.get("token");
                    const metadata = { 'Authorization': token }
                    const request = new UserProto.Customer()

                    user.setRole(customerObject.role)
                    user.setUsername(customerObject.username)
                    user.setPassword(values.passWord)
                    user.setEmail(values.email)
                    user.setVersion(customerObject.version)
                    request.setUserinfo(user)
                    request.setFirstname(values.firstName)
                    request.setLastname(values.lastName)
                    request.setPhone(values.phone)


                    userService.updateCustomer(request, metadata, (err, res) => {
                        if (err) {
                            console.log(err)
                        } else {

                            console.log("Update Binh map thanh cong")
                            setSubmitting(false);
                        }

                    })


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
                        />
                    </div>
                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="Email "
                            name="email"
                            type="email"

                        />
                    </div>

                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="First Name"
                            name="firstName"
                            type="text"

                        />
                    </div>

                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="Last Name"
                            name="lastName"
                            type="text"

                        />
                    </div>
                    <div style={{ margin: 10 }}>
                        <MyTextInput
                            label="Phone"
                            name="phone"
                            type="phone"

                        />
                    </div>

                    <button type="submit" >Update</button>
                    <div style={{ margin: 10 }}>

                        <Link to="/profile">
                            <button type="button">
                                Back
                        </button>
                        </Link>
                    </div>

                </Form>
            </Formik> : null}
        </>
    )

}

export default Update
