import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userActions';
import '../styles/FixedNavbar.css';
import logo from "../img/outcess-logo.png";


const FixedNavbar = ({ history, sidebarOpen, closeSidebar }) => {

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
              onClick={() => closeSidebar()} />
            </div>
            <div className="fixednavbar-menu">
              <Nav className="flex-column">
                <NavLink to='/home' exact className="nav-link" activeClassName='active-here'>
                  <i className="fas fa-tachometer-alt"></i>
                  Dashboard
                </NavLink>
                {
                  (userInfo.role === 'Agent') ? (
                    <NavLink to='/agentleave' exact className="nav-link" activeClassName='active-here'>
                      <i className="fas fa-sign-out-alt"></i>
                      Apply for Leave
                    </NavLink>
                  ) : (
                    <NavLink to='/myleave' exact className="nav-link" activeClassName='active-here'>
                      <i className="fas fa-sign-out-alt"></i>
                      Apply for Leave
                    </NavLink>
                  )
                }
                {
                  (userInfo.role === 'Team Lead') && (
                    <NavLink to='/myteamapplications' exact className="nav-link" activeClassName='active-here'>
                      <i className="fas fa-folder"></i>
                        Team Leave Applications
                    </NavLink>
                  )
                }
                {
                  (userInfo.role === 'Head Of Department') && (
                    <NavLink to='/mydepartmentapplications' exact className="nav-link" activeClassName='active-here'>
                      <i className="fas fa-folder"></i>
                        Department Applications
                    </NavLink>
                  )
                }
                {
                  (userInfo.role === 'Human Resource Executive' || userInfo.role === 'CEO' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources') && (
                  <>
                    <NavLink to='/allagentleaveapplications' exact className="nav-link" activeClassName='active-here'>
                      <i className="far fa-address-card"></i>
                      Agent Leave Applications
                    </NavLink>
                    <NavLink to='/leaveapplications' exact className="nav-link" activeClassName='active-here'>
                      <i className="fas fa-folder"></i>
                      All Leave Applications
                    </NavLink>
                    <NavLink to='/admin/userlist' exact className="nav-link" activeClassName='active-here'>
                      <i className="fas fa-users"></i>
                      All Employees
                    </NavLink>
                    <NavLink to='/admin/register' exact className="nav-link" activeClassName='active-here'>
                      <i className="fas fa-user-plus"></i>
                      Register Employee
                    </NavLink>
                  </>
                  )
                }
                <NavLink to='/supportservice'  className="nav-link" activeClassName='active-here'>
                  <i className="fas fa-comment-dots"></i>
                  Support Service
                </NavLink>
               {
                  (userInfo.role === 'Human Resource Executive' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources')&& (
                    <NavLink to='/allsupportservice' exact className="nav-link" activeClassName='active-here'>
                      <i className="fas fa-headset"></i>
                      All Support Service
                    </NavLink>
                  )
                }
                <NavLink to='/kpi/details'  className="nav-link" activeClassName='active-here'>
                  <i className="fas fa-chart-bar"></i>
                  KPI Details
                </NavLink>
                <NavLink to='/kpi/user'  className="nav-link" activeClassName='active-here'>
                  <i className="fas fa-chart-bar"></i>
                  KPI Assessment
                </NavLink>
                {
                  (userInfo.role === 'Head Of Department') && (
                    <NavLink to='/kpi/teamassessments'  className="nav-link" activeClassName='active-here'>
                      <i className="fas fa-chart-bar"></i>
                      Team KPI Assessments
                    </NavLink>
                  )
                }
                {
                  (userInfo.role === 'Human Resource Executive' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources') && (
                    <NavLink to='/kpi/allassessments'  className="nav-link" activeClassName='active-here'>
                      <i className="fas fa-chart-bar"></i>
                      All KPI Assessments
                    </NavLink>
                  )
                }
                {
                  (userInfo.role === 'Human Resource Executive' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources') && (
                    <NavLink to='/alljobapplication' exact className="nav-link" activeClassName='active-here'>
                      <i className="fas fa-vote-yea"></i>
                      Job Applications
                    </NavLink>
                  )
                }
              </Nav>
            </div>
        </div>
    </>
  );
}

export default FixedNavbar;
