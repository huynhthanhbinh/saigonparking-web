import React, { useEffect } from 'react';
import Card from "react-bootstrap/Card";
//default images
import defaultimageparkinglot from './images/plot.jpg'

import { ParkingLotServiceClient } from '../../api/ParkingLot_grpc_web_pb';

import { API_URL } from '../../saigonparking';

import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb'
import Cookies from 'js-cookie'
//star
import StarRatings from "react-star-ratings";
//modal Error
import exceptionHandler from '../../ExceptionHandling'
//modal Error
import ModalError from '../Modal/ModalError'
const ParkinglotwebService = new ParkingLotServiceClient(API_URL)



const PatientInfo = ({ id, name, availableSlot, totalSlot }) => {

  const [parkinglot, setparkinglot] = React.useState(null)

  //config Modal Error
  const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
  const [myError, setmyError] = React.useState(null)
  function openModalError() {

    setmodalErrorIsOpen(true);
  }

  function closeModalError() {
    setmodalErrorIsOpen(false);
  }
  //

  const callgetParkingLotById = (parkinglotid) => {
    const request = new Int64Value();
    const token = 'Bearer ' + Cookies.get("token");
    request.setValue(parkinglotid)
    const metadata = { 'Authorization': token }

    ParkinglotwebService.getParkingLotById(request, metadata, (err, res) => {
      if (err) {

        console.log(err.message)
        if (exceptionHandler.handleAccessTokenExpired(err.message) === false) {
          setmyError('SPE#0000DB')
        }
        else {
          setmyError(err.message)
        }


        openModalError()

      } else {

        setparkinglot(res)
      }
    })
  }

  useEffect(() => {
    callgetParkingLotById(id)
  }, [id, modalErrorIsOpen])

  return <div class="info-card">
    {modalErrorIsOpen ? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
    {parkinglot ? <Card style={{ width: '18rem' }}>
      <Card.Header><h2>Thông tin chi tiết bãi xe</h2></Card.Header>
      <Card.Body>
        <Card.Title>ID: {id}</Card.Title>
        <Card.Text>
          <img style={{ width: '88%' }} src={(parkinglot.getInformation().getImagedata_asB64()) ? (`data:image/jpeg;base64,${parkinglot.getInformation().getImagedata_asB64()}`) : defaultimageparkinglot} />
        
            <StarRatings
              rating={parkinglot.getInformation().getRatingaverage()}
              starRatedColor="rgb(56,112,112)"
              starDimension="20px"
              starSpacing="2px"
              numberOfStars={5}
              name="rating"
            />
         
          <li>NAME: {parkinglot.getInformation().getName()}</li>
          <li>ADDRESS: {parkinglot.getInformation().getAddress()}</li>
          <li>PHONE: {parkinglot.getInformation().getPhone()}</li>
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