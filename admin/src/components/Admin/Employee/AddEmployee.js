import React, { useState, useEffect } from 'react'
import { Steps } from 'rsuite';
import { Button, ButtonGroup, Icon, Input, InputGroup, List, Pagination, FlexboxGrid, Notification } from 'rsuite';
import { API_URL } from '../../../saigonparking';
import { ParkingLotServiceClient } from '../../../api/ParkingLot_grpc_web_pb';
import { AuthServiceClient } from "../../../api/Auth_grpc_web_pb";
import { UserServiceClient } from "../../../api/Actor_grpc_web_pb";
import ActorProto from "../../../api/Actor_pb";
import ParkinglotProto from '../../../api/ParkingLot_pb';
import ModalError from '../../Modal/ModalError'
import Cookies from 'js-cookie';
import parkingLotMapper from '../../../mapper/ParkingLotMapper';
import userMapper from "../../../mapper/UserMapper";
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import _ from 'lodash'
import 'rsuite/dist/styles/rsuite-default.css';
import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb';

const ParkinglotwebService = new ParkingLotServiceClient(API_URL)
const authService = new AuthServiceClient(API_URL)
const UserService = new UserServiceClient(API_URL);

const AddEmpolyee = () => {
    const stylesInput = {
        width: 300,
        marginBottom: 10
    };

    const [searchValueParking, setSearchParking] = useState('')
    const [searchValueUser, setSearchUser] = useState('')
    const [step, setStep] = useState(0);
    const [myError, setmyError] = useState(null)
    //ParkingLot
    const [totalParkinglot, settotalParkinglot] = useState(0)
    const [parkinglots, setParkinglots] = useState(null)
    const [pagenumber, setPagenumber] = useState(1)
    const [tempSearchParking, setTempSearchparking] = useState('')
    

    //User type Employee
    const [totalUser, settotalUser] = useState(0)
    const [users, setUsers] = useState(null)
    const [pagenumberU, setPagenumberU] = useState(1)
    const [tempSearchUser, setTempSearchuser] = useState('')

    //Check and set valid to add employee to parkinglot
    const [valid, setValid] = useState(null)

    const [resultChoosen, setResultChoosen] = useState({
        idParking: null,
        idUser: null
    })

    //renew accessToken
    const [flat, setFlat] = React.useState(false);
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

    //config Error modal
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    function openModalError() {
        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }

    //count all for Pagination
    useEffect(() => {
        //solved memory leak
        let isCancelled = false;

        const request = new ParkinglotProto.CountAllParkingLotRequest();
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }
        if (searchValueParking === null) request.setKeyword("")
        else request.setKeyword(searchValueParking)

        ParkinglotwebService.countAllParkingLot(request, metadata, (err, res) => {
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
                    settotalParkinglot(res.getValue())
                }
                // setNPage(Math.ceil(res.getValue() / 10))
            }
        })
        return () => {
            isCancelled = true;
        };
    }, [ErrorSPE00001, flat, pagenumber, searchValueParking])

    //get all parrking lot with pag
    useEffect(() => {
        //solved memory leak
        let isCancelled = false;

        const request = new ParkinglotProto.GetAllParkingLotRequest();
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }
        if (searchValueParking === null) request.setKeyword("")
        else request.setKeyword(searchValueParking)

        request.setNrow(10);
        request.setPagenumber(pagenumber);
        ParkinglotwebService.getAllParkingLot(request, metadata, (err, res) => {
            if (err && !isCancelled) {
                if (err.message === "SPE#00001") {
                }
                else {
                    setmyError(err.message)
                    openModalError()
                }
            } else {
                if (!isCancelled) {
                    setParkinglots(res.getParkinglotList())
                }
            }
        })
        return () => {
            isCancelled = true;
        };
    }, [ErrorSPE00001, flat, pagenumber, searchValueParking])

    //Count all User type Employee
    useEffect(() => {
        //solved memory leak
        let isMounted = false;
        //countAll
        const request = new ActorProto.CountAllUserRequest();
        // request.setKeyword()
        const token = "Bearer " + Cookies.get("token");
        const metadata = { 'Authorization': token };
        if (searchValueUser === null) request.setKeyword("")
        else request.setKeyword(searchValueUser)
        request.setUserrole(ActorProto.UserRole.PARKING_LOT_EMPLOYEE)
        UserService.countAllUser(request, metadata, (err, res) => {
            if (err && !isMounted) {
                if (err.message === "SPE#00001") {
                    ErrorSPE00001();
                } else {
                    setmyError(err.message);
                    openModalError();
                }
            } else {
                if (!isMounted) {
                    settotalUser(res.getValue());
                }
            }
        });

        return () => {
            isMounted = true;
        };
    }, [pagenumberU, flat, ErrorSPE00001, searchValueUser]);

    useEffect(() => {
        //solved memory leak
        let isMounted = false;
        //getAllUser
        const request = new ActorProto.GetAllUserRequest();
        const token = "Bearer " + Cookies.get("token");
        const metadata = { 'Authorization': token };
        request.setNrow(10);
        request.setPagenumber(pagenumberU);
        if (searchValueUser === null) request.setKeyword("")
        else request.setKeyword(searchValueUser)
        request.setUserrole(ActorProto.UserRole.PARKING_LOT_EMPLOYEE)
        UserService.getAllUser(request, metadata, (err, res) => {
            if (err) {
                if (err.message === "SPE#00001") {
                    ErrorSPE00001();
                } else {
                    setmyError(err.message);
                    openModalError();
                }
            } else {
                if (!isMounted) {
                    setUsers(res.getUserList());
                }
            }
        });
        return () => {
            isMounted = true;
        };
    }, [pagenumberU, flat, ErrorSPE00001, searchValueUser]);

    const checkValidtoAdd = (data) => {

        const request = new Int64Value();
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }
        request.setValue(data.idUser.getId())
        ParkinglotwebService.checkEmployeeAlreadyManageParkingLot(request, metadata, (err, res) => {
            if (err) {
                if (err.message === "SPE#00001") {
                    ErrorSPE00001();
                }
                else {
                    setmyError(err.message);
                    openModalError();
                }
            } else {
                if (res.getValue() === false) setValid(false)
                else setValid(true)
            }
        })
    }

    //handle step
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
    };
    const onNext = () => onChange(step + 1);
    const onPrevious = () => {
        onChange(step - 1);
        setValid(null)
    }

    const handleChoseParking = (data) => {
        let temp = resultChoosen
        temp.idParking = data
        setResultChoosen(prev => temp)
        onNext()
    }

    const handleChoseUser = (data) => {
        let temp = resultChoosen
        temp.idUser = data
        setResultChoosen(prev => temp)
        checkValidtoAdd(temp)
        onNext()
    }

    //Submit Add
    const handleSubmit = () => {
        const request = new ParkinglotProto.AddEmployeeOfParkingLotRequest();
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }
        request.setEmployeeid(resultChoosen.idUser.getId())
        request.setParkinglotid(resultChoosen.idParking.getId())
        ParkinglotwebService.addEmployeeOfParkingLot(request, metadata, (err, res) => {
            if (err) {
                if (err.message === "SPE#00001") {
                    ErrorSPE00001();
                }
                else {
                    setmyError(err.message);
                    openModalError();
                }
            } else {
                Notification['success']({
                    title: resultChoosen.idUser.getUsername(),
                    description: <h4>Add Employee to {resultChoosen.idParking.getInformation().getName()} Success</h4>
                });
                setStep(0)
            }
        })
    }

    const handleChangeSearchPark = React.useCallback(_.debounce((value) => { setSearchParking(value)}, 1000),[])
    const handleChangeSearchUser = React.useCallback(_.debounce((value) => { setSearchUser(value)}, 1000),[])

    return (
        <>
            <h3 style={{ marginBottom: '15px', color:'#df49a6' }}>Add Employee</h3>
            <div className="MainCard" style={{ padding: '40px', marginTop: '10px' }}>
                {modalErrorIsOpen ? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}
                <Steps current={step}>
                    <Steps.Item title="Choose Parking Lot" description="" />
                    <Steps.Item title="Choose Employee" description="" />
                    <Steps.Item title="Finish" description="" />
                </Steps>

                <hr />
                {step === 0 ? <>
                    <InputGroup style={stylesInput}>
                        <Input value={tempSearchParking} onChange={
                            (value) => {
                                setTempSearchparking(prev => value)
                                handleChangeSearchPark(value)
                            }
                    } />
                        <InputGroup.Button>
                            <Icon icon="search" />
                        </InputGroup.Button>
                    </InputGroup>

                    {parkinglots ? <List hover>
                        <FlexboxGrid>
                            <FlexboxGrid.Item colspan={2}>
                                <h6>ID</h6>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={6}>
                                <h6>NAME</h6>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={6}>
                                <h6>TYPE</h6>
                            </FlexboxGrid.Item>
                            <h6>CAPACITY</h6>
                        </FlexboxGrid>
                        {parkinglots.map((item, index) => (
                            <List.Item onClick={() => handleChoseParking(item)} key={item.getId()} index={index}>
                                <FlexboxGrid>
                                    <FlexboxGrid.Item colspan={2}>
                                        <div>{item.getId()}</div>
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item colspan={6}>
                                        <div>{item.getInformation().getName()}</div>
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item colspan={6}>
                                        <div>{parkingLotMapper.toTypeString(item.getType())}</div>
                                    </FlexboxGrid.Item >
                                    <div>{item.getTotalslot()}</div>
                                </FlexboxGrid>
                            </List.Item>
                        ))}
                    </List> : null}

                    <Pagination
                        prev
                        last
                        next
                        first
                        size="lg"
                        maxButtons={5}
                        ellipsis
                        boundaryLinks
                        activePage={pagenumber}
                        onSelect={(value) => { setPagenumber(prev => value) }}
                        pages={totalParkinglot % 10 === 0 ? totalParkinglot / 10 : Math.floor(totalParkinglot / 10) + 1}
                    />
                    <hr />
                </> : step === 1 ? <>
                    <InputGroup style={stylesInput}>
                        <Input value={tempSearchUser} onChange={
                            (value) => {
                                setTempSearchuser(prev => value)
                                handleChangeSearchUser(value)
                            }} />
                        <InputGroup.Button>
                            <Icon icon="search" />
                        </InputGroup.Button>
                    </InputGroup>

                    {users ? <List hover>
                        <FlexboxGrid>
                            <FlexboxGrid.Item colspan={2}>
                                <h6>ID</h6>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={6}>
                                <h6>USERNAME</h6>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={6}>
                                <h6>ROLE</h6>
                            </FlexboxGrid.Item>
                            <h6>EMAIL</h6>
                        </FlexboxGrid>
                        {users.map((item, index) => (
                            <List.Item onClick={() => handleChoseUser(item)} key={item.getId()} index={index}>
                                <FlexboxGrid>
                                    <FlexboxGrid.Item colspan={2}>
                                        <div>{item.getId()}</div>
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item colspan={6}>
                                        <div>{item.getUsername()}</div>
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item colspan={6}>
                                        <div>{userMapper.toRoleString(item.getRole())}</div>
                                    </FlexboxGrid.Item >
                                    <div>{item.getEmail()}</div>
                                </FlexboxGrid>
                            </List.Item>
                        ))}
                    </List> : null}

                    <Pagination
                        prev
                        last
                        next
                        first
                        size="lg"
                        maxButtons={5}
                        ellipsis
                        boundaryLinks
                        activePage={pagenumberU}
                        onSelect={(value) => { setPagenumberU(prev => value) }}
                        pages={totalUser % 10 === 0 ? totalUser / 10 : Math.floor(totalUser / 10) + 1}
                    />
                    <hr />
                </> : <>
                            {valid ? <>
                                <h5>Employee: {resultChoosen.idUser.getUsername()} - ID: {resultChoosen.idUser.getId()}</h5>
                                <br />
                                Can't add to <span style={{ fontWeight: 'bolder' }}>{resultChoosen.idParking.getInformation().getName()}</span> because User already have another parking lot
                                <br />
                                <h4>Please choose again!</h4>
                            </> : <>
                                    <h5>Employee: {resultChoosen.idUser.getUsername()} - ID: {resultChoosen.idUser.getId()}</h5>
                                    <br />
                                Do you want to add to <span style={{ fontWeight: 'bolder' }}>{resultChoosen.idParking.getInformation().getName()}</span> ?
                                <br />
                                    <h4>Please Confirm!</h4>
                                </>}

                            <hr />
                        </>}

                <ButtonGroup>
                    <Button onClick={onPrevious} disabled={step === 0}>
                        Back
                </Button>
                    <Button onClick={handleSubmit} appearance="primary" disabled={valid !== null ? valid : true}>
                        Confirm
                </Button>
                </ButtonGroup>
            </div>
        </>
    );
}

export default AddEmpolyee