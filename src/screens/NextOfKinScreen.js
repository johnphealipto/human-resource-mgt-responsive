import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux'
import { createNextOfKin, getNextOfKinDetails, updateNextOfKin } from '../actions/nextOfKinActions'
import { NOK_CREATE_RESET, NOK_DETAILS_RESET, NOK_UPDATE_RESET } from '../constants/nextOfKinConstants'
import '../styles/ProfileScreen.css';
import Loader from '../components/Loader';

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
    const { nextOfKin } = nextOfKinDetails

    const nextOfKinUpdate = useSelector(state => state.nextOfKinUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = nextOfKinUpdate

    const nextOfKinCreate = useSelector(state => state.nextOfKinCreate)
    const { loading:loadingCreate, error:errorCreate, success:successCreate } = nextOfKinCreate

  

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
         <div className="profilescreen-wrapper mt-3">
                {loadingUpdate && <Loader />}
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {successUpdate && <Message variant='success'>Profile Updated</Message>}
                {
                    nextOfKin ? (
                        <Form onSubmit={submitHandler} className="form-shadow">
                            <Form.Group controlId='firstname'>
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control 
                                type='text' 
                                placeholder='Enter Firstname'
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='lastname'>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control 
                                type='text' 
                                placeholder='Enter Lastname'
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control 
                                type='email' 
                                placeholder='Enter  Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId='contact'>
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control 
                                type='text' 
                                placeholder='Enter Contact'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='relationship'>
                                <Form.Label>Relationship</Form.Label>
                                <Form.Control 
                                type='text' 
                                placeholder='Enter Relationship'
                                value={relationship}
                                onChange={(e) => setRelationship(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                    
                        <Button type='submit' variant='primary' className='btn-block'>
                            Update
                        </Button>
                    </Form>
                    ) : (
                        <Form onSubmit={createsubmitHandler} className="form-shadow">
                        <Form.Group controlId='firstname'>
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control 
                                type='text' 
                                placeholder='Enter Firstname'
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='lastname'>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control 
                                type='text' 
                                placeholder='Enter Lastname'
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control 
                                type='email' 
                                placeholder='Enter  Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId='contact'>
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control 
                                type='text' 
                                placeholder='Enter Contact'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='relationship'>
                                <Form.Label>Relationship</Form.Label>
                                <Form.Control 
                                type='text' 
                                placeholder='Enter Relationship'
                                value={relationship}
                                onChange={(e) => setRelationship(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        <Button type='submit' variant='primary' className='btn-block'>
                            Create
                        </Button>
                    </Form>
                    )
                }
                
           
	</div>
    )
}

export default NextOfKinScreen
