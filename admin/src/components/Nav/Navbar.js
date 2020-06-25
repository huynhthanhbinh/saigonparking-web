import React from 'react'
import AuthApi from "../Auth/AuthAPI";
import { ReactComponent as IconSetting } from '../Admin/svg/setting-icon.svg';
import { ReactComponent as UserListSetting } from '../Admin/svg/users-cog-icon.svg';
import { ReactComponent as ArrowRight } from '../Admin/svg/arrow-right.svg';
import { ReactComponent as PackingIcon } from '../Admin/svg/parking-icon.svg';
import { ReactComponent as SingOutIcon } from '../Admin/svg/sign-out-icon.svg';
import { ReactComponent as ProfileIcon } from '../Admin/svg/profile-icon.svg';
import { ReactComponent as DashboardIcon } from '../Admin/svg/dashboard-icon.svg';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import sessionstorage from 'sessionstorage'
import { NavLink  } from 'react-router-dom'

const Navbardefault = () => {
    let Auth = React.useContext(AuthApi)
    
    const ClickLogOut = () => {
        Auth.setAuth(false)
        Auth.setcheckUserName(null)
        Cookies.remove("checkUserName");
        Cookies.remove("token");
        Cookies.remove("refreshtoken");
        sessionstorage.clear();
        Redirect('/login')
    }
    
    return (
        <>
            {Auth.auth ?
                <nav className="navbarx">
                    <ul className="navbar-nav">
                        <li className="nav-logo">
                            <NavLink exact to='/' className="nav-link">
                                <span className="link-text">SG-PARKING</span>
                                <ArrowRight />
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact activeClassName='is-active' to='/' className="nav-link">
                                <DashboardIcon />
                                <span className="link-text">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact activeClassName='is-active' to='/getalluser' className="nav-link">
                                <UserListSetting />
                                <span className="link-text">User Manager</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact activeClassName='is-active' to="/getallparkinglot" className="nav-link">
                                <PackingIcon />
                                <span className="link-text">Parking Manager</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact activeClassName='is-active' to="/profile"className="nav-link">
                                <ProfileIcon />
                                <span className="link-text">Profile</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact activeClassName='is-active' to="/404" className="nav-link">
                                <IconSetting />
                                <span className="link-text">Setting</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/login' onClick={ClickLogOut} className="nav-link">
                                <SingOutIcon />
                                <span className="link-text">Sign Out</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                : <></>
            }
        </>

    )
}

export default Navbardefault