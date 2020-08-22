import React from "react";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import styles from '../../css/navbar.module.css';
import anime3 from '../Home/images/anime3.png';
import defaultavatar from '../Home/images/defaultavatar.png';
import favicon3 from '../Home/images/favicon3.png';
// reactstrap components
import {
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	NavbarBrand,
	Navbar,
	Nav,
	Container
} from 'reactstrap';

//Auth
import AuthApi from "../Auth/AuthAPI";
import Cookies from 'js-cookie'
import sessionstorage from 'sessionstorage'

const Navbardefault = () => {
	const Auth = React.useContext(AuthApi);
	const [totalState, settotalState] = React.useState({ collapseOpen: false, color: 'rgb(52, 116, 116)' })
	React.useEffect(() => {

		window.addEventListener('scroll', changeColor);
		return () => window.removeEventListener('scroll', changeColor);

	})

	const changeColor = () => {
		if (document.documentElement.scrollTop > 99 || document.body.scrollTop > 99) {
			settotalState({ collapseOpen: totalState.collapseOpen, color: 'bginfo' })
		} else if (document.documentElement.scrollTop < 100 || document.body.scrollTop < 100) {
			settotalState({ collapseOpen: totalState.collapseOpen, color: 'rgb(52, 116, 116)' })
		}
	};

	const ClickLogOut = () => {
		Auth.setAuth(false)
		Auth.setforgetpass(false)
		Auth.setcheckUserName(null)
		Cookies.remove("checkUserName");
		Cookies.remove("token");
		Cookies.remove("refreshtoken");
		sessionstorage.clear();
	};


	let location = useLocation();
	if (Auth.auth === true || Auth.forgetpass === true) {
		let stylenavbarparkingmap = null;
		if (location.pathname === '/parkingmap') {
			stylenavbarparkingmap = {
				backgroundColor: "rgb(52,116,116)"
			};
		}

		return (
			<Navbar style={stylenavbarparkingmap} className={totalState.color === 'bginfo' ? `${styles.fixedtop} ${styles.bginfo}` : `${styles.fixedtop}`} color-on-scroll="100">
				<Container style={{ display: 'flex', flexDirection: 'row' }}>
					<NavbarBrand className="NavbarBrand" to="/" tag={Link} id="navbar-brand">
						<span>SaiGon Parking</span>
					</NavbarBrand>
					<NavbarBrand className="NavbarBrand" to="/parkingmap" tag={Link} id="navbar-brand">
						<span>
							<img src={favicon3} alt="favicon3"></img>
							Map
						</span>
					</NavbarBrand>
					<Nav navbar>
						<UncontrolledDropdown nav>
							<DropdownToggle
								color="default"
								data-toggle="dropdown"
								href="#pablo"
								nav
								onClick={(e) => e.preventDefault()}
							>
								<div className="photo">
									<img style={{}} src={anime3} alt="anime3" />
								</div>
							</DropdownToggle>
							<DropdownMenu title="INFORMATION" className="DropdownMenu">
								<DropdownItem className="DropdownItem" tag={Link} to="/profile">
									<i className="tim-icons icon-bullet-list-67" />
										Hồ sơ cá nhân
								</DropdownItem>
								<DropdownItem className="DropdownItem" tag={Link} to="/profile/changepassword">
									<i className="tim-icons icon-single-02" />
										Đổi mật khẩu
									</DropdownItem>
								<DropdownItem className="DropdownItem" onClick={ClickLogOut}>
									<i className="tim-icons icon-single-02" />
										Đăng xuất
									</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Container>
			</Navbar>
		);
	}
	else if (Auth.auth === false) {
		return (
			<Navbar className={totalState.color === 'bginfo' ? `${styles.fixedtop} ${styles.bginfo}` : `${styles.fixedtop} + 'rgb(52, 116, 116)`} color-on-scroll="100">
				<Container style={{ display: 'flex', flexDirection: 'row' }}>
					<NavbarBrand className="NavbarBrand" to="/" tag={Link} id="navbar-brand">
						<span>SaiGon Parking</span>
					</NavbarBrand>
					<Nav navbar>
						<UncontrolledDropdown nav>
							<DropdownToggle
								color="default"
								data-toggle="dropdown"
								href="#pablo"
								nav
								onClick={(e) => e.preventDefault()}
							>
								<i className="fa fa-cogs d-lg-none d-xl-none" />
								<div className="photo">
									<img src={defaultavatar} alt="defaultavatar" />
								</div>
							</DropdownToggle>
							<DropdownMenu className="DropdownMenu">
								<DropdownItem className="DropdownItem" tag={Link} to="/register">
									<i className="tim-icons icon-bullet-list-67" />
									Đăng ký
								</DropdownItem>
								<DropdownItem className="DropdownItem" tag={Link} to="/login">
									<i className="tim-icons icon-single-02" />
									Đăng nhập
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Container>
			</Navbar>
		);
	}
}



export default Navbardefault