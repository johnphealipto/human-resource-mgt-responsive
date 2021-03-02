import React, { useState, useEffect } from 'react'
import { Container, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LEAVE_APPLICATION_CREATE_RESET, LEAVE_APPLICATION_DETAILS_RESET, LEAVE_APPLICATION_UPDATE_EMPLOYEE_RESET } from '../constants/leaveApplicationConstants'
import { createLeaveApplication, getMyLeaveApplication, updateEmployeeLeaveApplicationId } from '../actions/leaveApplication'
import { useDispatch, useSelector } from 'react-redux'
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const MyLeaveApplicationScreen = ({ history }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
    const [leaveType, setLeaveType] = useState('')
    const [fromDate, setLeaveStartDate] = useState('')
    const [toDate, setLeaveEndDate] = useState('')
    const [reasonForLeave, setLeaveDescription] = useState('')
    const [status, setLeaveStatus] = useState('')
     
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const getLeaveAppDetails = useSelector(state => state.getLeaveAppDetails)
    const { loading, data, } = getLeaveAppDetails

    const updateLeaveApp = useSelector(state => state.updateLeaveApp)
    const {  error:errorUpdate, success:successUpdate } = updateLeaveApp

    const createLeaveApp = useSelector(state => state.createLeaveApp)
    const { error:errorCreate, success:successCreate } = createLeaveApp

    

    



    useEffect(() => {

      if(!userInfo) {
          history.push('/')
      } else {
        dispatch(getMyLeaveApplication())
        console.log(data)
          // if(!leaveapplication) {
          //     dispatch(getMyLeaveApplication())
          //     console.log(leaveapplication)
          //     if(successUpdate || successCreate) {
          //       dispatch({
          //           type: LEAVE_APPLICATION_UPDATE_EMPLOYEE_RESET
          //       })
          //       dispatch({
          //           type: LEAVE_APPLICATION_DETAILS_RESET
          //       })
          //       dispatch({
          //           type:LEAVE_APPLICATION_CREATE_RESET
          //       })
          //       // history.push('/home')
          //   } 
  
          // } else {
          //     setLeaveType(leaveapplication.leaveType)
          //     setLeaveStartDate(leaveapplication.fromDate)
          //     setLeaveEndDate(leaveapplication.toDate)
          //     setLeaveDescription(leaveapplication.reasonForLeave)
          //     setLeaveStatus(leaveapplication.status)

          // }
  }
  }, [dispatch, history, data, successCreate, successUpdate, userInfo])




    const createsubmitHandler= (e) => {
      e.preventDefault(e)
      dispatch((
         leaveType,
         fromDate,
         toDate,
         reasonForLeave
        ))
      console.log(`type: ${leaveType}, from: ${fromDate}, to: ${toDate}, reason: ${reasonForLeave}`)
     
  }

  return (
    <>     
    	<Row className='ml-4 mr-4 py-4 profilescreen-wrapper'>
				<Col md={2} className='d-none d-md-block'>
          <FixedNavbar />
        </Col>
        <Col className='col-xs-12 col-md-10'>
          <Header />
					<h1 className='page-header'>MY LEAVE</h1>
					<hr />
					<div className='myleave-wrapper'>
          <Container>
      <>
      <Button variant="primary" onClick={handleShow} className='applyleave applyleave-btn'>
        Apply Leave
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="myleave-modal"
      >
        <Form onSubmit={createsubmitHandler}>

        <Modal.Header closeButton>
          <Modal.Title>Apply for Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            
            <Form.Group className="col-md-4" controlId="formGridState leaveType">
                <Form.Label>Leave Type</Form.Label>
                <Form.Control 
                as="select" 
                size='sm'
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}>
                    <option value=''>Select...</option>
                    <option value='sick'>Sick Leave</option>
                    <option value='wedding'>Wedding</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='startDate'>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type='date' placeholder='Start Date'  value={fromDate}
                                onChange={(e) => setLeaveStartDate(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='endDate'>
              <Form.Label>End Date</Form.Label>
              <Form.Control type='date' placeholder='End Date'  value={toDate}
                                onChange={(e) => setLeaveEndDate(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Reason</Form.Label>
              <Form.Control type="text" placeholder="Detailed reason for leave application"  value={reasonForLeave}
                                onChange={(e) => setLeaveDescription(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='status'>
              <Form.Label>Status</Form.Label>
              <Form.Control placeholder="Pending" disabled  value={status}
                                onChange={(e) => setLeaveStatus(e.target.value)}  />
            </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className='applyleave-btn' type='submit' onClick={handleClose}>
            Submit
          </Button>
          
        </Modal.Footer>
        </Form>
      </Modal>
    </>

      <Table striped bordered hover size="sm" className='myleave-table'>
        <thead>
          <tr>
            <th>Date Applied</th>
            <th>Leave Type</th>
            <th>Duration</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            {data.map(user => (
                <tr key={user._id}>
                    <td>{user.leaveType}</td>
                    <td>{user.fromDate}</td>
                    <td>{user.toDate}</td>
                    <td>{user.reasonForLeave}</td>
                    <td>{user.leaveStatus}</td>
                </tr>
            ))}
        </tbody>
      </Table>
    </Container>			
    		</div>
      	</Col>
      </Row>
    </>
  );
}

export default MyLeaveApplicationScreen;