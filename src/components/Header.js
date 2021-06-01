import React, { useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Nav} from 'react-bootstrap'
import { logout } from '../actions/userActions';
import '../styles/FixedNavbar.css';
import '../styles/Header.css';
import avatar from "../img/avatar.png";

const Header = ({ history, openSidebar }) => {
    const [dropDown, setDropDown] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {  userInfo } = userLogin


    const logoutHandler = () => {
        dispatch(logout())
        
    }

    return (
        <>
            <nav 
                className="navbar"
                onMouseLeave={() => setDropDown(false)}>
                <div className="nav-icon" onClick={() => openSidebar()}>
                    <i className="fa fa-bars"></i>
                </div>
                <div className="navbar-left">
                    <span>{userInfo.role}</span>
                    <span>{userInfo.email}</span>
                </div>
                <div className="navbar-right">
                    <div 
                        onClick={() => setDropDown(!dropDown)}
                        onMouseEnter={() => setDropDown(true)}>
                        <img width="35" src={avatar} alt="avatar" />
                        <span className='pl-2'>
                            {userInfo.firstname} {userInfo.lastname} 
                            <i className="fas fa-chevron-down pl-2"></i>
                        </span>
                    </div>
                    {dropDown ? (
                        <div className="dropdown">
                            <Nav className="flex-column">
                                <NavLink to='/viewprofile'>
                                    <i className="far fa-id-card pr-2"></i>
                                    View Profile
                                </NavLink>

                                <NavLink to='/updateprofile'>
                                    <i className="fas fa-cog pr-2"></i>
                                    Update Profile
                                </NavLink>

                                <NavLink to='/changepassword'>
                                    <i className="fas fa-unlock-alt pr-2"></i>
                                    Change Password
                                </NavLink>

                                <NavLink to='/' className="drop-logout" onClick={logoutHandler}>
                                    <i className="fas fa-power-off pr-2"></i>
                                    Logout
                                </NavLink>
                            </Nav>
                        </div>
                    ) : ("")}
                </div>
            </nav>
        </>
    )
}

export default Header;