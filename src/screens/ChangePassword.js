import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserPassword } from '../actions/userActions'
import { USER_UPDATE_PASSWORD_RESET } from '../constants/userConstants'
import '../styles/ProfileScreen.css';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const ChangePassword = ({ history }) => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userUpdatePassword = useSelector(state => state.userUpdatePassword)
    const { error, success } = userUpdatePassword

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // ---- For the FixedNavBar
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const openSidebar = () => {
      setSidebarOpen(true);
    };
    
    const closeSidebar = () => {
      setSidebarOpen(false);
    };


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
        <div>
        <div className="dashboard-container"> 
            <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
			<FixedNavbar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} /> 
            <main className='profilescreen-wrapper'>
                <div className="dashboard-body">
                    <div className="page-header">
                        <h3>Dashboard</h3>
                        <p>Reset {userInfo.firstname}'s password</p>
                    </div>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {success && <Message variant='success'>Password Updated</Message>}
                
                    <Form onSubmit={submitHandler} className="form-shadow">
                    <Form.Group controlId='crrentPassword'>
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control 
                        type='password' 
                        placeholder='Enter Current Password'
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
                </div>
            </main>
            </div>
        </div>   
    )
}

export default ChangePassword;
