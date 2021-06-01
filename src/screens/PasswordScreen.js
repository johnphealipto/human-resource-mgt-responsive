import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Toast } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { adminUpdatePassword } from '../actions/userActions'
import { ADMIN_UPDATE_USER_PASSWORD_RESET } from '../constants/userConstants';
import '../styles/FixedNavbar.css';
import Header from '../components/Header';
import AdminFixedNavbar from '../components/AdminFixedNav';
import '../styles/ProfileScreen.css';


const PasswordScreen = ({ history, match }) => {

    const userId = match.params.id
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()

    const adminPasswordUpdate = useSelector(state => state.adminPasswordUpdate)
    const { error, success } = adminPasswordUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo  && (userInfo.role === 'Human Resource Executive' || userInfo.role === 'CEO' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources')) {
            
            if(success) {
              dispatch({
                type: ADMIN_UPDATE_USER_PASSWORD_RESET
              })
              history.push('/admin/userlist')
          }
        } else {
          history.push('/login')
        }
    }, [dispatch, success, history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if(newPassword !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(adminUpdatePassword({
              _id: userId,
              newPassword
            }))
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
        <>
        <Row>
        <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Password Update</strong>
            <small>1 mins ago</small>
          </Toast.Header>
          <Toast.Body>Your Password has been updated!</Toast.Body>
        </Toast>
         </Col>
         </Row>


         <div className="dashboard-container">


          <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
          <AdminFixedNavbar userId={userId} sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />

          <main className='profilescreen-wrapper'>
              <div className="dashboard-body">
                <div className='allLeave-title'>
              <h3>Update Password</h3>
              </div>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Password Updated</Message>}
               
                <Form onSubmit={submitHandler} className="form-shadow">
                        
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


    
        </>
    )
}

export default PasswordScreen;
