import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../../css/button.css"
import {
    
    Link,

} from "react-router-dom";


const Admin = () => {
   
    return (
        <Container>
            <Row>
                <Col xs={6}>
                    <Link to="/getalluser">
                    <button  className="blue">USER</button>
                    </Link>

                </Col>
                <Col xs={6}>
                <Link to="/getallparkinglot">
                    <button  className="blue">PARKINGLOT</button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )

}
export default Admin;