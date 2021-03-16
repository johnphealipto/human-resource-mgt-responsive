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
import { forgotPassword } from '../actions/userActions'
// import { USER_FORGOT_PASSWORD_RESET } from '../constants/userConstants'

//Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ForgotPasswordScreen = ({ history }) => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userForgotPassword = useSelector(state => state.userForgotPassword)
    const { loading, error, success } = userForgotPassword

    useEffect(() => {
        
        if(success) {
            // dispatch({
            //     type: USER_FORGOT_PASSWORD_RESET
            // })
            //history.push('/')
            //history.push(`/resetpassword/${user.resetToken}`)
            setMessage(`If an account exists for ${email} you will recieve password reset instructions`)
        }
        
    }, [success])

    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch 
        dispatch(forgotPassword(email))
        //history.push('/')
        //setMessage(`If an account exists for ${email} you will recieve password reset instructions`)
    }

    return (
        <div className="loginpage-wrapper">
            <Container className='loginpage-container'>
                <Row>
                <Col className='d-none d-lg-block col-xs-none col-lg-6'>
                    <div className='login-img'>
                        <img src={LoginImg} alt='Call Center'/>
                    </div>
                </Col>
                <Col className='loginform-col col-xs-12 col-lg-6'>
                    <div className='logo'>
                    <img src={Logo} alt='Outcess Logo'/>
                    </div>
                    {error && <Message variant='danger'>{error}</Message>}
                    {success ? <Message variant='success'>{message}</Message> : <div></div>}
                    <Form onSubmit={submitHandler}>
                    <Form.Group className='form-group email' controlId="formBasicEmail">
                        <i className="fas fa-user pr-3"></i>
                        <Form.Label className='login-label'>Email address</Form.Label>
                        <Form.Control 
                            autoFocus 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email" />
                    </Form.Group>

                    <Button type='submit' variant='primary' className='btn btn-block'>
                        Submit
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

export default ForgotPasswordScreen
