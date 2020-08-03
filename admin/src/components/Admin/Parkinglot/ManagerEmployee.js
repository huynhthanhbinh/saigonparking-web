import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'rsuite';
import ParkingLotProto from '../../../api/ParkingLot_pb'
import Cookies from 'js-cookie';
import { ParkingLotServiceClient } from '../../../api/ParkingLot_grpc_web_pb'
import { UserServiceClient } from '../../../api/Actor_grpc_web_pb'
import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb';
import { API_URL } from '../../../saigonparking';

const parkingLotService = new ParkingLotServiceClient(API_URL);
const userService = new UserServiceClient(API_URL);

const ManagerEmployee = ({ parkinglot, isOpen, isClose }) => {

    const [listUser, setListUser] = useState([])

    useEffect(() => {
        const token = "Bearer " + Cookies.get("token");
        const metadata = { 'Authorization': token }
        const request = new Int64Value()
        request.setValue(parkinglot.getId())
        parkingLotService.getEmployeeManageParkingLotIdList(request, metadata, (err, res) => {
            if (err) {
                console.log(err)
            }
            else {
                let list = res.getEmployeeidList()
                for (let i = 0; i < list.length; i++) {
                    request.setValue(list[i])
                    userService.getUserById(request, metadata, (err, res) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            let temp = listUser.slice()
                            temp.push(res)
                            setListUser(list => temp)
                        }
                    })
                }
            }
        })
    }, [parkinglot])

    return (
        <>
            <Modal size="md" show={isOpen} onHide={isClose}>
                <Modal.Header>
                    <Modal.Title>Manager Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {parkinglot.getId()}
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