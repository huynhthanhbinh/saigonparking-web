import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import AuthApi from './Auth/AuthAPI';
import Cookies from 'js-cookie';
import sessionstorage from 'sessionstorage';
import { AuthServiceClient } from '../api/Auth_grpc_web_pb';
import authProto from '../api/Auth_pb';
//import CSS
import '../css/login1.css';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { API_URL } from '../saigonparking';
//import modal login
import ModalErrorLogin from './Modal/ModalErrorLogin';

const userProto = require('../api/Actor_pb');
const authService = new AuthServiceClient(API_URL);

const Login = () => {
	//config modal Error login
	const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
	const [myError, setmyError] = React.useState(null);
	function openModalError() {
		setmodalErrorIsOpen(true);
	}
	function closeModalError() {
		setmodalErrorIsOpen(false);
	}
	const Auth = React.useContext(AuthApi);
	const formik = useFormik({
		initialValues: {
			userName: '',
			passWord: ''
		},
		validationSchema: Yup.object({
			userName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
			passWord: Yup.string().max(20, 'Must be 20 characters or less').required('Required')
		}),
		onSubmit: (values) => {
			callUserLoginService(values.userName, values.passWord, Auth);
		}
	});

	const callUserLoginService = (username, password, Auth) => {
		const request = new authProto.ValidateRequest();
		request.setUsername(username);
		request.setPassword(password);
		request.setRole(userProto.UserRole.CUSTOMER);

		authService.validateUser(request, {}, (err, res) => {
			if (err) {
				setmyError(err.message);
				openModalError();
			} else {
				Auth.setAuth(true);
				Cookies.set('token', res.getAccesstoken());
				Cookies.set('refreshtoken', res.getRefreshtoken());
				Cookies.set('checkUserName', username);
				sessionstorage.setItem('checkUserName', username);
			}
		});
	};

	return (
		<div className="page-container">
			{modalErrorIsOpen ? (
				<ModalErrorLogin
					modalErrorIsOpen={modalErrorIsOpen}
					closeModalError={closeModalError}
					myError={myError}
					setmyError={setmyError}
				/>
			) : null}
			<form onSubmit={formik.handleSubmit}>
				<h1>Đăng nhập</h1>
				<label htmlFor="userName">Tài Khoản</label>
				<input
					id="userName"
					name="userName"
					type="text"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.userName}
				/>
				{formik.touched.userName && formik.errors.userName ? (
					<div style={{ marginTop: '-11.5%', color: '#ef4300' }}>{formik.errors.userName}</div>
				) : null}
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
					<div style={{ marginTop: '-11.5%', color: '#ef4300' }}>{formik.errors.passWord}</div>
				) : null}
				<div style={{ marginTop: '5%' }}>
					<button style={{ marginTop: '5%' }} type="submit">
						Đăng nhập
					</button>
				</div>
				<div style={{ marginTop: '5%', display: 'inline-block' }}>
					<Row>
						<Link style={{ color: 'whitesmoke', marginLeft: '9%' }} to="/forget-password">
							Quên mật khẩu
						</Link>
					</Row>
					<Row>
						<Link style={{ color: 'whitesmoke' }} to="/clickactivateaccount">
							Kích hoạt tài khoản
						</Link>
					</Row>
				</div>
			</form>
		</div>
	);
};
export default Login;
