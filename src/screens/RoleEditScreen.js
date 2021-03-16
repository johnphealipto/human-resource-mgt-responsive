import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Form, Button, Row, Col, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetailsById, updateUser } from '../actions/userActions'
import { USER_DETAILS_ID_RESET, USER_UPDATE_RESET } from '../constants/userConstants';
import '../styles/FixedNavbar.css';
import AdminHeader2 from '../components/AdminHeader2';
import '../styles/ProfileScreen.css';


const RoleEditScreen = ({ history, match }) => {
    const userId = match.params.id

    const [role, setRole] = useState('')
    const [employeeCode, setEmployeeCode] = useState('')
    const [isManager, setIsManager] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { success:successUpdate } = userUpdate
    

    const userDetailsById = useSelector(state => state.userDetailsById)
    const { loading, error, user } = userDetailsById
    
    useEffect(() => {
        if (userInfo  && (userInfo.role === 'hr' || userInfo.role === 'hr-manager' || userInfo.role === 'admin')) {
            
           
            if(successUpdate) {
                dispatch({
                    type: USER_UPDATE_RESET
                })
                dispatch({
                    type: USER_DETAILS_ID_RESET
                })
                history.push('/admin/userlist')
            } else {
            if(!user.employee || userId !== user.employee._id) {
                dispatch(getUserDetailsById(userId))
            } else {
                setRole(user.employee.role)
                setIsActive(user.employee.isActive)
                setIsManager(user.employee.isManager)
                setEmployeeCode(user.employee.employeeCode)
            }
        }
        } else {
            history.push('/')
        }
        
        
    }, [history, successUpdate, userInfo, userId, user, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            _id: userId,
            employeeCode,
            role,
            isActive,
            isManager
        }))
        history.push('/admin/userlist')
        //history.push('/admin/userlist')
    }
    return (
        <>
            {user.employee && (
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
                <h1 className='page-header'>Update {user.employee.email} Role</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {successUpdate && <Message variant='success'>Profile Created</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} className="form-shadow">
                    <Form.Group controlId='isActive'>
                        <Form.Check
                        type='checkbox' 
                        label='Is Active'
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                    <Form.Group controlId='isManager'>
                        <Form.Check
                        type='checkbox' 
                        label='Is Manager'
                        checked={isManager}
                        onChange={(e) => setIsManager(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                    <Form.Group controlId="formGridRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control 
                            as="select" 
                            size='sm'
                            value={role}
                            custom
                            onChange={(e) => setRole(e.target.value)}>
                                <option value=''>Select...</option>
                                <option value='hr'>HR</option>
                                <option value='employee'>EMPLOYEE</option>
                                <option value='supervisor'>SUPERVISOR</option>
                                <option value='admin'>ADMIN</option>
                                <option value='hr-manager'>HR-MANAGER</option>
                                <option value='trainer'>TRAINER</option>
                                <option value='team-lead'>TEAM-LEAD</option>
                                <option value='asst-manager'>ASST-MANAGER</option>
                                <option value='IT-Support'>IT-SUPPORT</option>
                                <option value='agent'>AGENT</option>
                                <option value='manager'>MANAGER</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='employeeCode'>
                            <Form.Label>Employee Code</Form.Label>
                            <Form.Control 
                            type='employeeCode' 
                            placeholder='Enter Employee Code'
                            value={employeeCode}
                            onChange={(e) => setEmployeeCode(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            </Row>
            )}
            </>
    )
}

export default RoleEditScreen;
