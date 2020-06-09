import React, { useEffect, useState } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CovidGoogleMap from "./CovidGoogleMap";
import PatientInfo from "./PatientInfo";

import ListPatients from "./ListPatients";

import Cookies from 'js-cookie'
import { ParkingLotServiceClient } from '../../api/ParkingLot_grpc_web_pb';
import ParkinglotProto from '../../api/ParkingLot_pb';
//modal
import ModalError from '../Modal/ModalError'
import Modal from 'react-modal';
import Landing from '../Landing'
import { API_URL } from '../../saigonparking';
import exceptionHandler from '../../ExceptionHandling'

const ParkinglotwebService = new ParkingLotServiceClient(API_URL)


const CovidDashboard = (props) => {
    //config Error modal
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError,setmyError] = React.useState(null)
    const [flat,setflat] = React.useState(false)
    function openModalError() {
        
        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }
    

    const [currentPatient, setCurrentPatient] = useState();

    // những nơi có sử dụng patients phải check coi khác null không 
    const [patients, setPatients] = useState(null);

    const [indexPatientClicked, setIndexPatientClicked] = useState();



    const [Clicklocation, setClicklocation] = useState({ lat: 10.762887, lng: 106.6800684 })

    const fgetClicklocation = (getClicklocation) => {
        console.log(getClicklocation)
        setClicklocation(getClicklocation)

    }

    let listPatientSelected = [];

    let refs = [];

    // let defaultLat = 10.762887;
    // let defaultLng = 106.6800684;


    let abc = [];
    const callParkingLotAPI = async () => {
        const request = new ParkinglotProto.ScanningByRadiusRequest();
        const token = 'Bearer ' + Cookies.get("token");

        const metadata = { 'Authorization': token }

        request.setLatitude(Clicklocation.lat);
        request.setLongitude(Clicklocation.lng);
        request.setRadiustoscan(3)
        request.setNresult(10)

        ParkinglotwebService.getTopParkingLotInRegionOrderByDistanceWithoutName(request, metadata, (err, res) => {

            if (err) {
                console.log(err.message)
                if(exceptionHandler.handleAccessTokenExpired(err.message)===false)
                {
                    setmyError('SPE#0000DB')
                }
                else
                {   
                    if(err.message==='SPE#00001')
                    {
                        setflat(!flat)
                    }
                    else
                    {
                        setmyError(err.message)
                    }
                    
                }
                
                if(err.message!='SPE#00001')
                {
                    openModalError()
                }
               
              
           
            } else {



                res.getParkinglotresultList().map((parkinglot) => {
                    abc.push(parkinglot)

                })

                setPatients(abc)

            }
        })
    }

    useEffect(() => {

        callParkingLotAPI()
    }, [Clicklocation,flat])

    useEffect(() => {
        if (patients != null) {
            setScrollList(patients, indexPatientClicked, refs);
        }

    })
    if (patients != null) {
        refs = patients.reduce((acc, patient, index) => {
            acc[index] = React.createRef();
            return acc;
        }, {});

        patients.map((patient, index) => {

            listPatientSelected = listPatientSelected.concat(patient);
    
        })
        
    }

    const patientMarkerClickedHandler = (patient, index) => {
        setCurrentPatient(patient);
        setIndexPatientClicked(index);
    }

    const clickItemPatient = (patient, index) => {
        setCurrentPatient(patient);
        setIndexPatientClicked(index);
    }
    
    return ((<Container>
    { modalErrorIsOpen? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} />:null}
        <Row>

            {(patients !=null) ? <Col xs={10}><CovidGoogleMap onPatientMarkerClicked={patientMarkerClickedHandler} patients={listPatientSelected ? listPatientSelected : patients} currentPatient={currentPatient} refs={refs} fgetClicklocation={fgetClicklocation} />
            </Col> : <Landing/>}
            <Col xs={2}>
                {currentPatient &&
                    <PatientInfo id={currentPatient.getId()} name={currentPatient.getName()} availableSlot={currentPatient.getAvailableslot()} totalSlot={currentPatient.getTotalslot()} />}
            </Col>
        </Row>
        <Row>
            <Col xs={10}>
            <ListPatients patients={listPatientSelected ? listPatientSelected : patients} onClickItemPatient={clickItemPatient} refs={refs} currentPatient={currentPatient} indexClickedMaker={indexPatientClicked} />
            </Col>
            
        </Row>
        

        
    </Container>
    
    ))
};

const setScrollList = (patients, index, refs) => {
    if (patients.length > 0) {
        if (refs[index]) {
            if (refs[index].current != null) {
                refs[index].current.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }

    }
}

export default CovidDashboard;