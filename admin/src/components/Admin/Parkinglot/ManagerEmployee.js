import React, { useState, useEffect } from 'react'
import { Modal, Button, ButtonGroup, Notification } from 'rsuite';
// import ParkingLotProto from '../../../api/ParkingLot_pb'
import Cookies from 'js-cookie';
import ParkingLotProto from '../../../api/ParkingLot_pb'
import { ParkingLotServiceClient } from '../../../api/ParkingLot_grpc_web_pb'
import { UserServiceClient } from '../../../api/Actor_grpc_web_pb'
import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb';
import { API_URL } from '../../../saigonparking';

const parkingLotService = new ParkingLotServiceClient(API_URL);
const userService = new UserServiceClient(API_URL);

const ManagerEmployee = ({ parkinglot, isOpen, isClose }) => {

    const [listUser, setListUser] = useState(null)
    const [isDisable, setIsDisable] = useState(false)

    useEffect(() => {
        setListUser(null)
        const token = "Bearer " + Cookies.get("token");
        const metadata = { 'Authorization': token }
        const request = new Int64Value()
        request.setValue(parkinglot.getId())
        userService.getEmployeeManageParkingLotList(request, metadata, (err, res) => {
            if (err) {
                console.log(err)
            }
            else {
                setListUser(res.getEmployeeList())
            }
        })
    }, [parkinglot])

    const removeAwayParkingLot = (idUser, idParking, bool) => {
        setIsDisable(true)
        const token = "Bearer " + Cookies.get("token");
        const metadata = { 'Authorization': token }
        const request = new ParkingLotProto.RemoveEmployeeOfParkingLotRequest()
        request.setEmployeeid(idUser)
        request.setParkinglotid(idParking)
        request.setDeleteemployee(bool)
        parkingLotService.removeEmployeeOfParkingLot(request, metadata, (err, res) => {
            if (err) {
                Notification['error']({
                    title: 'Error!',
                    description: <h4>Problem when {bool ? 'delete' : 'remove'} Parking Lot,
                    Please try again later</h4>
                });
            }
            else {
                Notification['success']({
                    title: `${bool ? 'Delete' : 'Remove'} successed`,
                    description: <h4>{bool ? 'Delete' : 'Remove'} Success!</h4>
                });
                setIsDisable(false)
                setListUser(list => list.filter(data => data.getId() !== idUser))
            }
        })
    }

    return (
        <>
            <Modal size="md" show={isOpen} onHide={isClose}>
                <Modal.Header>
                    <Modal.Title>Manager Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {listUser ? <ul>
                        {listUser.map((data, index) => {
                            return (
                                <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop:'5px' }}>
                                    {data.getId()}: {data.getUsername()}
                                    <ButtonGroup size="sm">
                                        <Button color="orange" disabled={isDisable} onClick={() => removeAwayParkingLot(data.getId(), parkinglot.getId(), false)}>Remove</Button>
                                        <Button color="red" disabled={isDisable} onClick={() => removeAwayParkingLot(data.getId(), parkinglot.getId(), true)}>Delete</Button>
                                    </ButtonGroup>
                                </li>
                            )
                        })}
                    </ul> : <h4>No user management ... </h4>}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={isClose} appearance="primary">
                        Ok
                </Button>
                    <Button onClick={isClose} appearance="subtle">
                        Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ManagerEmployee