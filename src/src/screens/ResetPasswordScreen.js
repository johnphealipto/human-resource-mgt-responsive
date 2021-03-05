import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import Message from '../components/Message'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import LoginImg from '../img/call-center.jpg';
import Logo from '../img/outcess-logo.png';
import '../styles/LoginScreen.css';
import { css } from '@emotion/css'
import { resetPassword } from '../actions/userActions'

//Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ResetPasswordScreen = ({ history, match }) => {
    const token = match.params.id  

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userResetPassword = useSelector(state => state.userResetPassword)
    const { loading, error, userInfo } = userResetPassword

    useEffect(() => {
        if(userInfo) {
            history.push('/home')
        } 
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        //Dispatch will go here
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(resetPassword(
                password,
                token
            ))
            //history.push('/')
        }
    }

    return (
        <div className="loginpage-wrapper">
            <Container className='loginpage-container'>
                <Row>
                <Col className='d-none d-lg-block col-xs-none col-lg-6'>
                    <div className='login-img'>
                    <img src={LoginImg}/>
                    </div>
                </Col>
                <Col className='loginform-col col-xs-12 col-lg-6'>
                    <div className='logo'>
                    <img src={Logo}/>
                    </div>
                    {error && <Message variant='danger'>{error}</Message>}
                    {message && <Message variant='danger'>{message}</Message>}
                    <Form onSubmit={submitHandler}>
                    <Form.Group className='form-group password' controlId="formBasicPassword">
                        <i class="fas fa-unlock pr-3"></i>
                        <Form.Label className='login-label'>New Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password" />
                    </Form.Group>
                    <Form.Group className='form-group password' controlId="formBasicPassword">
                        <i class="fas fa-unlock pr-3"></i>
                        <Form.Label className='login-label'>Confirm Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Password" />
                    </Form.Group>

                    <Button type='submit' variant='primary' className='btn btn-block'>
                        Reset Password
                    </Button>
                    <Link to='/' className='forget-password'>
                        <p>Sign-In</p>
                    </Link>
                    </Form>
                    <div className="loading">
                  
                    {loading &&
                        <ScaleLoader
                        css={override}
                        sizeUnit={"px"}
                        size={150}
                        color={"#123abc"}
                        loading={loading}
                        />
                    }
                    </div>
                </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ResetPasswordScreen
