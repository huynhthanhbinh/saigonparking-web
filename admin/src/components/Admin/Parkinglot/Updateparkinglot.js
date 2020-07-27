
import React, { useEffect } from 'react'
import Card from "react-bootstrap/Card";
import { Modal } from 'semantic-ui-react'
// import { Row, Col, Container } from 'react-bootstrap'
// import { useField } from 'formik';

import { ParkingLotServiceClient } from '../../../api/ParkingLot_grpc_web_pb';
import { API_URL } from '../../../saigonparking';
import Cookies from 'js-cookie';

import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb';
import parkingLotMapper from '../../../mapper/ParkingLotMapper';
//Modal Error
import ModalError from '../../Modal/ModalError'
import exceptionHandler from '../../../ExceptionHandling'

//star
//star
import StarRatings from "react-star-ratings";
//image
import defaultimageparkinglot from './images/plot.jpg'
//

const ParkinglotwebService = new ParkingLotServiceClient(API_URL)

const UpdateModal = ({ modalIsOpen, closeModal, parkinglot }) => {
    //config Modal Error

    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null)
    function openModalError() {

        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }

    const [IsParking, setIsParking] = React.useState(null)
    useEffect(() => {
        
        if (modalIsOpen === true) {
            //getParking
            const request = new Int64Value();
            const token = 'Bearer ' + Cookies.get("token");
            request.setValue(parkinglot.getId())
            const metadata = { 'Authorization': token }

            ParkinglotwebService.getParkingLotById(request, metadata, (err, res) => {
                if (err) {
                    // console.log(err.message)
                    if (exceptionHandler.handleAccessTokenExpired(err.message) === false) {
                        setmyError('SPE#0000DB')
                    }
                    else {
                        setmyError(err.message)
                    }
                    openModalError()
                } else {
                    setIsParking(res)
                }
            })
        }
        return () => {
            setIsParking(null)
        }
    }, [modalIsOpen, parkinglot, modalErrorIsOpen])

    if (modalErrorIsOpen === true) {
        return (
            <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} />
        )
    }
    if (parkinglot != null) {

        return (
            <Modal
                open={modalIsOpen}
                onClose={() => {
                    closeModal()
                }}
                className="modal-content-parking"
            >

                {IsParking ? <Card >
                    <Card.Body>
                        <Card.Title>ID: {IsParking.getId()}</Card.Title>
                        <Card.Text>
                            <img style={{ width: '100%' }} src={(IsParking.getInformation().getImagedata_asB64()) ? (`data:image/jpeg;base64,${IsParking.getInformation().getImagedata_asB64()}`) : defaultimageparkinglot} alt=''/>
                            <li><StarRatings
                                rating={IsParking.getInformation().getRatingaverage()}
                                starRatedColor="rgb(56,112,112)"
                                starDimension="20px"
                                starSpacing="2px"
                                numberOfStars={5}
                                name="rating"
                            /></li>
                            <li>NAME: {IsParking.getInformation().getName()}</li>
                            <li>ADDRESS: {IsParking.getInformation().getAddress()}</li>
                            <li>PHONE: {IsParking.getInformation().getPhone()}</li>
                            <li>TYPE: {parkingLotMapper.toTypeString(IsParking.getType())}</li>
                            <li>OPEN: {IsParking.getOpeninghour()}</li>
                            <li>CLOSE: {IsParking.getClosinghour()}</li>
                            <li>AVAILABLESLOT: {IsParking.getAvailableslot()}</li>
                            <li>TOTALSLOT: {IsParking.getTotalslot()}</li>
                        </Card.Text>
                    </Card.Body>
                </Card> : null}

                <button className="buttonparkinglotuser" onClick={closeModal}>close</button>
            </Modal>
        )

    }
    else {
        return <div>XẢY RA LỖI KHI LOAD DỮ LIỆU</div>
    }




}
export default UpdateModal;

