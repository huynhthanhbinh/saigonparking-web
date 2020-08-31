import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import { ProgressBar } from 'react-bootstrap';

import { API_URL } from '../../saigonparking';

import { Int64Value } from 'google-protobuf/google/protobuf/wrappers_pb';
import Cookies from 'js-cookie';
//star
import StarRatings from 'react-star-ratings';
//modal Error
import ModalError from '../Modal/ModalError';
//
//
import ModalComment from '../Modal/ModalComment';
//
//React Context ConTextMap SetClick
import SetClick from './ConTextMap/SetClick';
//
// bắt lỗi error0001 cấp accesctoken mới
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { AuthServiceClient } from '../../api/Auth_grpc_web_pb';
/// load comment
import InfiniteScroll from 'react-infinite-scroll-component';
import { BookingServiceClient } from '../../api/Booking_grpc_web_pb';
import BookingProto from '../../api/Booking_pb';
import backbutton from './icon/leftarrow.png';
//animation loading screen
import { BoxLoading } from 'react-loadingg';
//
// Import Css
import stylescrollview from '../../css/scrollpath.module.css';

const authService = new AuthServiceClient(API_URL);

const BookingService = new BookingServiceClient(API_URL);

const CommentRating = ({ id }) => {
    // check Switch ListPa and PatientInfo FALSE LIST  | TRUE LA PATIENTINFOR
    const abc = React.useContext(SetClick);
    // các phần tử của comment và total
    const [total, settotal] = React.useState({ items: [], pagenumber: 1 });
    const [ratingcountmap, setratingcountmap] = React.useState([]);
    const [countall, setcountall] = React.useState(0);
    const [loadingscreen, setloadingscreen] = React.useState(true);
    //config Modal Error
    const [modalErrorIsOpen, setmodalErrorIsOpen] = React.useState(false);
    const [myError, setmyError] = React.useState(null);
    function openModalError() {
        setmodalErrorIsOpen(true);
    }

    function closeModalError() {
        setmodalErrorIsOpen(false);
    }
    //
    //config Modal Comment
    const [modalCommentIsOpen, setmodalCommentIsOpen] = React.useState(false);
    // const [myError, setmyError] = React.useState(null)

    function closeModalComment() {
        setmodalCommentIsOpen(false);
    }
    //
    //xử lý lỗi error0001 cấp accestoken mới
    const [flat, setflat] = React.useState(false);
    const xulyerrorSPE00001 = () => {
        const refreshtoken = Cookies.get('refreshtoken');
        const token = 'Bearer ' + refreshtoken;
        const metadata = { Authorization: token };
        const request = new Empty();
        authService.generateNewToken(request, metadata, (err, res) => {
            if (err) {
                setmyError(err.message);
                openModalError();
            } else {
                if (res.getRefreshtoken() === '') {
                    /** luu access token */
                    Cookies.set('token', res.getAccesstoken());
                    console.log('accesstoken mới');
                    setflat(!flat);
                } else {
                    /** luu new access token + new refresh token */
                    Cookies.set('token', res.getAccesstoken());
                    Cookies.set('refreshtoken', res.getRefreshtoken());
                    console.log('accesstoken mới');
                    setflat(!flat);
                }
            }
        });
    };
    //load số tổng

    useEffect(
        () => {
            //countAll
            let unmount = false;
            if (unmount === false) {
                const request = new BookingProto.CountAllRatingsOfParkingLotRequest();
                const token = 'Bearer ' + Cookies.get('token');
                const metadata = { Authorization: token };
                request.setParkinglotid(id);
                BookingService.countAllRatingsOfParkingLot(request, metadata, (err, res) => {
                    if (err) {
                        if (err.message === 'SPE#00001') {
                            xulyerrorSPE00001();
                        } else {
                            setmyError(err.message);
                            openModalError();
                        }
                    } else {
                        setcountall(res.getValue());
                        // setNPage(Math.ceil(res.getValue() / 10))
                    }
                });
            }
            return () => {
                unmount = true;
            };
        },
        // eslint-disable-next-line
        [id, flat]
    );
    //load rating
    useEffect(
        () => {
            //get Rating all
            let unmount = false;
            if (unmount === false) {
                const request = new Int64Value();
                const token = 'Bearer ' + Cookies.get('token');
                const metadata = { Authorization: token };
                request.setValue(id);
                BookingService.getParkingLotRatingCountGroupByRating(request, metadata, (err, res) => {
                    if (err) {
                        if (err.message === 'SPE#00001') {
                            xulyerrorSPE00001();
                        } else {
                            setmyError(err.message);
                            openModalError();
                        }
                    } else {
                        setratingcountmap(res.getRatingcountMap().getEntryList());
                    }
                });
            }
            return () => {
                unmount = true;
            };
        },
        // eslint-disable-next-line
        [id, flat]
    );
    // load mảng
    useEffect(
        () => {
            let unmount = false;
            if (unmount === false) {
                const request = new BookingProto.GetAllRatingsOfParkingLotRequest();
                const token = 'Bearer ' + Cookies.get('token');
                const metadata = { Authorization: token };
                request.setParkinglotid(id);
                request.setNrow(10);
                request.setPagenumber(total.pagenumber);
                BookingService.getAllRatingsOfParkingLot(request, metadata, (err, res) => {
                    if (err) {
                        if (err.message === 'SPE#00001') {
                            xulyerrorSPE00001();
                        } else {
                            setmyError(err.message);
                            openModalError();
                        }
                    } else {
                        settotal({ items: total.items.concat(res.getRatingList()), pagenumber: total.pagenumber + 1 });
                        setloadingscreen(false);
                    }
                });
            }
            return () => {
                unmount = true;
            };
        },
        // eslint-disable-next-line
        [id, flat]
    );

    const getMoreData = () => {
        if (total.items.length !== countall) {
            setflat(!flat);
        }
    };

    if (countall === 0 && loadingscreen === false) {
        return (
            <div>
                <h1>HIỆN BÃI XE NÀY CHƯA CÓ ĐÁNH GIÁ</h1>
                {/* <button className={`${stylescrollview.button} `} onClick={openModalComment} >THÊM NHẬN XÉT</button> */}
                <button
                    onClick={() => {
                        abc.setswitchLP({ LiPa: true, BinhLuan: false });
                    }}
                >
                    QUAY LAI
				</button>
            </div>
        );
        // return <BoxLoading color={"rgb(52, 116, 116)"} />
    } else if (total.items.length === 0) {
        return <BoxLoading color={'rgb(52, 116, 116)'} />;
    } else if (total.items.length !== 0) {
        return (
            <div style={{ overflowY: 'auto' }}>
                {modalErrorIsOpen ? (
                    <ModalError
                        modalErrorIsOpen={modalErrorIsOpen}
                        closeModalError={closeModalError}
                        myError={myError}
                        setmyError={setmyError}
                    />
                ) : null}
                {modalCommentIsOpen ? (
                    <ModalComment
                        modalCommentIsOpen={modalCommentIsOpen}
                        closeModalComment={closeModalComment}
                        myError={myError}
                        setmyError={setmyError}
                    />
                ) : null}
                <span
                    role="button"
                    tabIndex="0"
                    onClick={() => {
                        abc.setswitchLP({ LiPa: true, BinhLuan: false });
                    }}
                >
                    <img alt='' src={backbutton} />
                </span>
                <h1>BÌNH LUẬN ĐÁNH GIÁ</h1>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ margin: '5%' }}>
                        {total.items.length}/{countall}
                    </h4>
                </div>
                <div>
                    {ratingcountmap &&
                        ratingcountmap.map((value, index) => (
                            <div key={index} style={{ padding: '5px' }}>
                                {index + 1} sao
                                <ProgressBar
                                    now={value[1] / countall * 100}
                                    label={`${value[1]}`}
                                />
                            </div>
                        ))}
                </div>
                <div
                    id="scrollableDiv"
                    className={`${stylescrollview.scrollpage} `}
                    style={{
                        height: '40vh',
                        overflow: 'auto'
                    }}
                >
                    <InfiniteScroll
                        style={{ padding: '10px' }}
                        dataLength={total.items.length}
                        next={getMoreData}
                        hasMore={total.items.length < countall}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="scrollableDiv"
                    >
                        {total &&
                            total.items.map((i, index) => (
                                <>
                                    <div className={`${stylescrollview.ListViewRow}`} key={index + 'Div1'}>
                                        <Col xd="6">
                                            <div>{i.getUsername()}</div>
                                        </Col>
                                        <Col xd="6">
                                            <div>
                                                <StarRatings
                                                    rating={i.getRating()}
                                                    starRatedColor="rgb(56,112,112)"
                                                    starDimension="20px"
                                                    starSpacing="2px"
                                                    numberOfStars={5}
                                                    name="rating"
                                                />
                                            </div>
                                        </Col>
                                    </div>
                                    <div className={`${stylescrollview.ListViewRow}`} key={index + 'Div2'}>
                                        <Col xd="6">
                                            <div>{i.getComment()}</div>
                                        </Col>
                                        <Col xd="6">
                                            <div>{i.getLastupdated()}</div>
                                        </Col>
                                    </div>
                                </>
                            ))}
                    </InfiniteScroll>
                </div>
            </div >
        );
    }
};

export default CommentRating;
