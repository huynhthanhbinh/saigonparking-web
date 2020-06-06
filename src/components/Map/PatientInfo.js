import React, { useEffect } from 'react';
import Card from "react-bootstrap/Card";


import { ParkingLotServiceClient } from '../../api/ParkingLot_grpc_web_pb';

import { API_URL } from '../../saigonparking';

import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb'
import Cookies from 'js-cookie'
const ParkinglotwebService = new ParkingLotServiceClient(API_URL)


const PatientInfo = ({ id, name, availableSlot, totalSlot }) => {

  const [parkinglot, setparkinglot] = React.useState(null)

  const callgetParkingLotById = (parkinglotid) => {
    const request = new Int64Value();
    const token = 'Bearer ' + Cookies.get("token");
    request.setValue(parkinglotid)
    const metadata = { 'Authorization': token }

    ParkinglotwebService.getParkingLotById(request, metadata, (err, res) => {
      if (err) {

        console.log(err)

      } else {

        setparkinglot(res)
      }
    })
  }

  useEffect(() => {
    callgetParkingLotById(id)
  }, [id])
  
  return <div class="info-card">
    {parkinglot ? <Card style={{ width: '18rem' }}>
      <Card.Header><h2>Thông tin chi tiết bãi xe</h2></Card.Header>
      <Card.Body>
        <Card.Title>ID: {id}</Card.Title>
        <Card.Text>
          <img style={{width:'88%'}} src={(parkinglot.getInformation().getImagedata_asB64())?(`data:image/jpeg;base64,${parkinglot.getInformation().getImagedata_asB64()}`):null} />
          <li>NAME: {name}</li>
          <li>TYPE: {parkinglot.getType()}</li>
          <li>OPEN: {parkinglot.getOpeninghour()}</li>
          <li>CLOSE: {parkinglot.getClosinghour()}</li>
          <li>AVAILABLESLOT: {parkinglot.getAvailableslot()}</li>
          <li>TOTALSLOT: {parkinglot.getTotalslot()}</li>


        </Card.Text>
      </Card.Body>
    </Card> : null}
  </div>
};

export default PatientInfo;