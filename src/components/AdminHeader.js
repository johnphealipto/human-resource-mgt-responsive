import React from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom'
import Logo from '../img/outcess-logo-new.png'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { logout } from '../actions/userActions';
import '../styles/FixedNavbar.css';

const AdminHeader = ({ history, userId }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {  userInfo } = userLogin


    const logoutHandler = () => {
        dispatch(logout())
        
    }

    
    return (
        <header>
            {/* <div className='lg-header d-none d-md-block'>
            <Navbar>
                
                    <LinkContainer to='/'>
                        <Navbar.Brand id="logo-anchor">
                        <img id ="nav-bar-logo"src={Logo} alt="Outcess Logo" />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Collapse >
                   
                    <div className='logout'>
                        
                        {userInfo ? (
                            <>
                            <LinkContainer to='/'>
                            <Nav.Link onClick={logoutHandler} className='logout'>Logout</Nav.Link>
                            </LinkContainer>
                            
                            
                        
                            </>
                        ) : (
                            <LinkContainer to='/'>
                                <Nav.Link><i className='fas fa-user'></i> Forgot password</Nav.Link>
                            </LinkContainer>
                        )}
                    </div>
                    </Navbar.Collapse>
            </Navbar>
            </div> */}

            <div className='xs-header d-block d-md-none'>
                <Navbar expand="lg">
                <LinkContainer to='/'>
                        <Navbar.Brand id="logo-anchor">
                        <img id ="nav-bar-logo"src={Logo} alt="Outcess Logo" />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to='/admin/userlist' exact className="nav-link" activeClassName='active-here'>
                                <i class="fas fa-home pr-3"></i>
                                 All Employees
                            </NavLink>
                            <NavLink to={`/admin/user/${userId}/edit`} exact className="nav-link" activeClassName='active-here'>
                                <i class="far fa-id-card pr-3"></i>
                                Details
                            </NavLink>
                            <NavLink to={`/admin/profile/${userId}/edit`} exact className="nav-link" activeClassName='active-here'>
                                <i class="fas fa-user-circle pr-3"></i>
                                Profile
                            </NavLink>
                            <NavLink to={`/admin/education/${userId}/edit`} exact className="nav-link" activeClassName='active-here'>
                                <i class="fas fa-graduation-cap pr-3"></i>
                                Education
                            </NavLink>
                            <NavLink to={`/admin/nextofkin/${userId}/edit`} exact className="nav-link" activeClassName='active-here'>
                                <i class="fas fa-user-friends pr-3"></i>
                                Employee Next Of Kin
                            </NavLink>

                            <LinkContainer to='/'>
                                <Nav.Link onClick={logoutHandler}>
                                    <i class="fas fa-level-up-alt pr-4"></i>
                                    Logout
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                        
                    </Navbar.Collapse>
                </Navbar>

                <Container className='employee-details'>
                    <p>{userInfo.role}</p>
                    <p>{userInfo.email}</p>
                </Container>
            </div>
        </header>
    )
}

export default AdminHeader;