import React, { useEffect, useState } from 'react';
import { BookingServiceClient } from '../../api/Booking_grpc_web_pb';
import { ParkingLotServiceClient } from '../../api/ParkingLot_grpc_web_pb';
import { UserServiceClient } from '../../api/Actor_grpc_web_pb';
import { API_URL } from '../../saigonparking';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { AuthServiceClient } from "../../api/Auth_grpc_web_pb";
import BookingProto from '../../api/Booking_pb';
import ParkingLotProto from '../../api/ParkingLot_pb';
import ActorProto from '../../api/Actor_pb';
import ModalError from '../Modal/ModalError'
import Cookies from 'js-cookie';
import Chart from "react-apexcharts";

const BookingService = new BookingServiceClient(API_URL)
const authService = new AuthServiceClient(API_URL)
const ParkingLotService = new ParkingLotServiceClient(API_URL)
const UserService = new UserServiceClient(API_URL)

const Dashboard = () => {

    const [flat, setFlat] = React.useState(false);
    const [myError, setmyError] = React.useState(null)
    const [modalErrorIsOpen, setmodalErrorIsOpen] = useState(false);
    const [optionBooking, setOptionBooking] = useState(null)
    const [optionParkingLot, setOptionParkingLot] = useState(null)
    const [optionUser, setOptionUser] = useState(null)

    function openModalError() {
        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }

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
                        setFlat(flat => !flat);
                    } else {
                        /* luu new access token + new refresh token */
                        Cookies.set("token", res.getAccesstoken());
                        Cookies.set("refreshtoken", res.getRefreshtoken());
                        setFlat(flat => !flat);
                    }
                }
            });
        }, []
    )


    useEffect(() => {
        //solved memory leak
        let isCancelled = false;

        const request = new Empty();
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }

        ParkingLotService.countAllParkingLotGroupByType(request, metadata, (err, res) => {
            if (err && !isCancelled) {
                if (err.message === "SPE#00001") {
                    ErrorSPE00001();
                }
                else {
                    setmyError(err.message)
                    openModalError()
                }
            } else {
                if (!isCancelled) {
                    let result = res.getTypecountMap().toArray()
                    let temp = {
                        series: [0, 0, 0],
                        options: {
                            chart: {
                                width: 500,
                                type: 'pie',
                            },
                            labels: [`BUILDING: ${0}`, `PRIVATE: ${0}`, `STREET: ${0}`],
                            responsive: [{
                                breakpoint: 480,
                                options: {
                                    chart: {
                                        width: 400
                                    },
                                    legend: {
                                        position: 'bottom'
                                    }
                                }
                            }]
                        }
                    }
                    for (let i = 0; i < result.length; i++) {
                        switch (result[i][0]) {
                            case ParkingLotProto.ParkingLotType.BUILDING:
                                {
                                    temp.series[0] = result[i][1]
                                    temp.options.labels[0] = `BUILDING: ${result[i][1]}`
                                    break
                                }
                            case ParkingLotProto.ParkingLotType.PRIVATE:
                                {
                                    temp.series[1] = result[i][1]
                                    temp.options.labels[1] = `PRIVATE: ${result[i][1]}`
                                    break
                                }
                            case ParkingLotProto.ParkingLotType.STREET:
                                {
                                    temp.series[2] = result[i][1]
                                    temp.options.labels[2] = `STREET: ${result[i][1]}`
                                    break
                                }
                            default: break
                        }
                    }
                    setOptionParkingLot(prev => temp)
                }
            }
        })
        BookingService.countAllBookingGroupByStatus(request, metadata, (err, res) => {
            if (err && !isCancelled) {
            } else {
                if (!isCancelled) {
                    let result = res.getStatuscountMap().toArray()
                    let temp = {
                        series: [0, 0, 0, 0, 0],
                        options: {
                            chart: {
                                width: 500,
                                type: 'pie',
                            },
                            labels: [`CREATED: ${0}`, `ACCEPTED: ${0}`, `REJECTED: ${0}`, `CANCELLED: ${0}`, `FINISHED: ${0}`],
                            responsive: [{
                                breakpoint: 480,
                                options: {
                                    chart: {
                                        width: 400
                                    },
                                    legend: {
                                        position: 'bottom'
                                    }
                                }
                            }]
                        }
                    }
                    for (let i = 0; i < result.length; i++) {
                        switch (result[i][0]) {
                            case BookingProto.BookingStatus.CREATED:
                                {
                                    temp.series[0] = result[i][1]
                                    temp.options.labels[0] = `CREATED: ${result[i][1]}`
                                    break
                                }
                            case BookingProto.BookingStatus.ACCEPTED:
                                {
                                    temp.series[1] = result[i][1]
                                    temp.options.labels[1] = `ACCEPTED: ${result[i][1]}`
                                    break
                                }
                            case BookingProto.BookingStatus.REJECTED:
                                {
                                    temp.series[2] = result[i][1]
                                    temp.options.labels[2] = `REJECTED: ${result[i][1]}`
                                    break
                                }
                            case BookingProto.BookingStatus.CANCELLED:
                                {
                                    temp.series[3] = result[i][1]
                                    temp.options.labels[3] = `CANCELLED: ${result[i][1]}`
                                    break
                                }
                            case BookingProto.BookingStatus.FINISHED:
                                {
                                    temp.series[4] = result[i][1]
                                    temp.options.labels[4] = `FINISHED: ${result[i][1]}`
                                    break
                                }
                            default: break
                        }
                    }
                    setOptionBooking(prev => temp)
                }
            }
        })
        UserService.countAllUserGroupByRole(request, metadata, (err, res) => {
            if (err && !isCancelled) {
            } else {
                if (!isCancelled) {
                    let result = res.getRolecountMap().toArray()
                    let tempUser = {
                        series: [0, 0, 0, 0],
                        options: {
                            chart: {
                                width: 500,
                                type: 'pie',
                            },
                            labels: [`CUSTOMER: ${0}`, `PARKING LOT EMPLOYEE: ${0}`, `GOVERNMENT EMPLOYEE: ${0}`, `ADMIN: ${0}`],
                            responsive: [{
                                breakpoint: 480,
                                options: {
                                    chart: {
                                        width: 400
                                    },
                                    legend: {
                                        position: 'bottom'
                                    }
                                }
                            }]
                        }
                    }
                    for (let i = 0; i < result.length; i++) {
                        switch (result[i][0]) {
                            case ActorProto.UserRole.CUSTOMER:
                                {
                                    tempUser.series[0] = result[i][1]
                                    tempUser.options.labels[0] = `CUSTOMER: ${result[i][1]}`
                                    break
                                }
                            case ActorProto.UserRole.PARKING_LOT_EMPLOYEE:
                                {
                                    tempUser.series[1] = result[i][1]
                                    tempUser.options.labels[1] = `PARK EMPLOYEE: ${result[i][1]}`
                                    break
                                }
                            case ActorProto.UserRole.GOVERNMENT_EMPLOYEE:
                                {
                                    tempUser.series[2] = result[i][1]
                                    tempUser.options.labels[2] = `GOV EMPLOYEE: ${result[i][1]}`
                                    break
                                }
                            case ActorProto.UserRole.ADMIN:
                                {
                                    tempUser.series[3] = result[i][1]
                                    tempUser.options.labels[3] = `ADMIN: ${result[i][1]}`
                                    break
                                }
                            default: break
                        }
                    }
                    setOptionUser(prev => tempUser)
                }
            }
        })
        return () => {
            isCancelled = true;
        };
    }, [flat, ErrorSPE00001])

    return (
            <div className="dashboardCard">
                {modalErrorIsOpen ? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
                <div className='contentCard'>
                    <h2>Parking Lot:</h2>
                    {optionParkingLot ? <Chart options={optionParkingLot.options} series={optionParkingLot.series} type="pie" width={380} /> : <h1>No Data Parking Lot at this time</h1>}
                </div>
                <div className='contentCard'>
                    <h2>User:</h2>
                    {optionUser ? <Chart options={optionUser.options} series={optionUser.series} type="pie" width={380} /> : <h1>No Data User at this time</h1>}
                </div>
                <div className='contentCard'>
                    <h2>Booking:</h2>
                    {optionBooking ? <Chart options={optionBooking.options} series={optionBooking.series} type="pie" width={380} /> : <h1>No Data Booking at this time</h1>}
                </div>
            </div>
    )

}
export default Dashboard;