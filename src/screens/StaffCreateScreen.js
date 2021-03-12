import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, register } from '../actions/userActions';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const StaffCreateScreen = ({ history }) => {
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('')
    const [employeeCode, setEmployeeCode] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('')
    
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, success:successRegister } = userRegister

    useEffect(() => {
        if (userInfo  && (userInfo.role === 'hr' || userInfo.role === 'hr-manager' || userInfo.role === 'admin')) {
           
            if(successRegister) {
                dispatch({
                    type: USER_REGISTER_RESET
                })
                history.push('/admin/userlist')
            }
        } else {
            history.push('/')
        }
        
    }, [dispatch, history, userInfo, successRegister])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(
                firstname,
                middlename,
                lastname,
                email,
                department,
                employeeCode,
                role,
                password
            ))
            dispatch(listUsers())
            history.push('/admin/userlist')
        }
        
    }

  return (
    <>
    	<Row className='ml-4 mr-4 py-4 profilescreen-wrapper'>
            <Col md={4} lg={2} className='d-none d-md-block'>
                <FixedNavbar />
            </Col>
            <Col xs={12} md={8} lg={10}>
                <Header />
                <h1 className='page-header'>Register a New Employee</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {successRegister && <Message variant='success'>Profile Created</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} className="form-shadow">
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
                            custom
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
                        <Form.Group className="col-md-4" controlId="formGridRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control 
                            as="select" 
                            size='sm'
                            custom
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
                        <Form.Group className="col-md-4" controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type='password' 
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="col-md-4" controlId='confirrmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                            type='password' 
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Button type='submit' variant='primary' className='btn-block'>
                      Register
                    </Button>
                </Form>
            </Col>
            
        </Row>
        </>
    )
}

export default StaffCreateScreen;
