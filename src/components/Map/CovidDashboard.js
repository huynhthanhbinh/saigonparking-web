import React, { useEffect, useState, useRef } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CovidGoogleMap from "./CovidGoogleMap";
import PatientInfo from "./PatientInfo";
import Container from "react-bootstrap/Container";
import CovidMap from "./CovidMap";
import ListPatients from "./ListPatients";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import { subDays, startOfToday, format, addDays, getDate } from "date-fns";
import Cookies from 'js-cookie'
import { ParkingLotServiceClient } from '../../api/ParkingLot_grpc_web_pb';
import ParkinglotProto from '../../api/ParkingLot_pb';
import  { API_URL } from '../../saigonparking';

const constantDay = new Date("2019-12-19");
const ParkinglotwebService = new ParkingLotServiceClient(API_URL)


const CovidDashboard = (props) => {
    const [currentPatient, setCurrentPatient] = useState();

    const [patients, setPatients] = useState([]);

    const [indexPatientClicked, setIndexPatientClicked] = useState();

    const [checkPage, setcheckPage] = useState(true);


    let listPatientSelected = [];

    let refs = [];

    let defaultLat = 10.762887;
    let defaultLng = 106.6800684;
    let tmp = new ParkinglotProto.ParkingLotResultList();
    let abc = [];
    const callParkingLotAPI = async () => {
        const request = new ParkinglotProto.ScanningByRadiusRequest();
        const token = 'Bearer ' + Cookies.get("token");

        const metadata = { 'Authorization': token }
        request.setLatitude(defaultLat);
        request.setLongitude(defaultLng);
        request.setRadiustoscan(10)
        request.setNresult(20)

        ParkinglotwebService.getTopParkingLotInRegionOrderByDistanceWithoutName(request, metadata, (err, res) => {

            if (err) {
                console.log(err)
                setcheckPage(false)
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
    }, []
    )

    useEffect(() => {
        setScrollList(patients, indexPatientClicked, refs);
    })

    refs = patients.reduce((acc, patient, index) => {
        acc[index] = React.createRef();
        return acc;
    }, {});
    const patientMarkerClickedHandler = (patient, index) => {
        setCurrentPatient(patient);
        setIndexPatientClicked(index);
    }

    const clickItemPatient = (patient, index) => {
        setCurrentPatient(patient);
        setIndexPatientClicked(index);
    }

    


    patients.map((patien, index) => {

        listPatientSelected = listPatientSelected.concat(patien);

    })

    return ( (<Container>
        <Row>

            <Col xs={10}><CovidMap onPatientMarkerClicked={patientMarkerClickedHandler} patients={listPatientSelected ? listPatientSelected : patients} currentPatient={currentPatient} refs={refs} /></Col>
            <Col xs={2}>
                {currentPatient &&
                    <PatientInfo id={currentPatient.getId()}  availableSlot={currentPatient.getAvailableslot()} totalSlot={currentPatient.getTotalslot()}  />}
            </Col>
        </Row>
        <Row>
            <Col xs={10}>
                <ListPatients patients={listPatientSelected ? listPatientSelected : patients} onClickItemPatient={clickItemPatient} refs={refs} currentPatient={currentPatient} indexClickedMaker={indexPatientClicked} />
            </Col>
        </Row>
       


    </Container>)  )
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