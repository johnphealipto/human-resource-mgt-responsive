import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { createProfileEmpId, getProfileDetailsEmpId, updateProfile } from '../actions/profileActions'
import { PROFILE_CREATE_EMPLOYEE_RESET, PROFILE_DETAILS_EMPLOYEE_RESET, PROFILE_UPDATE_RESET } from '../constants/profileConstants'
import '../styles/FixedNavbar.css';
import Header from '../components/Header';
import '../styles/ProfileScreen.css';
import AdminFixedNavbar from '../components/AdminFixedNav';

const AdminProfileScreen = ({ history, match }) => {
    const userId = match.params.id


    const [dob, setDob] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [privateEmail, setPrivateEmail] = useState('')
    const [gender, setGender] = useState('')
    const [dateOfJoining, setDateOfJoining] = useState('')
    const [dateOfLastPromotion, setDateOfLastPromotion] = useState('')
    const [address, setAddress] = useState('')
    const [stateOfOrigin, setStateOfOrigin] = useState('')
    const [lga, setLga] = useState('')
    const [maritalStatus, setMaritalStatus] = useState('')
    const [religion, setReligion] = useState('')

   

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const profileDetailsEmpId = useSelector(state => state.profileDetailsEmpId)
    const { loading, profile } = profileDetailsEmpId

    const profileUpdate = useSelector(state => state.profileUpdate)
    const { success:successUpdate } = profileUpdate

    const profileCreateEmpId = useSelector(state => state.profileCreateEmpId)
    const { success:successCreate } = profileCreateEmpId

  

    useEffect(() => {

        if(userInfo  && (userInfo.role === 'Human Resource Executive' ||userInfo.role === 'CEO' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources')) {
            
            if(successUpdate || successCreate) {
                dispatch({
                    type: PROFILE_UPDATE_RESET
                })
                dispatch({
                    type: PROFILE_DETAILS_EMPLOYEE_RESET
                })
                dispatch({
                    type: PROFILE_CREATE_EMPLOYEE_RESET
                })
                history.push('/admin/userlist')
            } else {
            if(!profile || profile.employee !== userId) {
                dispatch(getProfileDetailsEmpId(userId))
            } else {
                setDob(profile.dob)
                setContactNo(profile.contactNo)
                setPrivateEmail(profile.privateEmail)
                setGender(profile.gender)
                setDateOfJoining(profile.dateOfJoining)
                setDateOfLastPromotion(profile.dateOfLastPromotion)
                setAddress(profile.address)
                setStateOfOrigin(profile.stateOfOrigin)
                setLga(profile.lga)
                setMaritalStatus(profile.maritalStatus)
                setReligion(profile.religion)

            }
        }
        } else {
            history.push('/') 
    }
    }, [dispatch, history, profile, userId, successUpdate, successCreate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProfile({
            _id: profile._id,
            dob,
            contactNo,
            privateEmail,
            gender,
            dateOfJoining,
            dateOfLastPromotion,
            address,
            stateOfOrigin,
            lga,
            maritalStatus,
            religion
        }))
       
       
        
    }

    const createsubmitHandler= (e) => {
        e.preventDefault()
        dispatch(createProfileEmpId({
            employee: userId,
            dob,
            contactNo,
            privateEmail,
            gender,
            dateOfJoining,
            dateOfLastPromotion,
            address,
            stateOfOrigin,
            lga,
            maritalStatus,
            religion
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
            <h3>My Profile</h3>
              </div> 
               
                {successUpdate && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                {
                    profile ? (
                        <Form onSubmit={submitHandler} className="form-shadow">
                        <Form.Row>
                            <Form.Group  className="col-md-4" controlId='dateOfBirth'>
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control 
                                type='date' 
                            
                                placeholder='Enter Date Of Birth'
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-4" controlId='contactNo'>
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control 
                                type='text' 
                                
                                placeholder='Enter Contact Number'
                                value={contactNo}
                                onChange={(e) => setContactNo(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-4" controlId='privateEmail'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control 
                                type='email' 
                                
                                placeholder='Enter Private Email'
                                value={privateEmail}
                                onChange={(e) => setPrivateEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            
                    
                            
                        </Form.Row>
                        <Form.Row>
                            <Form.Group className="col-md-4" controlId="formGridGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control 
                                as="select" 
                                size='sm'
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}>
                                    <option value=''>Select...</option>
                                    <option value='MALE'>MALE</option>
                                    <option value='FEMALE'>FEMALE</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-4" controlId='dateOfJoining'>
                                <Form.Label>Date Of Joining</Form.Label>
                                <Form.Control 
                                type='date' 
                                placeholder='Enter Date Of Joining'
                                value={dateOfJoining}
                                onChange={(e) => setDateOfJoining(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-4" controlId='dateOfLastPromotion'>
                                <Form.Label>Date Of Last Promotion</Form.Label>
                                <Form.Control 
                                type='date' 
                                placeholder='Enter Date Of Last Promotion'
                                value={dateOfLastPromotion}
                                onChange={(e) => setDateOfLastPromotion(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        
                    
                            
                        </Form.Row>
                        <Form.Row>
                            
                            <Form.Group  className="col-md-4" controlId='address'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control 
                                type='text' 
                                placeholder='Enter Address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-4" controlId='stateOfOrigin'>
                                <Form.Label>State Of Origin</Form.Label>
                                <Form.Control 
                                type='text' 
                                placeholder='Enter State Of Origin'
                                value={stateOfOrigin}
                                onChange={(e) => setStateOfOrigin(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-4" controlId='lga'>
                                <Form.Label>LGA</Form.Label>
                                <Form.Control 
                                type='text' 
                                placeholder='Enter LGA'
                                value={lga}
                                onChange={(e) => setLga(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        
                    
                            
                        </Form.Row>
                        <Form.Row>
                            
                            <Form.Group  className="col-md-6" controlId='maritalStatus'>
                                <Form.Label>Marital Status</Form.Label>
                                <Form.Control 
                                type='text' 
                                placeholder='Enter Marital Status'
                                value={maritalStatus}
                                onChange={(e) => setMaritalStatus(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-6" controlId='religion'>
                                <Form.Label>Religion</Form.Label>
                                <Form.Control 
                                type='text' 
                                placeholder='Enter Religion'
                                value={religion}
                                onChange={(e) => setReligion(e.target.value)}
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
                                <Form.Group  className="col-md-4" controlId='dateOfBirth'>
                                    <Form.Label>Date Of Birth</Form.Label>
                                    <Form.Control 
                                    type='date' 
                                
                                    placeholder='Enter Date Of Birth'
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group  className="col-md-4" controlId='contactNo'>
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control 
                                    type='text' 
                                    
                                    placeholder='Enter Contact Number'
                                    value={contactNo}
                                    onChange={(e) => setContactNo(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group  className="col-md-4" controlId='privateEmail'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control 
                                    type='email' 
                                    
                                    placeholder='Enter Private Email'
                                    value={privateEmail}
                                    onChange={(e) => setPrivateEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                
                        
                                
                            </Form.Row>
                            <Form.Row>
                                <Form.Group className="col-md-4" controlId="formGridGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control 
                                    as="select" 
                                    size='sm'
                                    custom
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}>
                                        <option value=''>Select...</option>
                                        <option value='MALE'>MALE</option>
                                        <option value='FEMALE'>FEMALE</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group  className="col-md-4" controlId='dateOfJoining'>
                                    <Form.Label>Date Of Joining</Form.Label>
                                    <Form.Control 
                                    type='date' 
                                    placeholder='Enter Date Of Joining'
                                    value={dateOfJoining}
                                    onChange={(e) => setDateOfJoining(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group  className="col-md-4" controlId='dateOfLastPromotion'>
                                    <Form.Label>Date Of Last Promotion</Form.Label>
                                    <Form.Control 
                                    type='date' 
                                    placeholder='Enter Date Of Last Promotion'
                                    value={dateOfLastPromotion}
                                    onChange={(e) => setDateOfLastPromotion(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                            
                        
                                
                            </Form.Row>
                            <Form.Row>
                                
                                <Form.Group  className="col-md-4" controlId='address'>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control 
                                    type='text' 
                                    placeholder='Enter Address'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group  className="col-md-4" controlId='stateOfOrigin'>
                                    <Form.Label>State Of Origin</Form.Label>
                                    <Form.Control 
                                    type='text' 
                                    placeholder='Enter State Of Origin'
                                    value={stateOfOrigin}
                                    onChange={(e) => setStateOfOrigin(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group  className="col-md-4" controlId='lga'>
                                    <Form.Label>LGA</Form.Label>
                                    <Form.Control 
                                    type='text' 
                                    placeholder='Enter LGA'
                                    value={lga}
                                    onChange={(e) => setLga(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                            
                        
                                
                            </Form.Row>
                            <Form.Row>
                                
                                <Form.Group  className="col-md-6" controlId='maritalStatus'>
                                    <Form.Label>Marital Status</Form.Label>
                                    <Form.Control 
                                    type='text' 
                                    placeholder='Enter Marital Status'
                                    value={maritalStatus}
                                    onChange={(e) => setMaritalStatus(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group  className="col-md-6" controlId='religion'>
                                    <Form.Label>Religion</Form.Label>
                                    <Form.Control 
                                    type='text' 
                                    placeholder='Enter Religion'
                                    value={religion}
                                    onChange={(e) => setReligion(e.target.value)}
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

export default AdminProfileScreen;
