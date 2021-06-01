import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, logout } from '../actions/userActions';
import '../styles/FixedNavbar.css';
import logo from "../img/outcess-logo.png";


const AdminFixedNavbar = ({ history, userId, sidebarOpen, closeSidebar }) => {
   
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector(state => state.userDetails)
  const { user } = userDetails

  useEffect(() => {

    if(!userInfo) {
      history.push('/')
    } 
    else {
      dispatch(getUserDetails('me'))
    }
  }, [dispatch, history, user, userInfo])

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
        <>
          <div className={sidebarOpen ? "fixednavbar-responsive" : ""} id="sidebar">
            <div className="fixednavbar-title">
                <div className="fixednavbar-img">
                    <img src={logo} alt="logo" />
                </div>
                <i
                className="fa fa-times"
                id="sidebarIcon"
                onClick={() => closeSidebar()}
                ></i>
            </div>
            <div className="fixednavbar-menu">
            <Nav className="flex-column">
                <NavLink to='/admin/userlist' exact className="nav-link" activeClassName='active-here'>
                <i className="fas fa-home"></i>
                All Employees
                </NavLink>
                <NavLink to={`/admin/user/${userId}/edit`} exact className="nav-link" activeClassName='active-here'>
                <i className="far fa-id-card"></i>
                Details
                </NavLink>
                <NavLink to={`/admin/profile/${userId}/edit`} exact className="nav-link" activeClassName='active-here'>
                <i className="fas fa-user-circle"></i>
                Profile
                </NavLink>
                <NavLink to={`/admin/education/${userId}/edit`} exact className="nav-link" activeClassName='active-here'>
                <i className="fas fa-graduation-cap"></i>
                Education
                </NavLink>
                <NavLink to={`/admin/nextofkin/${userId}/edit`} exact className="nav-link" activeClassName='active-here'>
                <i className="fas fa-user-friends"></i>
                Employee Next Of Kin
                </NavLink>
                <NavLink to={`/admin/password/${userId}/edit`} exact className="nav-link" activeClassName='active-here'>
                <i className="fas fa-id-card"></i>
                Reset Password
                </NavLink>
            </Nav>
            </div>
        </div>
    </>
  );
}

export default AdminFixedNavbar;
