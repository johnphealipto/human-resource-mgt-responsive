import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import '../styles/ProfileScreen.css';
import Header from '../components/Header';
import FixedNavbar from '../components/FixedNavbar';

const HomeScreen = ({ history }) => {
   

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails

    useEffect(() => {

        if(!userInfo) {
            history.push('/')
        } else {
            dispatch(getUserDetails('me'))
        }
    }, [dispatch, history, user, userInfo])

  return (
    <>   
      <Row className='ml-4 mr-4 py-4 profilescreen-wrapper'>
        <Col md={3} className='d-none d-md-block'>
          <FixedNavbar />
        </Col>
        <Col className='col-xs-12 col-md-8  form-wrapper'>
          <Header />
          {/* <hr/> */}
          <h1 className='page-header'>Home</h1>
          
          <Form key={user.id} className="form-container">
                <Form.Row>
                  <Form.Group className="col-md-4">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                    	type="text"
                    	placeholder={user.firstname}
                      disabled
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="col-md-4">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control 
                      type="text"
                      placeholder={user.middlename}
                      disabled
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="col-md-4">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                    	type="text"
                    	placeholder={user.lastname}
                      disabled
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group className="col-md-6">
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control 
                      type="text"
                      placeholder={user.employeeCode}
                      disabled
                    ></Form.Control>
                	</Form.Group>
                	<Form.Group className="col-md-6">
                    <Form.Label>Department</Form.Label>
                    <Form.Control 
                      type="text"
                      placeholder={user.department}
                      disabled
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group className="col-md-6">
                    <Form.Label>Role</Form.Label>
                    <Form.Control 
                      type="text"
                      placeholder={user.role}
                      disabled
                    ></Form.Control>
                	</Form.Group>
                	<Form.Group className="col-md-6">
                    <Form.Label>Mail Addresss</Form.Label>
                    <Form.Control 
                      type="text"
                      placeholder={user.email}
                      disabled
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>
                {userInfo && (
                <Link to='/dashboard'>
                    <Button type='submit' variant='primary' className='btn-block'>
                        <i className='fas fa-edit'></i> Edit
                    </Button>
                </Link>
                )}
              </Form>
        </Col>
        </Row>
        </>
    )
}

export default HomeScreen;