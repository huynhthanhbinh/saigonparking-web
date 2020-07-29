import React, { useEffect, useState } from 'react';
import { BookingServiceClient } from '../../api/Booking_grpc_web_pb';
import { ParkingLotServiceClient } from '../../api/ParkingLot_grpc_web_pb';
import { UserServiceClient } from '../../api/Actor_grpc_web_pb';
import { API_URL } from '../../saigonparking';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { AuthServiceClient } from "../../api/Auth_grpc_web_pb";
import ModalError from '../Modal/ModalError'
import Cookies from 'js-cookie';

const BookingService = new BookingServiceClient(API_URL)
const authService = new AuthServiceClient(API_URL)
const ParkingLotService = new ParkingLotServiceClient(API_URL)
const UserService = new UserServiceClient(API_URL)

const Dashboard = () => {

    const [countAllBooking, setCountAllBooking] = useState(0)
    const [countAllParkingLot, setCountAllParkingLot] = useState(0)
    const [countAllUser, setCountAllUser] = useState(0)
    const [flat, setFlat] = React.useState(false);
    const [myError, setmyError] = React.useState(null)
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);

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
        
        BookingService.countAllBooking(request, metadata, (err, res) => {
            if (err && !isCancelled) {
                if (err.message === "SPE#00001") {
                    ErrorSPE00001();
                }
                else {
                    setmyError(err.message)
                    openModalError()
                }
                console.log(err)
            } else {
                if (!isCancelled) {
                    setCountAllBooking(res.getValue())
                }
                // setNPage(Math.ceil(res.getValue() / 10))
            }
        })
        ParkingLotService.countAllParkingLot(request, metadata, (err, res) => {
            if (err && !isCancelled) {
            } else {
                if (!isCancelled) {
                    setCountAllParkingLot(res.getValue())
                }
                // setNPage(Math.ceil(res.getValue() / 10))
            }
        })
        UserService.countAllUser(request, metadata, (err, res) => {
            if (err && !isCancelled) {
            } else {
                if (!isCancelled) {
                    setCountAllUser(res.getValue())
                }
                // setNPage(Math.ceil(res.getValue() / 10))
            }
        })
        return () => {
            isCancelled = true;
        };
    }, [flat, ErrorSPE00001])

    return (
        <div className="MainCard">
            {modalErrorIsOpen ? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
            <div className='ContentMainCard'>
                <h1>
                    Count All Booking: {countAllBooking}
                </h1>
                <h1>
                    Count All Parking Lot: {countAllParkingLot}
                </h1>
                <h1>
                    Count All User: {countAllUser}
                </h1>
            </div>
        </div>
    )

}
export default Dashboard;