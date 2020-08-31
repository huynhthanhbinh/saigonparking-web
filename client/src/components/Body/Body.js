import React from 'react';
import styled from 'styled-components';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import search from './images/search.png';
import direction from './images/direction.png';
import car2 from './images/car2.png';
import phone from './images/phone.png';
import appstore from './images/appstore.png'
import bach from './images/bach.jpg';
import binh from './images/binh.jpg';
import dao from './images/dao.jpg';
import tai from './images/tai.jpg';
import hai from './images/hai.jpg';
import '../../css/video.css';
import Footer from '../Footer/Footer'
import TimelineFunc from './TimelineFunc'
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Body = () => {
	const Style = styled.div`
	`;
	var style = {
		backgroundColor: 'white'
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
							<a href='https://drive.google.com/drive/folders/1KHYxfPII_WMl0ICFaQ71pgjVAD6TG3q8?usp=sharing' target="_blank" rel="noopener noreferrer"><img alt='' src="https://www.niftybuttons.com/googleplay/googleplay-button1.png" /></a>
							<a href='# ' rel="noopener noreferrer"><img alt='' style={{ width: '155px', paddingLeft: '5px', opacity: '0.5', cursor: 'default' }} src={appstore} /></a>
						</div>
					</MDBCol>
				</MDBRow>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path fill="#fff" d="M0,192L48,165.3C96,139,192,85,288,64C384,43,480,53,576,80C672,107,768,149,864,176C960,203,1056,213,1152,218.7C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
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
					<h2>Tính Năng</h2>
					<TimelineFunc />
					<h2>...</h2>
				</div>

				<h1>Contact Us</h1>
				<div className='contactUs'>
					<div className="contact-info">
						<div onClick={() => { window.location.href = 'mailto:saigonparkingmap@gmail.com' }} className="cardB">
							<i className="card-icon"><FontAwesomeIcon icon={faEnvelope} /></i>
							<p>saigonparkingmap@gmail.com</p>
						</div>
						<div onClick={() => { window.location.href = 'tel:+84968036784' }} className="cardB">
							<i className="card-icon"><FontAwesomeIcon icon={faPhone} /></i>
							<p>+84968 036 784</p>
						</div>
						<div onClick={() => { window.location.href = 'https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+Khoa+h%E1%BB%8Dc+T%E1%BB%B1+nhi%C3%AAn+-+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+Qu%E1%BB%91c+Gia+TP.HCM/@10.7626554,106.6802732,17z/data=!4m8!1m2!3m1!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIC0gxJDhuqFpIGjhu41jIFF14buRYyBHaWEgVFAuSENN!3m4!1s0x31752f1c06f4e1dd:0x43900f1d4539a3d!8m2!3d10.762913!4d106.682172' }} className="cardB">
							<i className="card-icon"><FontAwesomeIcon icon={faMapMarkedAlt} /></i>
							<p>HCM, Việt Nam</p>
						</div>
					</div>
				</div>
				<h1>Team Developer</h1>
				<div className='profileMember'>
					<div className='cardBody'>
						<div className='layerBody'></div>
						<div className='contentCardBody'>
							<p>Xử lý và hoàn thành tính năng cho ứng dụng và website</p>
							<div className='imageCardBody'>
								<img src={bach} alt="" />
							</div>
							<div className='detailsBody'>
								<h2 style={{ color: 'black' }}>Vũ Tường Bách<br /><span>Website, Android Developer</span></h2>
							</div>
						</div>
					</div>
					<div className='cardBody'>
						<div className='layerBody'></div>
						<div className='contentCardBody'>
							<p>Xử lý dữ liệu và thực thi tính năng ở Backend</p>
							<div className='imageCardBody'>
								<img src={binh} alt="" />
							</div>
							<div className='detailsBody'>
								<h2 style={{ color: 'black' }}>Huỳnh Thanh Bình<br /><span>Backend Developer</span></h2>
							</div>
						</div>
					</div>
					<div className='cardBody'>
						<div className='layerBody'></div>
						<div className='contentCardBody'>
							<p>Phân tích nghiệp vụ, kiểm thử và đánh giá</p>
							<div className='imageCardBody'>
								<img src={dao} alt="" />
							</div>
							<div className='detailsBody'>
								<h2 style={{ color: 'black' }}>Phạm Viết Minh Đạo<br /><span>Tester, BA</span></h2>
							</div>
						</div>
					</div>
					<div className='cardBody'>
						<div className='layerBody'></div>
						<div className='contentCardBody'>
							<p>Xử lý và hoàn thành tính năng cho ứng dụng và website</p>
							<div className='imageCardBody'>
								<img src={tai} alt="" />
							</div>
							<div className='detailsBody'>
								<h2 style={{ color: 'black' }}>Đặng Đức Tài<br /><span>Website, Android Developer</span></h2>
							</div>
						</div>
					</div>
					<div className='cardBody'>
						<div className='layerBody'></div>
						<div className='contentCardBody'>
							<p>Thiết kế giao diện website dành cho khách hàng, nhân viên quản lý bãi xe, và ứng dụng android</p>
							<div className='imageCardBody'>
								<img src={hai} alt="" />
							</div>
							<div className='detailsBody'>
								<h2 style={{ color: 'black' }}>Vũ Hải<br /><span>Website, Android Desinger</span></h2>
							</div>
						</div>
					</div>
				</div>
				<div className="footer-copyright text-center py-3" />
			</Style>
			<Footer />
		</>
	);
};
export default Body;
