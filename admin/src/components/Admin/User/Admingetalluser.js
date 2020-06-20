import React, { useEffect } from 'react'
//modal
import UpdateModal from './Updateuser'
import AddModal from './Adduser'
//modal Error
import ModalError from '../../Modal/ModalError'
import exceptionHandler from '../../../ExceptionHandling'
//cs
import '../../../css/formparkinguser.css'

import '../../../css/pagination.css'
import { UserServiceClient } from '../../../api/Actor_grpc_web_pb';
import ActorProto from '../../../api/Actor_pb';
import { API_URL } from '../../../saigonparking';
import Cookies from 'js-cookie'

import { Empty } from 'google-protobuf/google/protobuf/empty_pb'
import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb'
import Pagination from "react-js-pagination";
import userMapper from '../../../mapper/UserMapper';

const UserService = new UserServiceClient(API_URL)


const Admingetalluser = () => {
    //Pagination

    const [totalUser, settotalUser] = React.useState(0)
    const [pagenumber, setpagenumber] = React.useState(1)
    // const [setNPage] = React.useState(0)

    const [users, setuser] = React.useState(null)
    const [tmp, settmp] = React.useState(null)

    //config Update modal

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    //config Add modal

    const [modalAddIsOpen, setIsAddOpen] = React.useState(false);
    // function openModalAdd() {
    //     setIsAddOpen(true);
    // }

    function closeModalAdd() {
        setIsAddOpen(false);
    }
    //config Error modal
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError,setmyError] = React.useState(null)
    function openModalError() {

        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }
    //value
    //ACTIVE INACTIVE
    const [isActive, setisActive] = React.useState(false)

    const callactivateUser = async (id) => {
        const request = new Int64Value();
        const token = 'Bearer ' + Cookies.get("token");
        request.setValue(id)
        const metadata = { 'Authorization': token }

        UserService.activateUser(request, metadata, (err, res) => {
            if (err) {
                // console.log(err)
            } else {
                setisActive(!isActive)
            }
        })
    }

    const calldeactivateUser = async (id) => {
        const request = new Int64Value();
        const token = 'Bearer ' + Cookies.get("token");
        request.setValue(id)
        const metadata = { 'Authorization': token }
        UserService.deactivateUser(request, metadata, (err, res) => {
            if (err) {
                // console.log(err)
            } else {
                setisActive(!isActive)
            }
        })
    }

    useEffect(() => {
        //countAll
        const request = new Empty();
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }

        UserService.countAll(request, metadata, (err, res) => {
            if (err) {
                if(exceptionHandler.handleAccessTokenExpired(err.message)===false)
                {
                    setmyError('SPE#0000DB')
                }
                else
                {
                    setmyError(err.message)
                }
                openModalError()
            } else {
                settotalUser(res.getValue())
                // setNPage(Math.ceil(res.getValue() / 10))
            }
        })
    }, [pagenumber,modalErrorIsOpen])

    useEffect(() => {
        //getAllUser
        const request = new ActorProto.GetAllUserRequest();
        const token = 'Bearer ' + Cookies.get("token");
        const metadata = { 'Authorization': token }
        request.setNrow(10);
        request.setPagenumber(pagenumber);
        UserService.getAllUser(request, metadata, (err, res) => {

            if (err) {
                if(exceptionHandler.handleAccessTokenExpired(err.message)===false)
                {
                    setmyError('SPE#0000DB')
                }
                else
                {
                    setmyError(err.message)
                }
                openModalError()
            } else {
                setuser(res.getUserList())
            }
        })
    }, [pagenumber, isActive,modalErrorIsOpen])

    const handlechange = (e) => {
        setpagenumber(e)
    }

    return (
        <div className="card">
            {/* <button onClick={openModalAdd} id="addnewlist" type="button" className="btn btn-success position-absolute" > Add a new List</button> */}
            <table className="table table-hover" style={{ marginTop: "50px" }}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">ROLE</th>
                        <th scope="col">USERNAME</th>
                        <th scope="col">EMAIL </th>
                        <th scope="col">LASTSIGNIN</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map((user, index) =>
                            <tr key={index}>
                                <th scope="row" id="IDBIXOA">{user.getId()}</th>
                                <td>{userMapper.toRoleString(user.getRole())}</td>
                                <td>{user.getUsername()}</td>
                                <td>{user.getEmail()}</td>
                                <td>{user.getLastsignin()}</td>
                                <td>
                                    <button className="buttonparkinglotuser" onClick={() => {
                                        if (user.getIsactivated() === true) {
                                            calldeactivateUser(user.getId())

                                        }
                                        else {
                                            callactivateUser(user.getId())

                                        }


                                    }} > {(user.getIsactivated() === true) ? "Activated" : "Inactivated"}</button>
                                    {/* <button id="btn-employee-delete" className="btn btn-sm btn-danger" > delete</button> */}
                                    <button style={{backgroundColor:"blue",border:"0px"}} className="buttonparkinglotuser" onClick={() => {
                                        settmp(user)
                                        openModal()

                                    }
                                    }>Detail</button>
                                </td>


                            </tr>
                        )
                    }

                </tbody>

            </table>
            {modalErrorIsOpen?<ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} />:null}
            
            {tmp ? <UpdateModal modalIsOpen={modalIsOpen} closeModal={closeModal} parkinglot={tmp} /> : null}
            <AddModal modalAddIsOpen={modalAddIsOpen} closeModalAdd={closeModalAdd} />
            {totalUser ?
                <Pagination
                    

                    pageRangeDisplayed={10}
                    activePage={pagenumber}
                    itemsCountPerPage={10}
                    totalItemsCount={totalUser}
                    onChange={handlechange}


                />
                : null}

        </div>

    )
}


export default Admingetalluser;