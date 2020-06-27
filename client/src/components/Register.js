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

          <Row >
            <Col xs={2}><label htmlFor="lastName">Họ</label></Col>
            <Col xs={5} >
              <input

                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </Col>
            <Col xs={5} style={{ marginTop: "5%", color: '#FF0000' }}>
              {formik.touched.lastName && formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
              ) : null}
            </Col>
          </Row>

          <Row >
            <Col xs={2}><label htmlFor="firstName">Tên</label></Col>
            <Col xs={5}>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
            </Col>
            <Col xs={5} style={{ marginTop: "5%", color: '#FF0000' }}>
              {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null}

            </Col>
          </Row>

          <Row >
            <Col xs={2}><label htmlFor="userName">UserName</label></Col>
            <Col xs={5}>
              <input
                id="userName"
                name="userName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
              />
            </Col>
            <Col xs={5} style={{ marginTop: "5%", color: '#FF0000' }}>
              {formik.touched.userName && formik.errors.userName ? (
                <div>{formik.errors.userName}</div>
              ) : null}

            </Col>
          </Row>

          <Row >
            <Col xs={2}><label htmlFor="passWord">Mật khẩu</label></Col>
            <Col xs={5}>
              <input
                id="passWord"
                name="passWord"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passWord}
              />
            </Col>
            <Col xs={5} style={{ marginTop: "5%", color: '#FF0000' }}>
              {formik.touched.passWord && formik.errors.passWord ? (
                <div>{formik.errors.passWord}</div>
              ) : null}

            </Col>
          </Row>

          <Row >
            <Col xs={2}><label htmlFor="confirmpassWord">Xác nhận mật khẩu</label></Col>
            <Col xs={5}>
              <input
                id="confirmpassWord"
                name="confirmpassWord"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmpassWord}
              />
            </Col>
            <Col xs={5} style={{ marginTop: "5%", color: '#FF0000' }}>
              {formik.touched.confirmpassWord && formik.errors.confirmpassWord ? (
                <div>{formik.errors.confirmpassWord}</div>
              ) : null}

            </Col>
          </Row>

          <Row >
            <Col xs={2}><label htmlFor="email">Email</label></Col>
            <Col xs={5}>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </Col>
            <Col xs={5} style={{ marginTop: "5%", color: '#FF0000' }}>
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}

            </Col>
          </Row>


          <Row >
            <Col xs={2}><label htmlFor="phone">Số điện thoại</label></Col>
            <Col xs={5}>
              <input
                id="phone"
                name="phone"
                type="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
            </Col>
            <Col xs={5} style={{ marginTop: "5%", color: '#FF0000' }}>
              {formik.touched.phone && formik.errors.phone ? (
                <div>{formik.errors.phone}</div>
              ) : null}

            </Col>
          </Row>

        </Container>
      </form>
      <NotificationContainer />
      <div className="footer-copyright text-center py-5">
        <div style={{ marginRight: "53%" }}>
          <button style={{ margin: "1%" }} type="submit"  >Submit</button>
          <button
            style={{ margin: "1%" }}
            onClick={formik.handleReset}
            type="reset"
          >
            Reset
        </button>
        </div>
      </div>
    </div>
  );
};
export default Register;
