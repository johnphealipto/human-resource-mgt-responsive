import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Form, Button, Row, Col, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { getUserDetailsById, updateUser } from '../actions/userActions'
import { USER_DETAILS_ID_RESET, USER_UPDATE_RESET } from '../constants/userConstants'
import '../styles/FixedNavbar.css';
import AdminHeader from '../components/AdminHeader';
import '../styles/ProfileScreen.css';


const StaffEditScreen = ({ history, match }) => {
    const userId = match.params.id

    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
   
    
    const [role, setRole] = useState('')    
    const [department, setDepartment] = useState('')    
    const [employeeCode, setEmployeeCode] = useState('')  

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { success:successUpdate } = userUpdate

    const userDetailsById = useSelector(state => state.userDetailsById)
    const { error, user } = userDetailsById

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
            if(!user.employee || user.employee._id !== userId) {
                dispatch(getUserDetailsById(userId))
            } else {
                setFirstname(user.employee.firstname)
                setLastname(user.employee.lastname)
                setMiddlename(user.employee.middlename)
                setEmail(user.employee.email)
                setRole(user.employee.role)
                setDepartment(user.employee.department)
                setEmployeeCode(user.employee.employeeCode)

            }
        }
        } else {
            history.push('/')
        } 
        
    }, [history, userInfo, userId, user, successUpdate, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            _id: userId,
            firstname,
            middlename,
            lastname,
            email,
           role,
           employeeCode,
           department
        }))
        history.push('/admin/userlist')
    }

    return (
        <>
            {user.employee  && (
            <Row className='ml-4 mr-4 py-4 profilescreen-wrapper'>
                <Col md={3} className='d-none d-md-block'>
            <div className="fixednavbar-wrapper">
            <div className='employee-details'>
                <p>{userInfo.role}</p>
                <p>{userInfo.email}</p>
            </div>
        <Nav className="flex-column">
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
        </Nav>
        </div>
            </Col>
           
            <Col className='col-xs-12 col-md-8'>
                <AdminHeader
                    userId
                />
                <h1 className='page-header'>Update {user.employee.firstname}'s Record</h1>
               
                {error && <Message variant='danger'>{error}</Message>}
                {successUpdate && <Message variant='success'>Profile Created</Message>}
                
                <Form onSubmit={submitHandler}>
                    <Form.Row>
                        <Form.Group  className="col-md-4" controlId='firstname'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                            type='firstname' 
                           
                            placeholder='Enter First name'
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group  className="col-md-4" controlId='middlename'>
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control 
                            type='middlename' 
                            
                            placeholder='Enter Middle name'
                            value={middlename}
                            onChange={(e) => setMiddlename(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group  className="col-md-4" controlId='lastname'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                            type='lastname' 
                            
                            placeholder='Enter Last name'
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group  className="col-md-4" controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control 
                            type='email' 
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                           
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="col-md-4" controlId="formGridDepartment">
                            <Form.Label>Department</Form.Label>
                            <Form.Control 
                            as="select" 
                            size='sm'
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}>
                                <option value=''>Select...</option>
                                <option value='IT'>IT</option>
                                <option value='PROJECT'>PROJECT</option>
                                <option value='HR'>HR</option>
                                <option value='MIS'>MIS</option>
                                <option value='QUALITY-ASSURANCE'>QUALITY-ASSURANCE</option>
                                <option value='TRAINING'>TRAINING</option>
                                <option value='ADMIN'>ADMIN</option>
                                <option value='OUTCESS'>OUTCESS</option>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group  className="col-md-4" controlId='employeeCode'>
                            <Form.Label>Employee Code</Form.Label>
                            <Form.Control 
                            type='employeeCode' 
                            placeholder='Enter Employee Code'
                            value={employeeCode}
                            onChange={(e) => setEmployeeCode(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control 
                            as="select" 
                            size='sm'
                            value={role}
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
                        
                    </Form.Row>
                    <Button type='submit' variant='primary' className='btn-block'>
                        Update
                    </Button>
                </Form>
            </Col>
                 
        </Row>
        )
        }
        </>
    )
}

export default StaffEditScreen
