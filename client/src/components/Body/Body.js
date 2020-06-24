import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import search from './images/search.png';
import direction from './images/direction.png';
import car2 from './images/car2.png';
import '../../css/video.css';
const Body = () => {
	const Style = styled.div`
		h5,
		p,
		c {
			color: grey;
		}
	`;
	var style = {
		backgroundColor: 'white'
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
						<source src={require("../Home/images/The Mountain Run.mp4")} type="video/mp4" />
					</video>
					<div className="content">
						<h6>Saigon Parking</h6>
						<p>Ứng dụng tìm kiếm bãi xe và điều hướng qua điện thoại</p>
						<p>tại thành phố Hồ Chí Minh</p>
					</div>
				</div>
			<Style style={style}>
				<div className="footer-copyright text-center py-3" />
				<MDBFooter color="blue" className="font-small pt-4 mt-4">
					<MDBContainer fluid className="text-center text-md-left">
						<MDBRow>
							<MDBCol md="4" color="white">
								<div className="photo">
									<img src={search} alt="search" />
								</div>
								<h1></h1>
								<h5 className="white-title">Tìm kiếm dễ dàng</h5>
								<p className="white-text">
									SaiGon Parking cung cấp danh sách các điểm đỗ và số chỗ còn trống quanh khu vực bạn muốn
									đỗ xe
							</p>
							</MDBCol>
							<MDBCol md="4" color="white">
								<div className="photo">
									<img src={direction} alt="direction" />
								</div>
								<h1></h1>
								<h5 className="white-title">Dẫn đường chính xác</h5>
								<p className="white-text">
									Sử dụng điều hướng của Google Map và thuật toán chỉ đường đi ngắn nhất giúp bạn có thể
									đến bãi đỗ một cách an toàn và nhanh chóng
							</p>
							</MDBCol>
							<MDBCol md="4" color="white">
								<div className="photo">
									<img src={car2} alt="car2" />
								</div>
								<h1></h1>
								<h5 className="white-title">Sử dụng hiệu quả các điểm đỗ xe</h5>
								<p className="white-text">
									SaiGon Parking giúp cho các đơn vị khai thác điểm đỗ xe nâng cao khả năng tiếp cận khách
									hàng cũng như cung cấp những công cụ giám sát, quản lí chuyên nghiệp nhất
							</p>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
					<div className="footer-copyright text-center py-3" />
					<div className="footer-copyright text-center py-3" />
				</MDBFooter>
			</Style>
		</>
	);
};
export default Body;
