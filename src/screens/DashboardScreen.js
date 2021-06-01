import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import moment from 'moment'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import '../styles/ProfileScreen.css';

const DashboardScreen = ({ history }) => {
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfJoining, setDateOfJoining] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

   
    const [employeeCode, setEmployeeCode] = useState('')
   
    
    const [department, setDepartment] = useState('')


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { error, user } = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile


    useEffect(() => {

        if(!userInfo) {
            history.push('/')
        } else {
           if(success) {
               dispatch({
                   type: USER_UPDATE_PROFILE_RESET
               })
               history.push('/')
           } else {
            if(!user || !user.firstname) {
                dispatch(getUserDetails('me'))
            } else {
                setFirstname(user.firstname)
                setLastname(user.lastname)
                setMiddlename(user.middlename)
             
               setDateOfJoining(moment(user.dateOfJoining).format("DD-MM-YYYY"))
                setDepartment(user.department)
               
                setEmployeeCode(user.employeeCode)

            }
        }
        }
        
    }, [dispatch, history, user, success, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
        dispatch(updateUserProfile({
            _id: user._id,
            firstname,
            lastname,
            password,
            middlename,
           
          
        }))
         }
        
    }

    return (
        <div className="profilescreen-wrapper mt-3">
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
              
                <Form onSubmit={submitHandler} className="form-shadow">
                    <Form.Row>
                        <Form.Group  className="col-md-4" controlId='firstname'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                            type='text' 
                            disabled
                            placeholder='Enter First name'
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group  className="col-md-4" controlId='middlename'>
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control 
                            type='text'
                            disabled
                            placeholder='Enter Middle name'
                            value={middlename}
                            onChange={(e) => setMiddlename(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group  className="col-md-4" controlId='lastname'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                            type='text' 
                            disabled
                            placeholder='Enter Last name'
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group  className="col-md-4" controlId='department'>
                            <Form.Label>Department</Form.Label>
                            <Form.Control 
                            type='text' 
                           disabled
                            placeholder='Enter Department'
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group  className="col-md-4" controlId='employeeCode'>
                            <Form.Label>Employee Code</Form.Label>
                            <Form.Control 
                            type='text' 
                            placeholder='Enter Employee Code'
                            disabled
                            value={employeeCode}
                            onChange={(e) => setEmployeeCode(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group  className="col-md-4" controlId='dateOfJoining'>
                            <Form.Label>Date Of Joining</Form.Label>
                            <Form.Control 
                            type='text' 
                            placeholder='Enter Date'
                            disabled
                            value={dateOfJoining}
                            onChange={(e) => setDateOfJoining(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        
                    </Form.Row>
                    <Form.Row>
                    <Form.Group className="col-md-6" controlId='password'>
                        <Form.Label>New Password</Form.Label>
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
                        Update
                    </Button>
                </Form>
            </div>
    )
}

export default DashboardScreen;
