import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import styled from 'styled-components';
import {
  NavLink
} from 'reactstrap';
import {
  Link
} from "react-router-dom";


const Footer = () => {
  const Styles = styled.div`
    h5,p,c,a,NavLink {
        color: #ffffff;
      
    }
  `;
  var style = {
    backgroundColor: "black",
    // borderTop: "2px solid #E7E7E7",
    textAlign: "center",
  }

  return (
    <Styles style={style} >
      <MDBFooter>
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow>
            <MDBCol style={{ marginTop: '20px' }} md="4">
              <h5 className="white-title">SAIGON PARKING</h5>
              <p className="white-text">
                Find The Best Parking Lot For Your Car
              </p>
            </MDBCol>
            <MDBCol style={{ marginTop: '20px' }} md="4">
              <ul>
                <li>
                  <NavLink to="/" tag={Link}>Trang chủ</NavLink>
                </li>
                <li>
                  <NavLink to="/register" tag={Link}>Đăng ký</NavLink>
                </li>
                <li>
                  <NavLink to="/profile" tag={Link}>Hồ sơ cá nhân</NavLink>
                </li>
              </ul>
            </MDBCol>
            <MDBCol style={{ marginTop: '20px' }} md="4">
              <ul>
                <li>
                  <NavLink to="/" tag={Link}>Liên hệ</NavLink>
                </li>
                <li >
                  <NavLink to="/" tag={Link}>Đội ngũ</NavLink>
                </li>
                <li>
                  <NavLink to="/" tag={Link}>Điều kiện & Điều khoản</NavLink>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3">
        </div>
      </MDBFooter>
    </Styles>
  )
}
export default Footer;