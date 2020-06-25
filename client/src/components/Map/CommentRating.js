import React, { useEffect } from 'react';
import Card from "react-bootstrap/Card";
//default images
import defaultimageparkinglot from './images/plot.jpg'



import { API_URL } from '../../saigonparking';

import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb'
import Cookies from 'js-cookie'
//star
import StarRatings from "react-star-ratings";
//modal Error
import exceptionHandler from '../../ExceptionHandling'
//modal Error
import ModalError from '../Modal/ModalError'
//
//React Context ConTextMap SetClick
import SetClick from './ConTextMap/SetClick'
//
// bắt lỗi error0001 cấp accesctoken mới
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { AuthServiceClient } from '../../api/Auth_grpc_web_pb';
import sessionstorage from 'sessionstorage'
/// load comment
import InfiniteScroll from "react-infinite-scroll-component";
import { UserServiceClient } from '../../api/Actor_grpc_web_pb';
import ActorProto from '../../api/Actor_pb';


import userMapper from '../../mapper/UserMapper';
//
const authService = new AuthServiceClient(API_URL)

const UserService = new UserServiceClient(API_URL)



const CommentRating = ({ id }) => {
    // check Switch ListPa and PatientInfo FALSE LIST  | TRUE LA PATIENTINFOR
    const abc = React.useContext(SetClick)
    // các phần tử của comment và total
    const [total, settotal] = React.useState({ items: [], pagenumber: 1 })
    const [countall, setcountall] = React.useState(0)

    //config Modal Error
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null)
    function openModalError() {

        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }
    //
    //xử lý lỗi error0001 cấp accestoken mới
    const [flat, setflat] = React.useState(false)
    const xulyerrorSPE00001 = () => {
        const refreshtoken = Cookies.get('refreshtoken')
        const token = 'Bearer ' + refreshtoken;
        const metadata = { 'Authorization': token }
        const request = new Empty()

        authService.generateNewToken(request, metadata, (err, res) => {
            if (err) {
                if (err.message === 'SPE#00001') {
                    Cookies.remove("checkUserName");
                    Cookies.remove("token");

                    Cookies.remove("refreshtoken");

                    sessionstorage.clear()
                }


            } else {

                if (res.getRefreshtoken() === '') {
                    /** luu access token */
                    Cookies.set("token", res.getAccesstoken())
                    console.log("accesstoken mới")
                    setflat(!flat)

                } else {
                    /** luu new access token + new refresh token */
                    Cookies.set("token", res.getAccesstoken())
                    Cookies.set("refreshtoken", res.getRefreshtoken())
                    console.log("refreshtoken + accesstoken mới")
                    setflat(!flat)
                }


            }
        })

    }

    //load số tổng


    useEffect(() => {
        //countAll
        const request = new Empty();
        const token = 'Bearer ' + Cookies.get("token");

        const metadata = { 'Authorization': token }

        UserService.countAll(request, metadata, (err, res) => {

            if (err) {
                if (err.message === 'SPE#00001') {
                    xulyerrorSPE00001()
                }
                else {
                    setmyError(err.message)
                    openModalError()
                }

            } else {

                setcountall(res.getValue())
                // setNPage(Math.ceil(res.getValue() / 10))


            }
        })

    }, [id, flat])
    // load mảng
    useEffect(() => {
        const request = new ActorProto.GetAllUserRequest();
        const token = 'Bearer ' + Cookies.get("token");

        const metadata = { 'Authorization': token }
        request.setNrow(10);
        request.setPagenumber(total.pagenumber);
        UserService.getAllUser(request, metadata, (err, res) => {

            if (err) {
                if (err.message === 'SPE#00001') {
                    xulyerrorSPE00001()
                }
                else {
                    setmyError(err.message)
                    openModalError()
                }

            } else {

                settotal({ items: total.items.concat(res.getUserList()), pagenumber: total.pagenumber + 1 })

            }
        })

    }, [id, flat])
    const fetchMoreData = () => {

        setflat(!flat)
    }
    const style = {
        height: 30,
        border: "1px solid green",
        margin: 6,
        padding: 8
    };

    return (
        <div>
            {modalErrorIsOpen ? <ModalError modalErrorIsOpen={modalErrorIsOpen} closeModalError={closeModalError} myError={myError} setmyError={setmyError} /> : null}

            <h1>BÌNH LUẬN ĐÁNH GIÁ</h1>


            <hr />
            {total ? <button onClick={() => { abc.setswitchLP({ LiPa: true, BinhLuan: false }) }}>QUAY LAI</button> : null}
            <div id="scrollableDiv" style={{ height: 300, overflow: "auto" }}>
                <InfiniteScroll
                    dataLength={total.items.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    {total && total.items.map((i, index) => (
                        <div style={style} key={index}>
                            ID:{i.getId()} - Name: {i.getUsername()}
                        </div>
                    ))}

                </InfiniteScroll>
            </div>
        </div>)
};

export default CommentRating;