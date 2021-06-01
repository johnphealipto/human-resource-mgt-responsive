import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { createNextOfKinEmpId, getNextOfKinDetailsEmpId, updateNextOfKin } from '../actions/nextOfKinActions'
import { NOK_CREATE_EMPLOYEE_RESET, NOK_DETAILS_EMPLOYEE_RESET, NOK_UPDATE_RESET } from '../constants/nextOfKinConstants'
import '../styles/FixedNavbar.css';
import Header from '../components/Header';
import '../styles/ProfileScreen.css';
import AdminFixedNavbar from '../components/AdminFixedNav';

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
    const { success:successUpdate } = nextOfKinUpdate

    const nextOfKinCreateEmpId = useSelector(state => state.nextOfKinCreateEmpId)
    const { success:successCreate } = nextOfKinCreateEmpId

  

    useEffect(() => {

        if(userInfo  && (userInfo.role === 'Human Resource Executive' || userInfo.role === 'CEO' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources')) {
            
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
            <AdminFixedNavbar userId={userId} sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />

            <main className='profilescreen-wrapper'>
                <div className="dashboard-body">
                <div className='allLeave-title'>
                <h3>Next Of Kin</h3>
                </div>
                
                {successUpdate && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                {
                    nextOfKin ? (
                        <Form onSubmit={submitHandler} className="form-shadow">
                        <Form.Row>
                            <Form.Group  className="col-md-4" controlId='firstname'>
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control 
                                type='text' 
                            
                                placeholder='Enter Firstname'
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-4" controlId='lastname'>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control 
                                type='text' 
                                
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
                                type='text' 
                                placeholder='Enter Contact'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-6" controlId='relationship'>
                                <Form.Label>Relationship</Form.Label>
                                <Form.Control 
                                type='text' 
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
                                type='text' 
                            
                                placeholder='Enter Firstname'
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-4" controlId='lastname'>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control 
                                type='text' 
                                
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
                                type='text' 
                                placeholder='Enter Contact'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-6" controlId='relationship'>
                                <Form.Label>Relationship</Form.Label>
                                <Form.Control 
                                type='text' 
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
    
                </div>
            </main>
        </div>
       
        </>
    )
}

export default AdminNextOfKinScreen;
