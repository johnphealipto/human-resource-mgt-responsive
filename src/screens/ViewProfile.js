import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions';
import avatar from "../img/avatar.png";
import "../styles/Main.css";
import '../styles/ProfileScreen.css';
import Header from '../components/Header';
import FixedNavbar from '../components/FixedNavbar';

const ViewProfile = ({ history }) => {
   

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails

    useEffect(() => {

        if(!userInfo) {
            history.push('/')
        } else {
            dispatch(getUserDetails('me'))
        }
    }, [dispatch, history, user, userInfo])


    // ---- For the FixedNavBar
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const openSidebar = () => {
      setSidebarOpen(true);
    };
    
    const closeSidebar = () => {
      setSidebarOpen(false);
    };


  return (
    <div className="dashboard-container">
        <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <FixedNavbar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <main>
            <div className="dashboard-body">
                <div className='page-header'>
                <h3>Dashboard</h3>
                <p>{userInfo.firstname} {userInfo.lastname}'s Profile</p>
                </div>
                {/* key={user.id} */}
            <div className="form-shadow viewprofile-container">
            <Row className='viewprofile-row'>
              <Col md={3}>
                <div className='account-user'>
                  <img src={avatar} alt='Account User' />
                </div>
              </Col>
              <Col md={9}>
                <div className='viewprofile-details'>
                  <div className='viewprofile-details-header'>
                    <h3>{userInfo.lastname}, {userInfo.firstname} {userInfo.middlename}</h3>
                    <p>Employee ID: <span>{userInfo.employeeCode}</span></p>
                  </div>
                  <div className='viewprofile-details-body'>
                    <p className='viewprofile-details-body-header'>Personal Information</p>
                    <div className='viewprofile-details-row-container'>
                      <Row className='viewprofile-details-row'>
                        <Col xs={12} md={4}>
                          <p className='viewprofile-details-title'>First Name</p>
                          <p className='viewprofile-details-content'>{userInfo.firstname}</p>
                        </Col>
                        <Col xs={12} md={4}>
                          <p className='viewprofile-details-title'>Middle Name</p>
                          <p className='viewprofile-details-content'>{userInfo.middlename}</p>
                        </Col>
                        <Col xs={12} md={4}>
                          <p className='viewprofile-details-title'>Last Name</p>
                          <p className='viewprofile-details-content'>{userInfo.lastname}</p>
                        </Col>
                      </Row>
                      <Row className='viewprofile-details-row'>
                        <Col xs={12} md={4}>
                          <p className='viewprofile-details-title'>Email Address</p>
                          <p className='viewprofile-details-content'>{userInfo.email}</p>
                        </Col>
                        <Col xs={12} md={4}>
                          <p className='viewprofile-details-title'>Employee ID</p>
                          <p className='viewprofile-details-content'>{userInfo.employeeCode}</p>
                        </Col>
                        <Col xs={12} md={4}>
                          <p className='viewprofile-details-title'>Department</p>
                          <p className='viewprofile-details-content'>{userInfo.department}</p>
                        </Col>
                      </Row>
                      <Row className='viewprofile-details-row'>
                        <Col xs={12} md={4}>
                          <p className='viewprofile-details-title'>Role</p>
                          <p className='viewprofile-details-content'>{userInfo.role}</p>
                        </Col>
                        <Col>
                          <p className='viewprofile-details-title'>Date Joined</p>
                          <p className='viewprofile-details-content'>{moment(userInfo.dateOfJoining).format("DD-MM-YYYY")}</p>
                        </Col>
                        <Col xs={12} md={4}>
                          <p className='viewprofile-details-title'>Leave Balance</p>
                          <p className='viewprofile-details-content'>{userInfo.leaveDays} Days</p>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            </div>
            </div>
        </main>
        {/* <div key={user.id} className="form-shadow dashboard-container"> */}
        {/* {userInfo && (
          <NavLink to='/dashboard'style={{ textDecoration: 'none' }}>
            <Button type='submit' variant='primary' className='btn btn-block'>
              <i className='fas fa-edit'></i> Edit
            </Button>
          </NavLink>
        )} */}
    </div>
  )
}

export default ViewProfile;