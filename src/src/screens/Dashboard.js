import React, { useEffect } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import {  useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'

const Dashboard = ({ history }) => {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector(state => state.userDetails)
  const { user } = userDetails

  useEffect(() => {
    if(!userInfo) {
        history.push('/')
    } else {
        dispatch(getUserDetails())
    }
  }, [history, dispatch, userInfo])

    
    return (
        <>
        <Row className='py-3 ml-3 mr-3 mt-15' >

        <Col md={4}>
        <Card style={{ width: '18rem' }}>
            
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                
            </Card.Body>
        </Card>
        </Col>
        <Col md={4}>
        <Card style={{ width: '18rem' }}>
            
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                
            </Card.Body>
        </Card>
        </Col>
        <Col md={4}>
        <Card style={{ width: '18rem' }}>
            
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                
            </Card.Body>
        </Card>
        </Col>
        </Row>
        <h1>{user.employee.email}</h1>
        </>
    )
}

export default Dashboard
