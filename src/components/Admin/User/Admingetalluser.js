import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import UpdateModal from './Updateuser'
import AddModal from './Adduser'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
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
    const [nPage, setNPage] = React.useState(0)

    const [users, setuser] = React.useState(null)
    const [tmp, settmp] = React.useState(null)

    //config Update modal
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    //config Add modal

    const [modalAddIsOpen, setIsAddOpen] = React.useState(false);
    function openModalAdd() {

        setIsAddOpen(true);
    }

    function closeModalAdd() {
        setIsAddOpen(false);
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
                console.log(err)

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
                console.log(err)

            } else {

                setisActive(!isActive)


            }
        })
    }
    const callcountAll = async () => {

        const request = new Empty();
        const token = 'Bearer ' + Cookies.get("token");

        const metadata = { 'Authorization': token }

        UserService.countAll(request, metadata, (err, res) => {

            if (err) {
                console.log(err)

            } else {

                settotalUser(res.getValue())
                setNPage(Math.ceil(res.getValue() / 10))


            }
        })
    }

    const callgetAllUser = async () => {
        const request = new ActorProto.GetAllUserRequest();
        const token = 'Bearer ' + Cookies.get("token");

        const metadata = { 'Authorization': token }
        request.setNrow(10);
        request.setPagenumber(pagenumber);
        UserService.getAllUser(request, metadata, (err, res) => {

            if (err) {
                console.log(err)

            } else {

                setuser(res.getUserList())

            }
        })
    }

    useEffect(() => {

        callcountAll()
    }, [pagenumber])

    useEffect(() => {

        callgetAllUser()
    }, [pagenumber,isActive])


    const handlechange = (e) => {
        setpagenumber(e)

    }

    return (
        <div class="card">

            <button onClick={openModalAdd} id="addnewlist" type="button" class="btn btn-success position-absolute" ><a class="fas fa-plus"  ></a> Add a new List</button>
            <table class="table table-hover" style={{ marginTop: "50px" }}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">ROLE</th>
                        <th scope="col">USERNAME</th>
                        <th scope="col">EMAIL </th>
                        <th scope="col">ISACTIVATED</th>
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
                                <td>{(user.getIsactivated() === true) ? "Yes" : "No"}</td>
                                <td>{user.getLastsignin()}</td>

                                <td>
                                    <a class="btn btn-sm btn-primary" onClick={() => {
                                        if(user.getIsactivated() === true)
                                        {
                                            calldeactivateUser(user.getId())
                                           
                                        }
                                        else 
                                        {
                                            callactivateUser(user.getId())
                                             
                                        }
                                        

                                    }} ><i class="far fa-edit"></i> {(user.getIsactivated()  === true) ? "Yes" : "No"}</a>
                                    <a id="btn-employee-delete" class="btn btn-sm btn-danger" ><i class="fas fa-trash-alt"></i> delete</a>
                                    <button onClick={() => {
                                        settmp(user)
                                        openModal()

                                    }
                                    }>Open Modal</button>
                                </td>


                            </tr>
                        )
                    }

                </tbody>

            </table>
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