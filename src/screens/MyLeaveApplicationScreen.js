import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { MYLEAVE_CREATE_RESET, MYLEAVE_DETAILS_RESET, MYLEAVE_UPDATE_RESET } from '../constants/myLeaveConstants'
import { createMyLeave, getMyLeaveDetails, updateMyLeave } from '../actions/myLeaveActions';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const MyLeaveApplicationScreen = ({ history }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [leaveType, setLeaveType] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [reasonForLeave, setReasonForLeave] = useState('')

  const dispatch = useDispatch()

  // const myLeaveList = useSelector(state => state.myLeaveList)
  // const { error, data } = myLeaveList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const myLeaveDetails = useSelector(state => state.myLeaveDetails)
  const { loading, myleave } = myLeaveDetails

  const myLeaveUpdate = useSelector(state => state.myLeaveUpdate)
  const {  error:errorUpdate, success:successUpdate } = myLeaveUpdate

  const myLeaveCreate = useSelector(state => state.myLeaveCreate)
  const { error:errorCreate, success:successCreate } = myLeaveCreate
    

  useEffect(() => {

    if(!userInfo) {
      history.push('/')
    } else {
        if(successUpdate || successCreate) {
          dispatch({
            type: MYLEAVE_UPDATE_RESET
          })
          dispatch({
            type: MYLEAVE_CREATE_RESET
          })
          dispatch({
            type: MYLEAVE_DETAILS_RESET
          })
          history.push('/')
        } 
        else {
          if(!myleave || !myleave.leaveType) {
            dispatch(getMyLeaveDetails())
          } 
          else {
            setLeaveType(myleave.leaveType)
            setFromDate(myleave.fromDate)
            setToDate(myleave.toDate)
            setReasonForLeave(myleave.reasonForLeave)
          }
        }
      }
}, [dispatch, history, myleave, successUpdate, successCreate, userInfo])


const submitHandler= (e) => {
  e.preventDefault()
  // Create Actions
  dispatch(createMyLeave(
    leaveType,
    fromDate,
    toDate,
    reasonForLeave
  ))
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
        <Modal.Header closeButton>
          <Modal.Title>Apply for Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formGridState">
              <Form.Label>Leave Type</Form.Label>
              <Form.Control 
                as="select" 
                defaultValue="select" 
                custom
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}>
                <option value='Paid-Leave'>Paid Leave</option>
                <option value='Sick-Leave'>Sick Leave</option>
                <option value='Maternity-Leave'>Maternity Leave</option>
                <option value='Paternity-Leave'>Paternity Leave</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='fromDate'>
              <Form.Label>Start Date</Form.Label>
              <Form.Control 
                type='date' 
                placeholder='Start Date'
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='toDate'>
              <Form.Label>End Date</Form.Label>
              <Form.Control 
                type='date' 
                placeholder='End Date'
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Reason</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Detailed reason for leave application" 
                value={reasonForLeave}
                onChange={(e) => setReasonForLeave(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control placeholder="Pending" disabled />
            </Form.Group> <hr />
            <Button type='submit' onClick={handleClose} className='applyleave-btn'>
              Apply
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
    <>
      <Table striped bordered hover size="sm" className='myleave-table'>
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Duration</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sick Leave</td>
            <td>4th Feb, 2021</td>
            <td>Malaria</td>
          </tr>
          {/* {myleave.map(user => (
          <tr key={user._id}>
            <td>{user.leaveType}</td>
            <td>{user.fromDate} - {user.toDate}</td>
            <td>{user.reasonForLeave}</td>
            <td>
              <Button variant='light' className='btn-sm'>
                <i class="fas fa-trash-alt"></i>
              </Button>          
            </td>
          </tr>
          ))} */}
        </tbody>
      </Table>
    </>
    </Container>
				</div>
      	</Col>
      </Row>
    </>
  )
}

export default MyLeaveApplicationScreen;