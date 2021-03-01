import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userActions';
import '../styles/FixedNavbar.css';


const FixedNavbar = ({ history }) => {

   
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
    <div className="fixednavbar-wrapper">
      <div className='employee-details'>
        <p>{userInfo.role}</p>
        <p>{userInfo.email}</p>
      </div>

      <Nav className="flex-column">
        <NavLink to='/home' exact className="nav-link" activeClassName='active-here'>
          <i class="fas fa-home pr-4"></i>
          Home
        </NavLink>
        <NavLink to='/dashboard' exact className="nav-link" activeClassName='active-here'>
          <i class="far fa-id-card pr-4"></i>
          Personal details
        </NavLink>
        <NavLink to='/profile' exact className="nav-link" activeClassName='active-here'>
          <i class="fas fa-user-circle pr-4"></i>
          Profile
        </NavLink>
        <NavLink to='/nextofkin' exact className="nav-link" activeClassName='active-here'>
          <i class="fas fa-user-friends pr-4"></i>
          Next of Kin
        </NavLink>
        <NavLink to='/education' exact className="nav-link" activeClassName='active-here'>
          <i class="fas fa-graduation-cap pr-4"></i>
          Education
        </NavLink>
        <NavLink to='/myleave' exact className="nav-link" activeClassName='active-here'>
        <i class="fas fa-paper-plane pr-4"></i>
          My Leave
        </NavLink>

        {
          (userInfo.role === 'hr' || userInfo.role === 'hr-manager' || userInfo.role === 'admin') && (
        <>
          <NavLink to='/leaveapplications' exact className="nav-link" activeClassName='active-here'>
            <i class="fas fa-folder-open pr-4"></i>
            Leave Applications
          </NavLink>
          <NavLink to='/admin/userlist' exact className="nav-link" activeClassName='active-here'>
            <i class="fas fa-users pr-4"></i>
            All Employees
          </NavLink>
          <NavLink to='/admin/register' exact className="nav-link" activeClassName='active-here'>
            <i class="fas fa-user-plus pr-4"></i>
            Register Employee
          </NavLink>
        </>
        )
        }

        {/* <div className='fixednavbar-logout'>
          <NavLink to='/' exact className="nav-link" activeClassName='active-here'>
            <i class="fas fa-sign-out-alt pr-4"></i>
            Logout
          </NavLink>
        </div> */}
      </Nav>
    </div>
  );
}

export default FixedNavbar;
