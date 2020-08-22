import React, { useEffect, useState } from 'react';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import CovidGoogleMap from "./CovidGoogleMap";
import Cookies from 'js-cookie';
import { ParkingLotServiceClient } from '../../api/ParkingLot_grpc_web_pb';
import ParkinglotProto from '../../api/ParkingLot_pb';
//modal
import ModalError from '../Modal/ModalError'
import Landing from '../Landing'
import { API_URL } from '../../saigonparking';
//Kiem tra va xuly loi Error00001
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { AuthServiceClient } from '../../api/Auth_grpc_web_pb';
//SLIDE DRAWER
import SideMenu from './drawer'
//import ReactContext SetClick
import SetClick from './ConTextMap/SetClick'
// import custom algorithm common
import algorithm from '../../algorithm'

const authService = new AuthServiceClient(API_URL)
const ParkinglotwebService = new ParkingLotServiceClient(API_URL)


const CovidDashboard = (props) => {
    //set up state switch page ListPatients and PatientInfo 
    const [switchLP, setswitchLP] = React.useState({ LiPa: false, BinhLuan: false })
    //config Error modal
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null)

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
        // console.log(getClicklocation)
        setClicklocation(getClicklocation)
    }

    let listPatientSelected = [];
    let refs = [];
    let abc = [];
    //xử lý lỗi error0001 cấp accestoken mới
    const [flat, setflat] = React.useState(false)
    const xulyerrorSPE00001 = () => {
        const refreshtoken = Cookies.get('refreshtoken')
        const token = 'Bearer ' + refreshtoken;
        const metadata = { 'Authorization': token }
        const request = new Empty()

        authService.generateNewToken(request, metadata, (err, res) => {
            if (err) {
                // 2 nguoi cung dang nhap vao 1 tai khoan
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

    useEffect(() => {
        let unmount = false;
        async function callParkingLotAPI() {
            const request = new ParkinglotProto.ScanningByRadiusRequest();
            const token = 'Bearer ' + Cookies.get("token");
            const metadata = { 'Authorization': token }
            request.setLatitude(Clicklocation.lat);
            request.setLongitude(Clicklocation.lng);
            request.setRadiustoscan(3)
            request.setNresult(10)
            await ParkinglotwebService.getTopParkingLotInRegionOrderByDistanceWithName(request, metadata, (err, res) => {
                if (err) {
                    if (err.message === 'SPE#00001') {
                        xulyerrorSPE00001()
                    }
                    else {
                        setmyError(err.message)
                        openModalError()
                    }
                } else {
                    res.getParkinglotresultList().map((parkinglot) => {
                        return abc.push(parkinglot)
                    })
                    setPatients(abc)
                }
            })
        }
        if (unmount === false) {
            callParkingLotAPI()
        }
        return () => {
            unmount = true
        }
        // eslint-disable-next-line
    }, [Clicklocation, flat])

    useEffect(() => {
        let unmount = false;
        if (unmount === false) {
            if (patients !== null && currentPatient !== undefined) {
                if (algorithm.customizedIndexOf(currentPatient, patients) !== -1) {
                    setScrollList(patients, algorithm.customizedIndexOf(currentPatient, patients), refs);
                }
                else {
                }
            }
        }
        return () => {
            unmount = true
        }
        // eslint-disable-next-line
    }, [switchLP, flat, patients, currentPatient])
    if (patients != null) {
        refs = patients.reduce((acc, patient, index) => {
            acc[index] = React.createRef();
            return acc;
        }, {});
        patients.map((patient, index) => {
            return listPatientSelected = listPatientSelected.concat(patient);
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


    return ((
        <SetClick.Provider value={{ switchLP, setswitchLP }}>
            {modalErrorIsOpen ? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
            <Container>
                <Row>
                    {(patients != null) ? <CovidGoogleMap onPatientMarkerClicked={patientMarkerClickedHandler} patients={listPatientSelected ? listPatientSelected : patients} currentPatient={currentPatient} refs={refs} fgetClicklocation={fgetClicklocation} />
                        : <Landing />}
                    {/* <Col xs={3}>
                        {currentPatient &&
                            <PatientInfo id={currentPatient.getId()} name={currentPatient.getName()} availableSlot={currentPatient.getAvailableslot()} totalSlot={currentPatient.getTotalslot()} />}
                    </Col> */}
                </Row>
                <Row>
                    {patients && <SideMenu overlayColor="#transparent" width={450} data={listPatientSelected ? listPatientSelected : patients} onClickItemPatient={clickItemPatient} refs={refs} currentPatient={currentPatient} indexClickedMaker={indexPatientClicked} />}
                    {/* <Col xs={9}>
                        <ListPatients patients={listPatientSelected ? listPatientSelected : patients} onClickItemPatient={clickItemPatient} refs={refs} currentPatient={currentPatient} indexClickedMaker={indexPatientClicked} />
                    </Col> */}
                </Row>
            </Container>
        </SetClick.Provider>
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