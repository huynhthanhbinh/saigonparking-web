import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { ParkingLotServiceClient } from '../../../api/ParkingLot_grpc_web_pb';
import ParkinglotProto from '../../../api/ParkingLot_pb';
import { API_URL } from '../../../saigonparking';
import Cookies from 'js-cookie'
const ParkinglotwebService = new ParkingLotServiceClient(API_URL)


const Admingetallparkinglot = () => {
    const [patients, setPatients] = useState([]);

    let defaultLat = 10.762887;
    let defaultLng = 106.6800684;
    let abc = [];

    const callParkingLotAPI = async () => {
        const request = new ParkinglotProto.ScanningByRadiusRequest();
        const token = 'Bearer ' + Cookies.get("token");

        const metadata = { 'Authorization': token }
        request.setLatitude(defaultLat);
        request.setLongitude(defaultLng);
        request.setRadiustoscan(10)
        request.setNresult(20)

        ParkinglotwebService.getTopParkingLotInRegionOrderByDistanceWithName(request, metadata, (err, res) => {

            if (err) {
                console.log(err)
               
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
    }, [])
    console.log(patients)
    return (
        <div class="card">
            <button onClick="location.href='./QUANLYNV/ADD'" id="addnewlist" type="button" class="btn btn-success position-absolute" data-toggle="modal" data-target=".bd-example-modal-lg"><a class="fas fa-plus"  ></a> Add a new List</button>
            <table class="table table-hover" style={{ marginTop: "50px" }}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">BirthDay</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone </th>
                        <th scope="col">Salary</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        patients.map((patient, index) => 
                            <tr key = {index}>
                           
                            
                                <th scope="row" id="IDBIXOA">{patient.getId()}</th>
                                <td>{patient.getName()}</td>
                                <td>{patient.getType()}</td>
                                <td>{patient.getLatitude()}</td>
                                <td>{patient.getLongitude()}</td>
                                <td>{patient.getAvailableslot()}</td>
                                <td>{patient.getTotalslot()}</td>
                                <td>{patient.getDistance()}</td>

                                <td>
                                    <Link class="btn btn-sm btn-primary" to="/login" ><i class="far fa-edit"></i> edit</Link>
                                    <a id="btn-employee-delete" class="btn btn-sm btn-danger" ><i class="fas fa-trash-alt"></i> delete</a>
                                </td>

                          
                            
                            </tr>
                        )
                    }

                </tbody>

            </table>

        </div>
    )
}
export default Admingetallparkinglot;