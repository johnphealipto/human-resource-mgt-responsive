import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Form, Button, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetailsById, updateUser } from '../actions/userActions'
import { USER_DETAILS_ID_RESET, USER_UPDATE_RESET } from '../constants/userConstants';
import '../styles/FixedNavbar.css';
import Header from '../components/Header';
import '../styles/ProfileScreen.css';
import logo from "../img/outcess-logo.png";


const RoleEditScreen = ({ history, match }) => {
    const userId = match.params.id

    const [role, setRole] = useState('')
    const [employeeCode, setEmployeeCode] = useState('')
    const [isActive, setIsActive] = useState(false)

    const [message] = useState(null)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { success:successUpdate } = userUpdate
    

    const userDetailsById = useSelector(state => state.userDetailsById)
    const { loading, error, user } = userDetailsById
    
    useEffect(() => {
        if (userInfo  && (userInfo.role === 'Human Resource Executive' || userInfo.role === 'CEO' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources')) {
            
           
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
        }))
        history.push('/admin/userlist')
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
        <>

            <div className="dashboard-container">

            <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />

            <div className={sidebarOpen ? "fixednavbar-responsive" : ""} id="sidebar">
            <div className="fixednavbar-title">
                <div className="fixednavbar-img">
                    <img src={logo} alt="logo" />
                </div>
                <i
                className="fa fa-times"
                id="sidebarIcon"
                onClick={() => closeSidebar()}
                ></i>
            </div>
            <div className="fixednavbar-menu">
            <Nav className="flex-column">
                <NavLink to='/home' exact className="nav-link" activeClassName='active-here'>
                    <i className="fas fa-tachometer-alt"></i>
                    Dashboard
                </NavLink>
                <NavLink to='/admin/userlist' exact='true' className="nav-link" activeClassName='active-here'>
                    <i className="fas fa-home"></i>
                    All Employees
                </NavLink>
            </Nav>
            </div>
            </div>

            <main className='profilescreen-wrapper'>
                <div className="dashboard-body">
                {user.employee && (
                    <>
                <div className='allLeave-title'>
                <h3>Update {user.employee.email} Role</h3>
                </div>
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
                            onChange={(e) => setIsActive(e.target.checked)} />
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
                        <Form.Group controlId='employeeCode'>
                            <Form.Label>Employee Code</Form.Label>
                            <Form.Control 
                            type='text' 
                            placeholder='Enter Employee Code'
                            value={employeeCode}
                            onChange={(e) => setEmployeeCode(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
                </>
            )}
            </div>
        </main>
        </div>
        </>
    )
}

export default RoleEditScreen;
