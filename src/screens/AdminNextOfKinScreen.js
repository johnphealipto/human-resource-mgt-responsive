import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button, Row, Col, Nav, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { createNextOfKin, createNextOfKinEmpId, getNextOfKinDetailsEmpId, updateNextOfKin } from '../actions/nextOfKinActions'
import { NOK_CREATE_EMPLOYEE_RESET, NOK_DETAILS_EMPLOYEE_RESET, NOK_UPDATE_RESET } from '../constants/nextOfKinConstants'
import '../styles/FixedNavbar.css';
import AdminHeader from '../components/AdminHeader';
import '../styles/ProfileScreen.css';

const AdminNextOfKinScreen = ({ history, match }) => {
    const userId = match.params.id
    
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [relationship, setRelationship] = useState('')
    

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const nextOfKinDetailsEmpId = useSelector(state => state.nextOfKinDetailsEmpId)
    const { loading, nextOfKin } = nextOfKinDetailsEmpId

    const nextOfKinUpdate = useSelector(state => state.nextOfKinUpdate)
    const { error:errorUpdate, success:successUpdate } = nextOfKinUpdate

    const nextOfKinCreateEmpId = useSelector(state => state.nextOfKinCreateEmpId)
    const { error:errorCreate, success:successCreate } = nextOfKinCreateEmpId

  

    useEffect(() => {

        if(userInfo  && (userInfo.role === 'hr' || userInfo.role === 'hr-manager' || userInfo.role === 'admin')) {
            
            if(successUpdate || successCreate) {
                dispatch({
                    type: NOK_UPDATE_RESET
                })
                dispatch({
                    type: NOK_DETAILS_EMPLOYEE_RESET
                })
                dispatch({
                    type: NOK_CREATE_EMPLOYEE_RESET
                })
                history.push('/home')
            } else {
            if(!nextOfKin || nextOfKin.employee  !== userId ) {
                dispatch(getNextOfKinDetailsEmpId(userId))
            } else {
                setFirstname(nextOfKin.firstname)
                setLastname(nextOfKin.lastname)
                setContact(nextOfKin.contact)
                setEmail(nextOfKin.email)
                setRelationship(nextOfKin.relationship)

            }
        }
        } else {
            history.push('/')
    }
    }, [dispatch, history, nextOfKin, successUpdate, userId, successCreate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateNextOfKin({
            _id: nextOfKin._id,
            firstname,
            lastname,
            contact,
            email,
            relationship
        }))
       
       
        
    }

    const createsubmitHandler= (e) => {
        e.preventDefault()
        dispatch(createNextOfKinEmpId({
            employee: userId,
            firstname,
            lastname,
            contact,
            email,
            relationship
        }))
       
       
        
    }


    return (
        <>
         
        <Row className='ml-4 mr-4 py-4 profilescreen-wrapper'>
        <Col md={4} lg={2} className='d-none d-md-block'>
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
          <i class="fas fa-user-friends pr-3"></i>
          Education
        </NavLink>
        <NavLink to={`/admin/nextofkin/${userId}/edit`} exact className="nav-link" activeClassName='active-here'>
          <i class="fas fa-graduation-cap pr-3"></i>
          Employee Next Of Kin
        </NavLink>
        </Nav>
        </div>
        </Col>

            <Col xs={12} md={8} lg={10}>
                <AdminHeader
                    userId
                />
                <h1 className='page-header'>Next Of Kin</h1>
               
                
                {successUpdate && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                {
                    nextOfKin ? (
                        <Form onSubmit={submitHandler} className="form-shadow">
                        <Form.Row>
                            <Form.Group  className="col-md-4" controlId='firstname'>
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control 
                                type='firstname' 
                            
                                placeholder='Enter Firstname'
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-4" controlId='lastname'>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control 
                                type='lastname' 
                                
                                placeholder='Enter Lastname'
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-4" controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control 
                                type='email' 
                                
                                placeholder='Enter  Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            
                    
                            
                        </Form.Row>
                        <Form.Row>
                            
                            <Form.Group  className="col-md-6" controlId='contact'>
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control 
                                type='contact' 
                                placeholder='Enter Contact'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-6" controlId='relationship'>
                                <Form.Label>Relationship</Form.Label>
                                <Form.Control 
                                type='relationship' 
                                placeholder='Enter Relationship'
                                value={relationship}
                                onChange={(e) => setRelationship(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        
                    
                            
                        </Form.Row>
                        
                    
                        <Button type='submit' variant='primary' className='btn-block'>
                            Update
                        </Button>
                    </Form>
                    ) : (
                        <Form onSubmit={createsubmitHandler} className="form-shadow">
                        <Form.Row>
                            <Form.Group  className="col-md-4" controlId='firstname'>
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control 
                                type='firstname' 
                            
                                placeholder='Enter Firstname'
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-4" controlId='lastname'>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control 
                                type='lastname' 
                                
                                placeholder='Enter Lastname'
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-4" controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control 
                                type='email' 
                                
                                placeholder='Enter  Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            
                    
                            
                        </Form.Row>
                        <Form.Row>
                            
                            <Form.Group  className="col-md-6" controlId='contact'>
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control 
                                type='contact' 
                                placeholder='Enter Contact'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-6" controlId='relationship'>
                                <Form.Label>Relationship</Form.Label>
                                <Form.Control 
                                type='relationship' 
                                placeholder='Enter Relationship'
                                value={relationship}
                                onChange={(e) => setRelationship(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        
                    
                            
                        </Form.Row>
                        
                    
                        <Button type='submit' variant='primary' className='btn-block'>
                            Create
                        </Button>
                    </Form>
                    )
                }
                
            </Col>
        </Row>
        </>
    )
}

export default AdminNextOfKinScreen;
