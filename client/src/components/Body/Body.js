import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import search from './images/search.png';
import direction from './images/direction.png';
import car2 from './images/car2.png';
import phone from './images/phone.png';
import appstore from './images/appstore.png';
import '../../css/video.css';
import Navbardefault from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
const Body = () => {
	const Style = styled.div`
	`;
	var style = {
		backgroundColor: 'white',
		// borderTop: "1px solid #E7E7E7",
		// textAlign: "center",
		// padding: "20px",
		// position: "fixed",
		// left: "0",
		// bottom: "0",
		// height: "70px",
		// width: "100%",
	};

	return (
		<>
			<div className="banner">
				<video loop autoPlay muted>
					<source src={require("../Home/images/Midnight Run Trim.mp4")} type="video/mp4" />
				</video>
				<div className='cover'>
				</div>
				<MDBRow className='bannerRow'>
					<MDBCol className='colImagePhone' md='6' color="white">
						<img className='phoneImg' src={phone} alt="phone" />
					</MDBCol>
					<MDBCol className='colContentBanner' md='6' color="white">
						<div className="content">
							<h6>Saigon Parking</h6>
							<p>Ứng dụng tìm kiếm bãi xe và điều hướng qua điện thoại</p>
							<p>tại thành phố Hồ Chí Minh</p>
							<a href='# ' target="_blank" rel="noopener noreferrer"><img src="https://www.niftybuttons.com/googleplay/googleplay-button1.png" /></a>
							<a href='# ' rel="noopener noreferrer"><img style={{ width: '155px', paddingLeft: '5px', opacity: '0.5', cursor: 'default' }} src={appstore} /></a>
						</div>
					</MDBCol>
				</MDBRow>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path fill="#fff" fill-opacity="1" d="M0,192L48,165.3C96,139,192,85,288,64C384,43,480,53,576,80C672,107,768,149,864,176C960,203,1056,213,1152,218.7C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
				</svg>
			</div>
			<Style style={style}>
				<MDBContainer fluid className="text-center text-md-left">
					<MDBRow className='rowMDB'>
						<MDBCol className='colMDB' sm='12' md='6' lg='4' color="white">
							<div className="photo">
								<img src={search} alt="search" />
							</div>
							<h3>Tìm kiếm dễ dàng</h3>
							<p className="white-text">
								SaiGon Parking cung cấp danh sách các điểm đỗ và số chỗ còn trống quanh khu vực bạn muốn
								đỗ xe
							</p>
						</MDBCol>
						<MDBCol className='colMDB' sm='12' md='6' lg='4' color="white">
							<div className="photo">
								<img src={direction} alt="direction" />
							</div>
							<h3 className="white-title">Dẫn đường chính xác</h3>
							<p className="white-text">
								Sử dụng điều hướng của Google Map và thuật toán chỉ đường đi ngắn nhất giúp bạn có thể
								đến bãi đỗ một cách an toàn và nhanh chóng
							</p>
						</MDBCol>
						<MDBCol className='colMDB' sm='12' md='6' lg='4' color="white">
							<div className="photo">
								<img src={car2} alt="car2" />
							</div>
							<h3 className="white-title">Sử dụng hiệu quả các điểm đỗ xe</h3>
							<p className="white-text">
								SaiGon Parking giúp cho các đơn vị khai thác điểm đỗ xe nâng cao khả năng tiếp cận khách
								hàng cũng như cung cấp những công cụ giám sát, quản lí chuyên nghiệp nhất
							</p>
						</MDBCol>
					</MDBRow>
				</MDBContainer>

				<div className='function'>
					<span>Tính Năng</span>
				</div>
				<div className="footer-copyright text-center py-3" />
				<div className="footer-copyright text-center py-3" />
			</Style>
			<Footer />
		</>
	);
};
export default Body;
