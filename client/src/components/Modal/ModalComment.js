import React from 'react'
import Modal from 'react-modal';
import Landing from '../Landing'
import '../../css/modal.css';

import AuthApi from "../Auth/AuthAPI";
import Cookies from 'js-cookie'
import sessionstorage from 'sessionstorage'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import StarRatings from "react-star-ratings";
import ModalCommentcss from './ModalComment.module.css'

Modal.setAppElement(document.getElementById("root"));
const ModalComment = ({ modalCommentIsOpen, closeModalComment, myError, setmyError }) => {

    const [result, setresult] = React.useState({ rating: 0, comment: null, errorRating: -1 })

    const changeRating = (newRating, name) => {

        let Arating = newRating;
        if (newRating === 1) Arating = 1;
        if (newRating === result.rating) Arating -= 1;
        setresult({ rating: Arating, comment: result.comment, errorRating: 0 });
    };
    const Auth = React.useContext(AuthApi)
    const ClickLogOut = () => {
        Auth.setAuth(false)
        Auth.setforgetpass(false)
        Auth.setcheckUserName(null)
        Cookies.remove("checkUserName");
        Cookies.remove("token");
        Cookies.remove("isAdmin");
        Cookies.remove("refreshtoken");

        sessionstorage.clear();
    }
    const formik = useFormik({
        initialValues: {
            userName: '',


        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .max(255, 'Must be 15 characters or less'),



        }),
        onSubmit: values => {

            if (result.rating === 0) {

                setresult({ rating: result.rating, comment: result.comment, errorRating: 1 });
            }
            else {

            }


        },
    });


    return (
        <Modal
            isOpen={modalCommentIsOpen}

            onRequestClose={() => {
                closeModalComment()



            }}

            contentLabel="Example Modal"
            className="modal-content"
            overlayClassName="modal-overlay"

        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={closeModalComment} className={`${ModalCommentcss.buttonback} `}>X</button>
                <h1 style={{ margin: "5%" }}>COMMENT RATING</h1>
            </div>


            <StarRatings
                rating={result.rating}
                starRatedColor="red"
                starDimension="40px"
                starSpacing="15px"
                changeRating={changeRating}
                numberOfStars={5}
                name="rating"

            />
            {(result.rating === 0 && result.errorRating === 1) ? (
                <div style={{ marginTop: "10%", color: "#ef4300" }} >vui lòng đánh bãi xe</div>
            ) : null}
            <form onSubmit={formik.handleSubmit}>


                <input
                    id="userName"
                    name="userName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}

                />
                <h6>{formik.values.userName.length}/255</h6>

                {formik.touched.userName && formik.errors.userName ? (
                    <div style={{ marginTop: "10%", color: "#ef4300" }} >{formik.errors.userName}</div>
                ) : null}

                <div style={{ marginTop: "5%" }}>
                    <button style={{ marginTop: "5%" }} type="submit" >Submit</button>

                </div>

            </form>
            <button onClick={() => {
                closeModalComment()



            }}>HỦY</button>


        </Modal>

    )




}
export default ModalComment;

