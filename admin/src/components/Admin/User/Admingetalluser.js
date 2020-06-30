import React, { useEffect } from "react";
//modal
import UpdateModal from "./Updateuser";
import AddModal from "./Adduser";
import { Button } from 'semantic-ui-react'
//modal Error
import ModalError from "../../Modal/ModalError";
//css
import stylesLoading from "../Loading.module.css";
//css pagination
import "../../../css/pagination.css";
//css table
import '../../../css/table.css'
//Api
import { UserServiceClient } from "../../../api/Actor_grpc_web_pb";
import ActorProto from "../../../api/Actor_pb";
import { API_URL } from "../../../saigonparking";
import { AuthServiceClient } from "../../../api/Auth_grpc_web_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { Int64Value } from "google-protobuf/google/protobuf/wrappers_pb";
import userMapper from "../../../mapper/UserMapper";

import Pagination from "react-js-pagination";
import Cookies from "js-cookie";

const authService = new AuthServiceClient(API_URL)
const UserService = new UserServiceClient(API_URL);

const Admingetalluser = () => {
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
    const [isLoading, setIsLoading] = React.useState(true);

    //Pagination
    const [totalUser, settotalUser] = React.useState(0);
    const [pagenumber, setpagenumber] = React.useState(1);

    // const [setNPage] = React.useState(0)
    const [users, setuser] = React.useState(null);
    const [tmp, settmp] = React.useState(null);

    //Loading in button
    const [loadingButton, setLoadingButton] = React.useState(false)

    //config Update modal
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setLoadingButton(false)
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
    const [myError, setmyError] = React.useState(null);
    function openModalError() {
        setmodalErrorIsOpen(true);
    }
    function closeModalError() {
        setmodalErrorIsOpen(false);
    }

    //value
    //ACTIVE INACTIVE
    const [isActive, setisActive] = React.useState(false);
    const callactivateUser = async (id) => {
        const request = new Int64Value();
        const token = "Bearer " + Cookies.get("token");
        const metadata = { Authorization: token };
        request.setValue(id);

        UserService.activateUser(request, metadata, (err, res) => {
            if (err) {
                // console.log(err)
            } else {
                setisActive(!isActive);
                setLoadingButton(false)
            }
        });
    };

    const calldeactivateUser = async (id) => {
        const request = new Int64Value();
        const token = "Bearer " + Cookies.get("token");
        request.setValue(id);
        const metadata = { Authorization: token };
        UserService.deactivateUser(request, metadata, (err, res) => {
            if (err) {
                // console.log(err)
            } else {
                setisActive(!isActive);
                setLoadingButton(false)
            }
        });
    };

    useEffect(() => {
        //solved memory leak
        let isMounted = false;
        //countAll
        const request = new ActorProto.CountAllUserRequest();
        // request.setKeyword()
        const token = "Bearer " + Cookies.get("token");
        const metadata = { 'Authorization': token };
        UserService.countAllUser(request, metadata, (err, res) => {
            if (err && !isMounted) {
                console.log(err)
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
                // setNPage(Math.ceil(res.getValue() / 10))
            }
        });

        return () => {
            isMounted = true;
        };
    }, [pagenumber, flat, ErrorSPE00001]);

    useEffect(() => {
        //solved memory leak
        let isMounted = false;
        //getAllUser
        const request = new ActorProto.GetAllUserRequest();
        const token = "Bearer " + Cookies.get("token");
        const metadata = { 'Authorization': token };
        request.setNrow(10);
        request.setPagenumber(pagenumber);
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
                    setuser(res.getUserList());
                    setIsLoading(false);
                }
            }
        });
        return () => {
            isMounted = true;
        };
    }, [pagenumber, isActive, flat, ErrorSPE00001]);

    const handlechange = (e) => {
        setpagenumber(e);
        if (pagenumber !== e) setIsLoading(true);
    };

    return (
        <div>
            {isLoading ? (
                <>
                    {modalErrorIsOpen ? (<ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} />) : null}
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
            ) : (
                    <div>
                        <div className="MainCard">
                            <div className='ContentMainCard'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th width="10%" scope="col">ID</th>
                                            <th width="10%" scope="col">ROLE</th>
                                            <th width="10%" scope="col">USERNAME</th>
                                            <th width="30%" scope="col">EMAIL </th>
                                            <th width="20%" scope="col">LASTSIGNIN</th>
                                            <th width="20%" scope="col">CONTROL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users && users.map((user, index) => (
                                            <tr key={index}>
                                                <td id="IDBIXOA"> {user.getId()}</td>
                                                <td>{userMapper.toRoleString(user.getRole())}</td>
                                                <td>{user.getUsername()}</td>
                                                <td>{user.getEmail()}</td>
                                                <td>{user.getLastsignin()}</td>
                                                <td>
                                                    <Button.Group size='mini'>
                                                        <Button
                                                            color={user.getIsactivated() === true ? 'green' : 'red'}
                                                            loading={loadingButton}
                                                            disabled={user.getUsername() === 'admin' ? true : loadingButton}
                                                            className="buttonparkinglotuser"
                                                            onClick={() => {
                                                                setLoadingButton(true);
                                                                if (user.getIsactivated() === true) {
                                                                    calldeactivateUser(user.getId());
                                                                } else {
                                                                    callactivateUser(user.getId());
                                                                }
                                                            }}
                                                        >
                                                            {" "}
                                                            {user.getIsactivated() === true
                                                                ? "Activated"
                                                                : "Inactivated"}
                                                        </Button>
                                                        <Button.Or text='|' />
                                                        {/* <button id="btn-employee-delete" className="btn btn-sm btn-danger" > delete</button> */}
                                                        <Button
                                                            loading={loadingButton} disabled={loadingButton}
                                                            primary
                                                            className="buttonparkinglotuser"
                                                            onClick={() => {
                                                                setLoadingButton(true);
                                                                settmp(user);
                                                                openModal();
                                                            }}
                                                        >
                                                            Detail
                                                </Button>
                                                    </Button.Group>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {tmp ? (
                            <UpdateModal
                                modalIsOpen={modalIsOpen}
                                closeModal={closeModal}
                                user={tmp}
                            />
                        ) : null}
                        <AddModal
                            modalAddIsOpen={modalAddIsOpen}
                            closeModalAdd={closeModalAdd}
                        />
                        {totalUser ? (
                            <Pagination
                                pageRangeDisplayed={10}
                                activePage={pagenumber}
                                itemsCountPerPage={10}
                                totalItemsCount={totalUser}
                                onChange={handlechange}
                            />
                        ) : null}
                    </div>
                )}
        </div>
    );
};

export default Admingetalluser;
