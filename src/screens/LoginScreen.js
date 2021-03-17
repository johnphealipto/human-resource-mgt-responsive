import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import Message from '../components/Message';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import LoginImg from '../img/call-center.jpg';
import Logo from '../img/outcess-logo.png';
import '../styles/LoginScreen.css';
import { login } from '../actions/userActions';
import { css } from '@emotion/css';
import { USER_FORGOT_PASSWORD_RESET } from '../constants/userConstants';


//Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoginTestScreen = ({ history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    
    useEffect(() => {
        if(userInfo) {
          
            history.push('/home')
        } else {
          dispatch({
            type: USER_FORGOT_PASSWORD_RESET
          })
        }
    }, [history, userInfo, dispatch])
    
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  
  return (
    <div className="loginpage-wrapper">
      <Container className='loginpage-container'>
        <Row>
          <Col className='d-none d-lg-block col-xs-none col-lg-6'>
            <div className='login-img'>
              <img src={LoginImg} alt='Call Center' />
            </div>
          </Col>
          <Col className='loginform-col col-xs-12 col-lg-6'>
            <div className='logo'>
              <img src={Logo} alt='Outcess Logo' />
            </div>
            <Form onSubmit={submitHandler}>
              {error && <Message variant='danger'>{error}</Message>}
              <Form.Group className='form-group email form-group-animate' controlId="formBasicEmail">
              <i className="fas fa-user pr-3"></i>
              <Form.Label className='form-label-animate'>Email Address</Form.Label>
                <Form.Control 
                  autoFocus 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className='form-group password form-animate' controlId="formBasicPassword">
              <i className="fas fa-unlock pr-3"></i>
              <Form.Label className='form-label-animate'>Password</Form.Label>
                <Form.Control 
                  type={passwordShown ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                <i onClick={togglePasswordVisiblity} className={passwordShown ? "fas fa-eye" : "fas fa-eye-slash"} id="eye"></i>
              </Form.Group>
              <Button type='submit' className='btn btn-block'>
                Sign In
              </Button>
              <Link to='/forgotpassword' className='forget-password'>
                  <p>Forgot password?</p>
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
  );
}

export default LoginTestScreen;