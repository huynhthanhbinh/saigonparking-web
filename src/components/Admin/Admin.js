import React, { useEffect, useState, useRef } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../../css/button.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import hinh1 from "./images/1.jpg"
import hinh2 from "./images/2.jpg"

const Admin = () => {
   
    return (
        <Container>
            <Row>
                <Col xs={6}>
                    <Link to="/getalluser">
                    <button style={{marginTop:"100px", fontSize:"100px"}} class="blue">USER</button>
                    </Link>

                </Col>
                <Col xs={6}>
                <Link to="/getallparkinglot">
                    <button style={{marginTop:"100px", fontSize:"100px"}} class="blue">PARKINGLOT</button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )

}
export default Admin;