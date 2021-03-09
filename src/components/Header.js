import React from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom'
import Logo from '../img/outcess-logo-new.png'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { logout } from '../actions/userActions';
import '../styles/FixedNavbar.css';

const Header = ({ history }) => {

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
                    <hr className="border-bottom"/>
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
                                Next Of Kin
                            </NavLink>
                            <NavLink to='/education' exact className="nav-link" activeClassName='active-here'>
                                <i class="fas fa-graduation-cap pr-4"></i>
                                Education
                            </NavLink>
                            <NavLink to='/myleave' exact className="nav-link" activeClassName='active-here'>
                                <i class="fas fa-sign-out-alt pr-4"></i>
                                My Leave
                            </NavLink>

                            {
                            (userInfo.role === 'hr' || userInfo.role === 'hr-manager' || userInfo.role === 'admin') && (
                            <>
                            <hr />
                            <NavLink to='/myleave' exact className="nav-link" activeClassName='active-here'>
                                <i class="fas fa-box-open pr-4"></i>
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

export default Header;