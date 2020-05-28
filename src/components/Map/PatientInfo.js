import React, {useEffect, useState} from 'react';
import Card from "react-bootstrap/Card";


const PatientInfo = ({id, availableSlot, totalSlot}) => {
    // return <ul>
    //     <li>Name: {name}</li>
    //     <li>Address: {address}</li>
    //     <li>Note: {note}</li>
    //     <li>Verify Date: {verifyDate}</li>
    // </ul>
    return <div class = "info-card">
    <Card style={{ width: '18rem' }}>
    <Card.Header><h2>Thông tin chi tiết bãi xe</h2></Card.Header>
    <Card.Body>
    <Card.Title>ID: {id}</Card.Title>
      <Card.Text>
     
            <li>{availableSlot}</li>
            <li>{totalSlot}</li>
            
   
      </Card.Text>
    </Card.Body>
  </Card>
  </div>
};

export default PatientInfo;