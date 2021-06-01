import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ScaleLoader } from 'react-spinners';
import Message from '../components/Message';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
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

function LoginTestScreen({ history }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;


  useEffect(() => {
    if (userInfo) {

      history.push('/home');
    } else {
      dispatch({
        type: USER_FORGOT_PASSWORD_RESET
      });
    }
  }, [dispatch, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div className="loginpage-wrapper">
      <Row>
        <Col className="col-lg-6 login-img d-none d-lg-block">
        <div className=''>
            {/* <img src={LoginImg} alt='Outcess' /> */}
        </div>
        </Col >
        <Col className="col-lg-6">
        <div className='loginform-col'>
      <div className='logo'>
        <img src={Logo} alt='Outcess' />
      </div>
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group className='form-group email' controlId="formBasicEmail">
        <i className="fas fa-user pr-3"></i>
        <Form.Label>Email Address</Form.Label>
          <Form.Control 
            autoFocus 
            className='shadow-none'
            type="email"
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className='form-group password' controlId="formBasicPassword">
          <i className="fas fa-unlock pr-3"></i>
          <Form.Label>Password</Form.Label>
          <InputGroup className="mb-2">
            <Form.Control 
              className='shadow-none'
              type={passwordShown ? "text" : "password"}
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <InputGroup.Prepend>
              <InputGroup.Text><i onClick={togglePasswordVisiblity} className={passwordShown ? "fas fa-eye" : "fas fa-eye-slash"} /></InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
        </Form.Group>
        <Button type='submit' className='btn btn-block'>
          Sign In
        </Button>
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
    </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginTestScreen;