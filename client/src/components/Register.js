import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthApi from "./Auth/AuthAPI";
import { AuthServiceClient } from '../api/Auth_grpc_web_pb';
import authProto from '../api/Auth_pb';
import { API_URL } from '../saigonparking';
import '../css/Register.css';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ModalRegister from './Modal/ModalRegister'
//notification
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const authService = new AuthServiceClient(API_URL)




const Register = () => {
  //config notification
  const createNotification = (type, errortype) => {
    switch (type) {
      case 'info':
        NotificationManager.info('Info message');
        break;
      case 'success':
        NotificationManager.success('ĐÃ GỬI EMAIL KÍCH HOẠT ĐẾN ' + errortype, 'ĐĂNG KÝ THÀNH CÔNG');
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

  //config Register
  const [modalRegisterIsOpen, setmodalRegisterIsOpen] = React.useState(false);
  const [myError, setmyError] = React.useState(null)
  function openModalRegister() {

    setmodalRegisterIsOpen(true);
  }

  function closeModalRegister() {
    setmodalRegisterIsOpen(false);
  }

  const Auth = React.useContext(AuthApi)
  const [nextpage, setnextpage] = React.useState(false)
  const callUserRegisterService = (registerUser, Auth) => {



    const metadata = { 'Authorization': 'Bon Map' }
    const request = new authProto.RegisterRequest();
    request.setUsername(registerUser.userName);
    request.setPassword(registerUser.passWord);
    request.setEmail(registerUser.email);
    request.setFirstname(registerUser.firstName);
    request.setLastname(registerUser.lastName);
    request.setPhone(registerUser.phone);


    authService.registerUser(request, metadata, (err, res) => {

      if (err) {
        // console.log('Lỗi lỗi lỗi ');
        // console.log(err)

        createNotification('error', err.message)

      } else {
        // console.log('dang ky thanh cong');
        createNotification('success', res.getValue())
        openModalRegister()
        setnextpage(true)

      }
    })
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      passWord: '',
      phone: '',
      confirmpassWord: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      userName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      passWord: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      phone: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      confirmpassWord: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required')
        .oneOf([Yup.ref('passWord'), null], 'Passwords must match'),

    }),
    onSubmit: values => {
      callUserRegisterService(values, Auth)

    },
  });



  return (


    <div className="background">
      {modalRegisterIsOpen ? <ModalRegister modalRegisterIsOpen={modalRegisterIsOpen} closeModalRegister={closeModalRegister} /> : null}

      <form onSubmit={formik.handleSubmit}>
        <Container className="fontcolor">
        <div className="fontcolorform">
        <br/>
            <label htmlFor="lastName">Họ</label>
            
              <input

                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            
            
              {formik.touched.lastName && formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
              ) : null}
              <br/>
            <label htmlFor="firstName">Tên</label>
            
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
            
            
              {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null}

            
              <br/>
            <label htmlFor="userName">UserName</label>
            
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

            
              <br/>
            <label htmlFor="passWord">Mật khẩu</label>
           
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

              <br/>
            <label htmlFor="confirmpassWord">Xác nhận mật khẩu</label>
           
              <input
                id="confirmpassWord"
                name="confirmpassWord"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmpassWord}
              />
            
           
              {formik.touched.confirmpassWord && formik.errors.confirmpassWord ? (
                <div>{formik.errors.confirmpassWord}</div>
              ) : null}

            
              <br/>
            <label htmlFor="email">Email</label>
           
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
           
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}

            
              <br/>
            <label htmlFor="phone">Số điện thoại</label>
            
              <input
                id="phone"
                name="phone"
                type="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
          
              {formik.touched.phone && formik.errors.phone ? (
                <div>{formik.errors.phone}</div>
              ) : null}

              <br/>
          <button style={{}} type="submit"  >Submit</button>
          <button
            style={{  }}
            onClick={formik.handleReset}
            type="reset"
          >
            Reset
        </button>
                </div>
        </Container>
      </form>
      <NotificationContainer />
      </div>
  );
};
export default Register;
