import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { createNextOfKin, getNextOfKinDetails, updateNextOfKin } from '../actions/nextOfKinActions'
import { NOK_CREATE_RESET, NOK_DETAILS_RESET, NOK_UPDATE_RESET } from '../constants/nextOfKinConstants'
import FixedNavbar from '../components/FixedNavbar';
import '../styles/ProfileScreen.css';
import Header from '../components/Header';

const NextOfKinScreen = ({ history }) => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [relationship, setRelationship] = useState('')
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const nextOfKinDetails = useSelector(state => state.nextOfKinDetails)
    const { loading, nextOfKin } = nextOfKinDetails

    const nextOfKinUpdate = useSelector(state => state.nextOfKinUpdate)
    const { error:errorUpdate, success:successUpdate } = nextOfKinUpdate

    const nextOfKinCreate = useSelector(state => state.nextOfKinCreate)
    const { error:errorCreate, success:successCreate } = nextOfKinCreate

  

    useEffect(() => {

        if(!userInfo) {
            history.push('/')
        } else {
            if(successUpdate || successCreate) {
                dispatch({
                    type: NOK_UPDATE_RESET
                })
                dispatch({
                    type: NOK_DETAILS_RESET
                })
                dispatch({
                    type: NOK_CREATE_RESET
                })
                history.push('/home')
            } else {
            if(!nextOfKin || !nextOfKin.firstname) {
                dispatch(getNextOfKinDetails('me'))
            } else {
                setFirstname(nextOfKin.firstname)
                setLastname(nextOfKin.lastname)
                setContact(nextOfKin.contact)
                setEmail(nextOfKin.email)
                setRelationship(nextOfKin.relationship)

            }
        }
    }
    }, [dispatch, history, nextOfKin, successUpdate, successCreate, userInfo])

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
        dispatch(createNextOfKin({
           
            firstname,
            lastname,
            contact,
            email,
            relationship
        }))
      
    }

    return (
        <>
         
        <Row className='ml-4 mr-4 py-4 profilescreen-wrapper'>
            <Col md={3} className='d-none d-md-block'>
                <FixedNavbar />
            </Col>
            <Col className='col-xs-12 col-md-8'>
            <Header />
                <h1 className='page-header'>Next Of Kin</h1>
               
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {successUpdate && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                {
                    nextOfKin ? (
                        <Form onSubmit={submitHandler}className="form-shadow">
                        <Form.Row>
                            <Form.Group  className="col-md-4" controlId='firstname'>
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control 
                                type='firstname' 
                            
                                placeholder='Enter Firstname'
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-4" controlId='lastname'>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control 
                                type='lastname' 
                                
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
                                type='contact' 
                                placeholder='Enter Contact'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-6" controlId='relationship'>
                                <Form.Label>Relationship</Form.Label>
                                <Form.Control 
                                type='relationship' 
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
                        <Form onSubmit={createsubmitHandler}>
                        <Form.Row>
                            <Form.Group  className="col-md-4" controlId='firstname'>
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control 
                                type='firstname' 
                            
                                placeholder='Enter Firstname'
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-4" controlId='lastname'>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control 
                                type='lastname' 
                                
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
                                type='contact' 
                                placeholder='Enter Contact'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-6" controlId='relationship'>
                                <Form.Label>Relationship</Form.Label>
                                <Form.Control 
                                type='relationship' 
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
                
            </Col>
        </Row>
        </>
    )
}

export default NextOfKinScreen
