import React, { useState, useEffect } from 'react';
import { Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';
import { AGENT_LEAVE_APPLICATION_DETAILS_ID_RESET, LEAVE_APPLICATION_UPDATE_AGENT_RESET } from '../constants/agentLeaveContants';
import { getAgentLeaveApplicationById, updateAgentLeaveApplicationId } from '../actions/agentLeaveActions';
import Message from '../components/Message';

const UpdateTeamApplicationScreen = ({ history, match }) => {
  const leaveApplicationId = match.params.id

	const [leaveType, setLeaveType] = useState('')
    const [fromDate, setLeaveStartDate] = useState('')
    const [toDate, setLeaveEndDate] = useState('')
    const [reasonForLeave, setLeaveDescription] = useState('')
    const [noOfDays, setNoOfDays] = useState(0)
    const [leaveStatus, setLeaveStatus] = useState('')

	const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const agentLeaveApplicationById = useSelector(state => state.agentLeaveApplicationById)
    const { leaveapplication } = agentLeaveApplicationById

  const updateAgentLeave = useSelector(state => state.updateAgentLeave)
  const { success:successUpdate, error:errorUpdate } = updateAgentLeave


  useEffect(() => {
    if (userInfo  && (userInfo.role === 'Team Lead' || userInfo.role === 'Human Resource Executive' || userInfo.role === 'CEO' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources')) {
       if(successUpdate) {
          dispatch({
              type: LEAVE_APPLICATION_UPDATE_AGENT_RESET
          })
          dispatch({
              type: AGENT_LEAVE_APPLICATION_DETAILS_ID_RESET
          })
          history.push('/leaveapplications')
      } else {
      if(!leaveapplication || !leaveapplication.leaveType || leaveapplication._id !== leaveApplicationId) {
        dispatch(
        getAgentLeaveApplicationById(leaveApplicationId)
      )
       } else {
        setLeaveType(leaveapplication.leaveType)
        setLeaveStartDate(moment(leaveapplication.fromDate).format("YYYY-MM-DD"))
        setLeaveEndDate(moment(leaveapplication.toDate).format("YYYY-MM-DD"))
        setLeaveDescription(leaveapplication.reasonForLeave)
        setLeaveStatus(leaveapplication.leaveStatus)
        setNoOfDays(leaveapplication.noOfDays)
     
      }
    }
    } else {
      history.push('/')
    }    
  }, [history, userInfo, leaveApplicationId, leaveapplication, successUpdate, dispatch])



	
	const updateMyLeaveHandler = (e) => {
    e.preventDefault(e)
		dispatch(updateAgentLeaveApplicationId({
      _id: leaveApplicationId,
			leaveType,
      fromDate,
      toDate,
      noOfDays,
      reasonForLeave,
      leaveStatus
    }))
    history.push('/myteamapplications')
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
          <h3>Change Leave Status</h3>
          </div> 
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          <Form onSubmit={updateMyLeaveHandler} className='form-shadow'>
            
          <Form.Row>
              <Form.Group as={Col} controlId="leaveType">
                <Form.Label>Leave Type</Form.Label>
                <Form.Control 
									type='text'
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                   >
                </Form.Control>
            </Form.Group>
                <Form.Group as={Col} controlId='noOfDays'>
                  <Form.Label>No Of Days</Form.Label>
                  <Form.Control type='number' placeholder='0'  value={noOfDays}
                    onChange={(e) => setNoOfDays(e.target.value)}></Form.Control>
                </Form.Group>
              </Form.Row>
              
              <Form.Row>
              <Form.Group as={Col} controlId='startDate'>
								<Form.Label>Start Date</Form.Label>
								<Form.Control 
									type='date'
                  value={fromDate}
                  onChange={(e) => setLeaveStartDate(e.target.value)}
									>
								</Form.Control>
							</Form.Group>
							<Form.Group as={Col} controlId='endDate'>
								<Form.Label>End Date</Form.Label>
								<Form.Control 
									type='date'
                  value={toDate}
                  onChange={(e) => setLeaveEndDate(e.target.value)}
									
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
                  onChange={(e) => setLeaveDescription(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId='status'>
              <Form.Label>Status</Form.Label>
              <Form.Control 
                  as="select"
                  custom 
                  size='sm'
                  value={leaveStatus}
                  onChange={(e) => setLeaveStatus(e.target.value)}
                  >
                    <option value=''>Select Leave Status</option>
                    <option value='approved'>APPROVED</option>
                    <option value='reject'>REJECTED</option>
                    <option value='pending'>PENDING</option>
                </Form.Control>
            </Form.Group>
            <Button className='applyleave-btn mb-2 mr-3' type='submit'>
              Update
            </Button>
          </Form>
            </div>
        </main>
	    </div>
    </>
  )
}

export default UpdateTeamApplicationScreen;