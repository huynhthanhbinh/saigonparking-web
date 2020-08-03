import React, { useState } from 'react'
import { Drawer, Button } from 'rsuite';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ParkingLotProto from '../../../api/ParkingLot_pb'
import ModalError from '../../Modal/ModalError'
import Cookies from 'js-cookie';
import Control from 'react-leaflet-control';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ParkingLotServiceClient } from '../../../api/ParkingLot_grpc_web_pb'
import { AuthServiceClient } from "../../../api/Auth_grpc_web_pb";
import { API_URL } from '../../../saigonparking';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Notification } from 'rsuite'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

const parkingLotService = new ParkingLotServiceClient(API_URL);
const authService = new AuthServiceClient(API_URL)

const DrawerAddParking = ({ isOpen, setIsOpen }) => {

    const [type, setType] = useState(ParkingLotProto.ParkingLotType.BUILDING)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [openingHour, setOpeningHour] = useState('')
    const [totalSlot, setTotalSlot] = useState(0)
    const [closingHour, setClosingHour] = useState('')
    const [phone, setPhone] = useState('')
    const [position, setPosition] = useState([10.762273961494273, 466.6819882392884])
    const [defaultZoom, setDefaultZoom] = useState(13)
    //renew accessToken
    const ErrorSPE00001 = React.useCallback(
        () => {
            const refreshtoken = "Bearer " + Cookies.get("refreshtoken");
            const metadata = { 'Authorization': refreshtoken };
            const request = new Empty();

            authService.generateNewToken(request, metadata, (err, res) => {
                if (err) {
                    setmyError(err.message)
                    openModalError()
                } else {
                    if (res.getRefreshtoken() === "") {
                        /* luu access token */
                        Cookies.set("token", res.getAccesstoken());
                    } else {
                        /* luu new access token + new refresh token */
                        Cookies.set("token", res.getAccesstoken());
                        Cookies.set("refreshtoken", res.getRefreshtoken());
                    }
                }
            });
        }, []
    )

    //config Error modal
    const [myError, setmyError] = useState(null)
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    function openModalError() {
        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }

    const handleCancle = () => {
        setIsOpen(false)
    }

    const handleChangeType = (event) => {
        setType(event.target.value)
        console.log(type)
    }

    const handleSubmitCreate = () => {
        const token = "Bearer " + Cookies.get("token");
        const metadata = { 'Authorization': token }
        const information = new ParkingLotProto.ParkingLotInformation()
        const request = new ParkingLotProto.ParkingLot()
        information.setName(name)
        information.setAddress(address)
        information.setPhone(phone ? phone : '')
        request.setType(type)
        request.setLatitude(position[0])
        request.setLongitude(position[1])
        request.setAvailableslot(parseInt(totalSlot))
        request.setTotalslot(parseInt(totalSlot))
        request.setOpeninghour(openingHour)
        request.setClosinghour(closingHour)
        request.setInformation(information)
        parkingLotService.createNewParkingLot(request, metadata, (err, res) => {
            if (err) {
                if (err.message === "SPE#00001") {
                    ErrorSPE00001();
                } else {
                    Notification['error']({
                        title: 'Error!',
                        description: <h4>Problem when create Parking Lot,
                        Please try again later</h4>
                    });
                    console.log(request)
                }
            } else {
                Notification['success']({
                    title: 'Add successed',
                    description: <h4>Add Parking Lot with ID: {res.getValue()} Success!</h4>
                });
                setType(ParkingLotProto.ParkingLotType.BUILDING)
                setName('')
                setAddress('')
                setOpeningHour('')
                setTotalSlot('')
                setClosingHour('')
                setPhone('')
                setPosition([10.762273961494273, 466.6819882392884])
                setDefaultZoom(13)
                handleCancle()
            }
        })
    }

    return (
        <Drawer backdrop="static" show={isOpen} size='xs' onHide={handleCancle}>
            <Drawer.Header>
                <Drawer.Title><span style={{ fontWeight: 'bolder' }}>Add ParkingLot</span></Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <ValidatorForm
                    onSubmit={() => handleSubmitCreate()}
                    onError={errors => console.log(errors)}
                >
                    <TextValidator
                        margin="normal"
                        id="name"
                        label="Name"
                        required
                        fullWidth
                        value={name}
                        onChange={(e) => { setName(e.target.value)}}
                    />
                    <TextValidator
                        margin="normal"
                        id="address"
                        label="Address"
                        required
                        fullWidth
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                    />
                    <TextValidator
                        margin="normal"
                        id="openingHour"
                        label="Opening Hour"
                        type="openingHour"
                        required
                        fullWidth
                        value={openingHour}
                        onChange={(e) => { setOpeningHour(e.target.value) }}
                        validators={['matchRegexp:^([0-1][0-9]|[2][0-3]):[0-5][0-9]:[0-5][0-9]$']}
                        errorMessages={['Please input match format: HH:mm:ss']}
                    />
                    <TextValidator
                        margin="normal"
                        id="closingHour"
                        label="Closing Hour"
                        required
                        fullWidth
                        value={closingHour}
                        onChange={(e) => { setClosingHour(e.target.value) }}
                        validators={['matchRegexp:^([0-1][0-9]|[2][0-3]):[0-5][0-9]:[0-5][0-9]$']}
                        errorMessages={['Please input match format: HH:mm:ss']}
                    />
                    <TextValidator
                        margin="normal"
                        id="totalSlot"
                        label="Total Slot"
                        type='number'
                        required
                        fullWidth
                        value={totalSlot}
                        onChange={(e) => { setTotalSlot(e.target.value) }}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            value={type}
                            onChange={handleChangeType}
                        >
                            <MenuItem value={ParkingLotProto.ParkingLotType.BUILDING}>Building</MenuItem>
                            <MenuItem value={ParkingLotProto.ParkingLotType.PRIVATE}>Private</MenuItem>
                            <MenuItem value={ParkingLotProto.ParkingLotType.GOVERNMENT_EMPLOYEESTREET}>Street</MenuItem>
                        </Select>
                    </FormControl>
                    <TextValidator
                        margin="normal"
                        id="phone"
                        label="Phone"
                        type="tel"
                        fullWidth
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value) }}
                        validators={['matchRegexp:^[0-9]{10}$']}
                        errorMessages={['Invalid Phone']}
                    />
                    <TextValidator
                        margin="normal"
                        id="lat"
                        label="Lat"
                        type='number'
                        fullWidth
                        required
                        value={position[0]}
                        onChange={(e) => {
                            let temp = position.slice()
                            temp[0] = e.target.value
                            setPosition(prev => temp)
                        }}
                    />
                    <TextValidator
                        margin="normal"
                        id="lntg"
                        label="Lng"
                        type='number'
                        fullWidth
                        required
                        value={position[1]}
                        onChange={(e) => {
                            let temp = position.slice()
                            temp[1] = e.target.value
                            setPosition(prev => temp)
                        }}
                    />
                    <Map viewport={position} onclick={(e) => {
                        let temp = []
                        temp.push(e.latlng.lat)
                        temp.push(e.latlng.lng)
                        setPosition(prev => temp)
                    }} onzoomend={(e) => setDefaultZoom(prev => e.target._zoom)} center={position} zoom={defaultZoom}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        <Control position="bottomleft" >
                            <button type='button' onClick={() => {
                                setPosition([10.762273961494273, 466.6819882392884])
                                setDefaultZoom(13)
                            }}>
                                Reset View
                            </button>
                        </Control>
                        <Marker position={position}>
                            <Popup>
                                {position[0]} , {position[1]}
                            </Popup>
                        </Marker>
                    </Map>
                    <br />
                    <Button style={{ marginTop: '10px' }} type='submit' appearance="primary">
                        Confirm
                    </Button>
                    <Button style={{ marginTop: '10px' }} onClick={handleCancle} appearance="subtle">
                        Cancel
                    </Button>
                </ValidatorForm>
            </Drawer.Body>
            <Drawer.Footer>
            </Drawer.Footer>
            {modalErrorIsOpen ? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
        </Drawer>
    )
}

export default DrawerAddParking