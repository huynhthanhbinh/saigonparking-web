import React, { useEffect } from 'react'
//modal 
import UpdateModal from './Updateparkinglot'
import AddModal from './Addparkinglot'
import ModalError from '../../Modal/ModalError'
import { Button } from 'semantic-ui-react'
//cs
import stylesLoading from '../Loading.module.css'
//css table
import '../../../css/table.css'
//
// import { Link } from "react-router-dom";
//css pagination
import '../../../css/pagination.css'
import { ParkingLotServiceClient } from '../../../api/ParkingLot_grpc_web_pb';
import ParkinglotProto from '../../../api/ParkingLot_pb';
import { API_URL } from '../../../saigonparking';
import Cookies from 'js-cookie';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import Pagination from "react-js-pagination";
import parkingLotMapper from '../../../mapper/ParkingLotMapper';
import { AuthServiceClient } from "../../../api/Auth_grpc_web_pb";

const ParkinglotwebService = new ParkingLotServiceClient(API_URL)
const authService = new AuthServiceClient(API_URL)


const Admingetallparkinglot = () => {
    //renew accessToken
    const [flat, setFlat] = React.useState(false);
    const ErrorSPE00001 = React.useCallback(
        () => {
            const refreshtoken = "Bearer " + Cookies.get("refreshtoken");
            const metadata = { 'Authorization': refreshtoken };
            const request = new Empty();

            authService.generateNewToken(request, metadata, (err, res) => {
                console.log('here: ', err)
                if (err) {
                    setmyError(err.message)
                    openModalError()
                } else {
                    if (res.getRefreshtoken() === "") {
                        /* luu access token */
                        Cookies.set("token", res.getAccesstoken());
                        console.log("accesstoken mới");
                        setFlat(flat => !flat);
                    } else {
                        /* luu new access token + new refresh token */
                        Cookies.set("token", res.getAccesstoken());
                        Cookies.set("refreshtoken", res.getRefreshtoken());
                        console.log("refreshtoken + accesstoken mới");
                        setFlat(flat => !flat);
                    }
                }
            });
        }, []
    )


    //Loading State
    const [isLoading, setIsLoading] = React.useState(true)

    //Pagination
    const [totalParkinglot, settotalParkinglot] = React.useState(0)
    const [pagenumber, setpagenumber] = React.useState(1)
    // const [setNPage] = React.useState(0)
    const [parkinglots, setParkinglots] = React.useState(null)
    const [tmp, settmp] = React.useState(null)
    //Loading in button
    const [loadingButton, setLoadingButton] = React.useState(false)
    //config Update modal
    const [modalIsOpen, setIsOpen] = React.useState(false);

    //modal detail
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        setLoadingButton(false)
    }

    //modal delete
    const [modalAddIsOpen, setIsAddOpen] = React.useState(false);
    function openModalAdd() {
        setIsAddOpen(true);
    }
    function closeModalAdd() {
        setIsAddOpen(false);
        setLoadingButton(false)
    }
    //config Error modal
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null)
    function openModalError() {
        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }

    useEffect(() => {
        //solved memory leak
        let isCancelled = false;

        const request = new Empty();
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }
        ParkinglotwebService.countAll(request, metadata, (err, res) => {
            if (err && !isCancelled) {
                if (err.message === "SPE#00001") {
                    ErrorSPE00001();
                }
                else {
                    setmyError(err.message)
                }
                openModalError()
            } else {
                if (!isCancelled) {
                    settotalParkinglot(res.getValue())
                }
                // setNPage(Math.ceil(res.getValue() / 10))
            }
        })
        return () => {
            isCancelled = true;
        };
    }, [pagenumber, flat, ErrorSPE00001])

    useEffect(() => {
        //solved memory leak
        let isCancelled = false;

        const request = new ParkinglotProto.GetAllParkingLotRequest();
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }
        request.setNrow(10);
        request.setPagenumber(pagenumber);
        ParkinglotwebService.getAllParkingLot(request, metadata, (err, res) => {
            if (err && !isCancelled) {
                if (err.message === "SPE#00001") {
                }
                else {
                    setmyError(err.message)
                }
                openModalError()
            } else {
                if (!isCancelled) {
                    setParkinglots(res.getParkinglotList())
                    setIsLoading(false);
                }
            }
        })
        return () => {
            isCancelled = true;
        };
    }, [pagenumber, modalAddIsOpen, flat])


    const handlechange = (e) => {
        setpagenumber(e)
        if (pagenumber !== e) setIsLoading(true);
    }

    return (
        <div>
            {isLoading ?
                <>
                    {modalErrorIsOpen ? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
                    <div className={stylesLoading.section}>
                        <div className={stylesLoading.loaderUser}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </>
                :
                <div>
                    <div className="MainCard">
                        <div className='ContentMainCard'>
                            {/* <button onClick={openModalAdd} id="addnewlist" type="button" className="btn btn-success position-absolute" > Add a new List</button> */}
                            <table>
                                <thead>
                                    <tr>
                                        <th width="10%" scope="col">ID</th>
                                        <th width="30%" scope="col">NAME</th>
                                        <th width="10%" scope="col">TYPE</th>
                                        <th width="10%" scope="col">OPENING </th>
                                        <th width="10%" scope="col">CLOSING </th>
                                        <th width="5%" scope="col">AVAILABILITY</th>
                                        <th width="5%" scope="col">CAPACITY</th>
                                        <th width="20%" scope="col">CONTROL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        parkinglots && parkinglots.map((parkingLot, index) =>
                                            <tr onClick={() => {
                                                setLoadingButton(true)
                                                settmp(parkingLot)
                                                openModal()
                                            }} key={index}>
                                                <td id="IDBIXOA">{parkingLot.getId()}</td>
                                                <td>{parkingLot.getInformation().getName()}</td>
                                                <td>{parkingLotMapper.toTypeString(parkingLot.getType())}</td>
                                                <td>{parkingLot.getOpeninghour()}</td>
                                                <td>{parkingLot.getClosinghour()}</td>
                                                <td>{parkingLot.getAvailableslot()}</td>
                                                <td>{parkingLot.getTotalslot()}</td>
                                                <td>
                                                    <Button.Group size='mini'>
                                                        {/* <a id="btn-employee-delete" className="btn btn-sm btn-danger" ><i className="fas fa-trash-alt"></i> delete</a> */}
                                                        <Button loading={loadingButton} disabled={loadingButton} primary onClick={() => {
                                                            setLoadingButton(true)
                                                            settmp(parkingLot)
                                                            openModal()
                                                        }
                                                        }>DETAIL</Button>
                                                        <Button.Or text='|' />
                                                        <Button loading={loadingButton} disabled={loadingButton} negative onClick={() => {
                                                            setLoadingButton(true)
                                                            settmp(parkingLot)
                                                            openModalAdd()
                                                        }}> DELETE</Button>
                                                    </Button.Group>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {tmp ? <UpdateModal modalIsOpen={modalIsOpen} closeModal={closeModal} parkinglot={tmp} /> : null}
                    {tmp ? <AddModal modalAddIsOpen={modalAddIsOpen} closeModalAdd={closeModalAdd} parkinglot={tmp} /> : null}
                    {totalParkinglot ?
                        <Pagination
                            pageRangeDisplayed={10}
                            activePage={pagenumber}
                            itemsCountPerPage={10}
                            totalItemsCount={totalParkinglot}
                            onChange={handlechange}
                        />
                        : null}
                </div>
            }
        </div>
    )
}


export default Admingetallparkinglot;