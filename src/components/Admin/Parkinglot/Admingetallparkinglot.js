import React, { useEffect} from 'react'
import UpdateModal from './Updateparkinglot'
import AddModal from './Addparkinglot'
import {
    Link
} from "react-router-dom";
import { ParkingLotServiceClient } from '../../../api/ParkingLot_grpc_web_pb';
import ParkinglotProto from '../../../api/ParkingLot_pb';
import { API_URL } from '../../../saigonparking';
import Cookies from 'js-cookie';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import Pagination from "react-js-pagination";
import userMapper from '../../../mapper/UserMapper';
const ParkinglotwebService = new ParkingLotServiceClient(API_URL)



const Admingetallparkinglot = () => {

    //Pagination

    const [totalParkinglot, settotalParkinglot] = React.useState(0)
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
    function openModalAdd() {
        setIsAddOpen(true);
    }

    function closeModalAdd() {
        setIsAddOpen(false);
    }

    //value


    

   

    useEffect(() => {

      
            console.log("vao day")
            const request = new Empty();
            const token = 'Bearer ' + Cookies.get("token");
    
            const metadata = { 'Authorization': token }
    
            ParkinglotwebService.countAll(request, metadata, (err, res) => {
    
                if (err) {
                    console.log(err)
    
                } else {
    
                    settotalParkinglot(res.getValue())
                    // setNPage(Math.ceil(res.getValue() / 10))
    
    
                }
            })
        
    }, [pagenumber])

    useEffect(() => {

        
            const request = new ParkinglotProto.GetAllParkingLotRequest();
            const token = 'Bearer ' + Cookies.get("token");
    
            const metadata = { 'Authorization': token }
            request.setNrow(10);
            request.setPagenumber(pagenumber);
            ParkinglotwebService.getAllParkingLot(request, metadata, (err, res) => {
    
                if (err) {
                    console.log(err)
    
                } else {
    
                    setuser(res.getParkinglotList())
    
                }
            })
        
    }, [pagenumber])


    const handlechange = (e) => {
        setpagenumber(e)

    }

    return (
        <div className="card">

            <button onClick={openModalAdd} id="addnewlist" type="button" className="btn btn-success position-absolute" > Add a new List</button>
            <table className="table table-hover" style={{ marginTop: "50px" }}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">TYPE</th>
                        <th scope="col">LATITUDE</th>
                        <th scope="col">LONGITUDE </th>
                        <th scope="col">OPENING HOUR</th>
                        <th scope="col">CLOSING HOUR</th>
                        <th scope="col">AVAILABLESLOT</th>
                        <th scope="col">TOTAL SLOT</th>


                    </tr>
                </thead>
                <tbody>

                    {
                        users && users.map((user, index) =>
                            <tr key={index}>


                                <th scope="row" id="IDBIXOA">{user.getId()}</th>
                                <td>{user.getInformation().getName()}</td>
                                <td>{userMapper.toRoleString(user.getType())}</td>
                                <td>{user.getLatitude()}</td>
                                <td>{user.getLongitude()}</td>
                                <td>{user.getOpeninghour()}</td>
                                <td>{user.getClosinghour()}</td>
                                <td>{user.getAvailableslot()}</td>
                                <td>{user.getTotalslot()}</td>


                                <td>
                                    <Link className="btn btn-sm btn-primary" to="/login" ><i className="far fa-edit"></i> edit</Link>
                                    {/* <a id="btn-employee-delete" className="btn btn-sm btn-danger" ><i className="fas fa-trash-alt"></i> delete</a> */}
                                    <button onClick={() => {
                                        openModal()
                                        settmp(user)
                                    }
                                    }>Open Modal</button>
                                </td>
                                {tmp ? <UpdateModal modalIsOpen={modalIsOpen} closeModal={closeModal} parkinglot={tmp} /> : null}
                                <AddModal modalAddIsOpen={modalAddIsOpen} closeModalAdd={closeModalAdd} />

                            </tr>
                        )
                    }

                </tbody>

            </table>
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

    )
}


export default Admingetallparkinglot;