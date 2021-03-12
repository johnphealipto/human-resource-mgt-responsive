import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, ListGroup, Toast, Nav } from 'react-bootstrap'
import { Link, NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { updateUserPassword } from '../actions/userActions'
import { USER_UPDATE_PASSWORD_RESET } from '../constants/userConstants';
import '../styles/FixedNavbar.css';
import AdminHeader2 from '../components/AdminHeader2';
import '../styles/ProfileScreen.css';


const PasswordScreen = ({ history }) => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()

    const userUpdatePassword = useSelector(state => state.userUpdatePassword)
    const { error, success } = userUpdatePassword

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(success) {
                dispatch({
                    type: USER_UPDATE_PASSWORD_RESET
                })
                history.push('/home')
            }
        }
    }, [dispatch, success, history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if(newPassword !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            //Dispatch
            dispatch(updateUserPassword({
                currentPassword,
                newPassword
            }))
            //setShow(true)
        }
        
        
    }

    return (
        <>
        <Row>
        <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Password Update</strong>
            <small>1 mins ago</small>
          </Toast.Header>
          <Toast.Body>Your Password has been updated!</Toast.Body>
        </Toast>
         </Col>
         </Row>

        <Row className='ml-4 mr-4 py-4 profilescreen-wrapper'>
        <Col md={4} lg={2} className='d-none d-md-block'>
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
        <NavLink to='/updatepassword' exact className="nav-link" activeClassName='active-here'>
        <i class="fas fa-unlock pr-4"></i>
          Update Password
        </NavLink>
        <NavLink to='/dashboard' exact className="nav-link" activeClassName='active-here'>
          <i class="fas fa-graduation-cap pr-4"></i>
          Education
        </NavLink>
        <NavLink to='/myleave' exact className="nav-link" activeClassName='active-here'>
          <i class="fas fa-sign-out-alt pr-4"></i>
          My Leave
        </NavLink>
                {
                    (userInfo.role === 'hr') && (
                        <>
                        <div className='admin-section'>
            <p>Admin Section</p>
          </div>
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
            </Nav>
            </div>
            </Col>


            <Col xs={12} md={8} lg={10}>
                <AdminHeader2 />
                <h1 className='page-header'>Update Password</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Password Updated</Message>}
               
                <Form onSubmit={submitHandler} className="form-shadow">
                    <Form.Group controlId='crrentPassword'>
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control 
                        type='password' 
                        placeholder='Enter Password'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='newpassword'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control 
                        type='password' 
                        placeholder='Enter New Password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirrmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                        type='password' 
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            
        </Row>
        </>
    )
}

export default PasswordScreen;
