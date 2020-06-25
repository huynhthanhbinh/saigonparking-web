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
//
//React Context ConTextMap SetClick
import SetClick from './ConTextMap/SetClick'
//
// bắt lỗi error0001 cấp accesctoken mới
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { AuthServiceClient } from '../../api/Auth_grpc_web_pb';
import sessionstorage from 'sessionstorage'
//import animation loading screen
import { CommonLoading, BoxLoading, WindMillLoading } from 'react-loadingg';
//import button back
import backbutton from "./icon/leftarrow.png"
const authService = new AuthServiceClient(API_URL)

const ParkinglotwebService = new ParkingLotServiceClient(API_URL)



const PatientInfo = ({ id, name, availableSlot, totalSlot }) => {
  // check Switch ListPa and PatientInfo FALSE LIST  | TRUE LA PATIENTINFOR
  const abc = React.useContext(SetClick)

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
  //xử lý lỗi error0001 cấp accestoken mới
  const [flat, setflat] = React.useState(false)
  const xulyerrorSPE00001 = () => {
    const refreshtoken = Cookies.get('refreshtoken')
    const token = 'Bearer ' + refreshtoken;
    const metadata = { 'Authorization': token }
    const request = new Empty()

    authService.generateNewToken(request, metadata, (err, res) => {
      if (err) {

        setmyError(err.message)
        openModalError()


      } else {

        if (res.getRefreshtoken() === '') {
          /** luu access token */
          Cookies.set("token", res.getAccesstoken())
          console.log("accesstoken mới")
          setflat(!flat)

        } else {
          /** luu new access token + new refresh token */
          Cookies.set("token", res.getAccesstoken())
          Cookies.set("refreshtoken", res.getRefreshtoken())
          console.log("refreshtoken + accesstoken mới")
          setflat(!flat)
        }


      }
    })

  }

  //

  const callgetParkingLotById = (parkinglotid) => {
    const request = new Int64Value();
    const token = 'Bearer ' + Cookies.get("token");
    request.setValue(parkinglotid)
    const metadata = { 'Authorization': token }

    ParkinglotwebService.getParkingLotById(request, metadata, (err, res) => {
      if (err) {

        if (err.message === 'SPE#00001') {
          xulyerrorSPE00001()
        }
        else {
          setmyError(err.message)
          openModalError()
        }

      } else {

        setparkinglot(res)
      }
    })
  }

  useEffect(() => {
    callgetParkingLotById(id)
  }, [id, flat])
  if (parkinglot === null) {
    return <WindMillLoading color={"rgb(52, 116, 116)"}></WindMillLoading>
  }
  else {

    return <div className="info-card">
      <span role="button" tabIndex="0" onClick={() => {
        abc.setswitchLP({ LiPa: false, BinhLuan: false })
      }}><img src={backbutton}></img></span>

      {modalErrorIsOpen ? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
      {parkinglot ? <Card style={{ width: '25rem' }}>

        <Card.Header><img style={{ width: '100%' }} src={(parkinglot.getInformation().getImagedata_asB64()) ? (`data:image/jpeg;base64,${parkinglot.getInformation().getImagedata_asB64()}`) : defaultimageparkinglot} /></Card.Header>
        <Card.Body>
          <Card.Title>ID: {id}</Card.Title>
          <StarRatings
            rating={parkinglot.getInformation().getRatingaverage()}
            starRatedColor="rgb(56,112,112)"
            starDimension="20px"
            starSpacing="2px"
            numberOfStars={5}
            name="rating"
          />
          <Card.Text>

            <li>NAME: {parkinglot.getInformation().getName()}</li>
            <li>ADDRESS: {parkinglot.getInformation().getAddress()}</li>
            <li>PHONE: {parkinglot.getInformation().getPhone()}</li>
            <li>TYPE: {parkinglot.getType()}</li>
            <li>OPEN: {parkinglot.getOpeninghour()}</li>
            <li>CLOSE: {parkinglot.getClosinghour()}</li>
            <li>AVAILABLESLOT: {parkinglot.getAvailableslot()}</li>
            <li>TOTALSLOT: {parkinglot.getTotalslot()}</li>


          </Card.Text>
          <button onClick={() => { abc.setswitchLP({ LiPa: true, BinhLuan: true }) }}>xem bình luận</button>
        </Card.Body>

        {/* <button onClick={() => {
          abc.setswitchLP({ LiPa: false, BinhLuan: false })
        }}>BACK</button> */}
      </Card> : null}
    </div>
  }
};

export default PatientInfo;