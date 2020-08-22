import React from 'react'
import { Redirect } from "react-router-dom";
import Cookies from 'js-cookie'
let username = Cookies.get("checkUserName");
const ActivateAccount = () => {
    const [nextpage, setnextpage] = React.useState(false)

    if (nextpage === true) {
        return (<Redirect to="/profile" />)
    }
    return (
        <>
            <h1> Chúc mừng  {username} đã kích hoạt thành công </h1>
            <button onClick={() => {
                setnextpage(true)
            }}>TRỞ LẠI TRANG THÔNG TIN</button>
        </>
    )
}

export default ActivateAccount
