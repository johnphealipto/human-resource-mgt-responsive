import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
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
    const [dateOfJoining, setDateOfJoining] = useState('')
    const [department, setDepartment] = useState('')
    const [employeeCode, setEmployeeCode] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('')
    const [leaveDays, setLeaveDays] = useState(0)
    
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, success:successRegister } = userRegister

    useEffect(() => {
        if (userInfo  && (userInfo.role === 'Human Resource Executive' || userInfo.role === 'CEO' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources')) {
           
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
                dateOfJoining,
                department,
                employeeCode,
                role,
                leaveDays,
                password
            ))
            dispatch(listUsers())
        }
        
    }

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
        <main className='profilescreen-wrapper'>
            <div className="dashboard-body">
                <div className="page-header">
                    <h3>Register a New Employee</h3>
                    <p>{userInfo.firstname} - Create staff</p>
                </div>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {successRegister && <Message variant='success'>Profile Created</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} className="form-shadow">
                    <Form.Row>
                        <Form.Group  className="col-md-4" controlId='firstname'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                            type='text' 
                           
                            placeholder='Enter First name'
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group  className="col-md-4" controlId='middlename'>
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control 
                            type='text' 
                            
                            placeholder='Enter Middle name'
                            value={middlename}
                            onChange={(e) => setMiddlename(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group  className="col-md-4" controlId='lastname'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                            type='text' 
                            
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
                        <Form.Group  className="col-md-4" controlId='dateOfJoining'>
                            <Form.Label>Date Of Joining</Form.Label>
                            <Form.Control 
                                type='date' 
                                placeholder='Enter Date Of Joining'
                                value={dateOfJoining}
                                onChange={(e) => setDateOfJoining(e.target.value)} />
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
                                <option value='Admin'>Admin</option>
                                <option value='Sales'>Sales</option>
                                <option value='MIS'>MIS</option>
                                <option value='Projects'>Projects</option>
                                <option value='Operations'>Operations</option>
                                <option value='QA'>QA</option>
                                <option value='Customer Service'>Customer Service</option>
                                <option value='Human Resources'>Human Resources</option>
                                <option value='IT'>IT</option>
                                <option value='Training & Development'>Training & Development</option>
                                <option value='Accounts'>Accounts</option>
                                <option value='Enugu - MCN'>Enugu - MCN</option>
                                <option value='Branch'>Branch</option>
                                <option value='Multichoice'>Multichoice</option>
                                
                                <option value='Ntel'>Ntel</option>
                                <option value='Fairmoney'>Fairmoney</option>
                                <option value='KYC'>KYC</option>
                                <option value='Sim swap'>Sim swap</option>
                                <option value='Enterprise'>Enterprise</option>
                                <option value='Access bank'>Access bank</option>
                                <option value='OUTCESS'>OUTCESS</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group  className="col-md-4" controlId='employeeCode'>
                            <Form.Label>Employee Code</Form.Label>
                            <Form.Control 
                            type='text' 
                            placeholder='Enter Employee Code'
                            value={employeeCode}
                            onChange={(e) => setEmployeeCode(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="col-md-4" controlId="formGridRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control 
                            as="select" 
                            size='sm'
                            custom
                            value={role}
                            onChange={(e) => setRole(e.target.value)}>
                                <option value=''>Select...</option>
                                <option value='Admin Executive'>Admin Executive</option>
                                <option value='Sales Executive'>Sales Executive</option>
                                <option value='MIS Executive'>MIS Executive</option>
                                <option value='Projects Executive'>Projects Executive</option>
                                <option value='Team Lead'>Team Lead</option>
                                <option value='Quality Assessor'>Quality Assessor</option>
                                <option value='Customer Service Officer'>Customer Service Officer</option>
                                <option value='Assistant Manager - Human Resources'>Assistant Manager - Human Resources</option>
                                <option value='IT Support Specialist'>IT Support Specialist</option>
                                <option value='Frontdesk/Recruitment officer'>Frontdesk/Recruitment officer</option>
                                <option value='Trainer'>Trainer</option>
                                <option value='Human Resource Executive'>Human Resource Executive</option>
                                <option value='Software Developer (Intern)'>Software Developer (Intern)</option>
                                <option value='Accounts Officer'>Accounts Officer</option>
                                <option value='Accountant'>Accountant</option>
                                <option value='Head Of Department'>Head Of Department</option>
                                <option value='Assistant Manager'>Assistant Manager</option>
                                <option value='CEO'>CEO</option>
                                <option value='Agent'>Agent</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group  className="col-md-4" controlId='leaveDays'>
                            <Form.Label>Leave Balance</Form.Label>
                            <Form.Control 
                                type='number' 
                                placeholder='Enter Leave Days Balance'
                                value={leaveDays}
                                onChange={(e) => setLeaveDays(e.target.value)} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-md-6" controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type='password' 
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="col-md-6" controlId='confirrmPassword'>
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
                </div>
            </main>
        </div>
    )
}

export default StaffCreateScreen;
