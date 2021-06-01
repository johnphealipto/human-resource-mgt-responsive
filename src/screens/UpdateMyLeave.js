import React, { useState, useEffect } from 'react';
import { Col, Form, Button, Modal} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllEmployeeLeaveApplicationById, rejectEmployeeLeaveApplicationId, updateEmployeeLeaveApplicationId } from '../actions/leaveApplication';
import { LEAVE_APPLICATION_UPDATE_EMPLOYEE_RESET, LEAVE_APPLICATION_DETAILS_ID_RESET, LEAVE_APPLICATION_REJECT_RESET } from '../constants/leaveApplicationConstants';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const UpdateMyLeave = ({ history, match }) => {
  const leaveApplicationId = match.params.id

	const [leaveType, setLeaveType] = useState('')
  const [fromDate, setLeaveStartDate] = useState('')
  const [toDate, setLeaveEndDate] = useState('')
  const [noOfDays, setNoOfDays] = useState(0)
  const [reasonForLeave, setLeaveDescription] = useState('')
  const [leaveStatus, setLeaveStatus] = useState('')
  const [approved, setApproved] = useState(false)
  const [rejected, setRejected] = useState(false)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  } 

	const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const leaveApplicationDetailsById = useSelector(state => state.leaveApplicationDetailsById)
    const { leaveapplication } = leaveApplicationDetailsById

  const updateLeaveApp = useSelector(state => state.updateLeaveApp)
  const { success:successUpdate, error:errorUpdate } = updateLeaveApp

  const rejectLeave = useSelector(state => state.rejectLeave)
  const { success:successReject, error:errorReject } = rejectLeave


  useEffect(() => {
    if (userInfo  && (userInfo.role === 'Human Resource Executive' || userInfo.role === 'CEO' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources')) {
       if(successUpdate || successReject) {
          dispatch({
              type: LEAVE_APPLICATION_UPDATE_EMPLOYEE_RESET
          })
          dispatch({
              type: LEAVE_APPLICATION_DETAILS_ID_RESET
          })
          dispatch({
            type: LEAVE_APPLICATION_REJECT_RESET
          })
          history.push('/leaveapplications')
      } else {
      if(!leaveapplication || !leaveapplication.leaveType || leaveapplication._id !== leaveApplicationId) {
        dispatch(
        getAllEmployeeLeaveApplicationById(leaveApplicationId)
      )
       } else {
        setLeaveType(leaveapplication.leaveType)
        setLeaveStartDate(moment(leaveapplication.fromDate).format("YYYY-MM-DD"))
        setLeaveEndDate(moment(leaveapplication.toDate).format("YYYY-MM-DD"))
        setNoOfDays(leaveapplication.noOfDays)
        setLeaveDescription(leaveapplication.reasonForLeave)
        setLeaveStatus(leaveapplication.leaveStatus)
        setApproved(leaveapplication.finalApproval)
        setRejected(leaveapplication.rejected)
     
      }
    }
    } else {
      history.push('/')
    }
   
    
   
      
  }, [history, userInfo, leaveApplicationId, leaveapplication, successUpdate, successReject, dispatch])

	
	const updateMyLeaveHandler = (e) => {
    e.preventDefault(e)
		dispatch(updateEmployeeLeaveApplicationId({
      _id: leaveApplicationId,
    }))
    // history.push('/leaveapplications')
  }

  const handleReject = (e) => {
    e.preventDefault(e)
    dispatch(rejectEmployeeLeaveApplicationId({
      _id: leaveApplicationId,
    }))
  }

  // ---- For the FixedNavBar
  const [sidebarOpen, setSidebarOpen] = useState(false);
    
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };


  return (
    <>     

      <div className="dashboard-container">
        <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <FixedNavbar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <main className='profilescreen-wrapper'>
          <div className="dashboard-body">
            <div className='allLeave-title'>
          <h3>FINAL LEAVE APPROVAL</h3>
          </div>
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {errorReject && <Message variant='danger'>{errorReject}</Message>}
          <Form onSubmit={updateMyLeaveHandler} className='form-shadow'>
            
            <Form.Row>
              <Form.Group as={Col} controlId="leaveType">
                <Form.Label>Leave Type</Form.Label>
                <Form.Control 
									type='text'
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  disabled
                   >
                </Form.Control>
            </Form.Group>
                <Form.Group as={Col} controlId='noOfDays'>
                  <Form.Label>No Of Days</Form.Label>
                  <Form.Control type='number' placeholder='0'  value={noOfDays}
                    onChange={(e) => setNoOfDays(e.target.value)} disabled></Form.Control>
                </Form.Group>
              </Form.Row>
              
              <Form.Row>
              <Form.Group as={Col} controlId='startDate'>
								<Form.Label>Start Date</Form.Label>
								<Form.Control 
									type='date'
                  value={fromDate}
                  onChange={(e) => setLeaveStartDate(e.target.value)}
                  disabled
									>
								</Form.Control>
							</Form.Group>
							<Form.Group as={Col} controlId='endDate'>
								<Form.Label>End Date</Form.Label>
								<Form.Control 
									type='date'
                  value={toDate}
                  onChange={(e) => setLeaveEndDate(e.target.value)}
									disabled
								></Form.Control>
							</Form.Group>
              </Form.Row>
              <Form.Group controlId='description'>
                <Form.Label>Detailed Reason For Leave Application</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  style={{ backgroundColor: 'var(--input-field-color)' }}
                  value={reasonForLeave}
                  onChange={(e) => setLeaveDescription(e.target.value)}
                  disabled/>
              </Form.Group>
              {
              approved ? (
                <Link to='/leaveapplications' className='btn btn-light my-3 go-back-btn'>
                    APPROVED || Go Back
                </Link>
              ) : rejected ? (
                <Link to='/leaveapplications' className='btn btn-light my-3 go-back-btn'>
                    REJECTED || Go Back
                </Link>
              ) :
                <>
                  <Button className='applyleave-btn mb-2 mr-3' type='submit'>
                    Approve
                  </Button>
                  <Button className='mb-2 rejectleave-btn' onClick={handleShow} >
                    Reject
                  </Button>
                   <Modal show={show} onHide={handleClose}>
                  <div className='not-eligible'>
              <div className='not-eligible-container'>
        <Modal.Header closeButton>
         
          <Modal.Title>Reject Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
                <i className="fas fa-exclamation-triangle fa-2x pb-3"></i><br/>
          <p><h3>Are you sure you want to Reject!</h3></p>
         
          </Modal.Body>
        <Modal.Footer>
          <Button className='mb-2 rejectleave-btn' style={{ backgroundColor: '#e2522e', borderRadius: 50 }}  onClick={handleReject}>
            Reject
          </Button>
        </Modal.Footer>
         </div>
          </div>
      </Modal>
                </>
            }
          </Form>
            </div>
            <Footer />
        </main>
	    </div>
    	
    </>
  )
}

export default UpdateMyLeave;