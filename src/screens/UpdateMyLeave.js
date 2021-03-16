import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllEmployeeLeaveApplicationById, updateEmployeeLeaveApplicationId } from '../actions/leaveApplication';
import { LEAVE_APPLICATION_UPDATE_EMPLOYEE_RESET, LEAVE_APPLICATION_DETAILS_ID_RESET } from '../constants/leaveApplicationConstants';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const UpdateMyLeave = ({ history, match }) => {
  const leaveApplicationId = match.params.id

	const [leaveType, setLeaveType] = useState('')
  const [fromDate, setLeaveStartDate] = useState('')
  const [toDate, setLeaveEndDate] = useState('')
  const [reasonForLeave, setLeaveDescription] = useState('')
  const [leaveStatus, setLeaveStatus] = useState('')

	const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const leaveApplicationDetailsById = useSelector(state => state.leaveApplicationDetailsById)
    const { leaveapplication } = leaveApplicationDetailsById

  const updateLeaveApp = useSelector(state => state.updateLeaveApp)
  const { success:successUpdate } = updateLeaveApp


  useEffect(() => {
    if (userInfo  && (userInfo.role === 'hr' || userInfo.role === 'hr-manager' || userInfo.role === 'admin')) {
       if(successUpdate) {
          dispatch({
              type: LEAVE_APPLICATION_UPDATE_EMPLOYEE_RESET
          })
          dispatch({
              type: LEAVE_APPLICATION_DETAILS_ID_RESET
          })
          history.push('/leaveapplications')
      } else {
      if(!leaveapplication || !leaveapplication.leaveType || leaveapplication._id !== leaveApplicationId) {
        dispatch(
        getAllEmployeeLeaveApplicationById(leaveApplicationId)
      )
       } else {
        setLeaveType(leaveapplication.leaveType)
        setLeaveStartDate(moment(leaveapplication.fromDate).format("DD-MM-YYYY"))
        setLeaveEndDate(moment(leaveapplication.toDate).format("DD-MM-YYYY"))
        setLeaveDescription(leaveapplication.reasonForLeave)
        setLeaveStatus(leaveapplication.leaveStatus)
     
      }
    }
    } else {
      history.push('/')
    }
   
    
   
      
  }, [history, userInfo, leaveApplicationId, leaveapplication, successUpdate, dispatch])


  // useEffect(() => {

  //   if(!userInfo) {
  //     history.push('/')
  //   } else {
  //     if(successUpdate) {
  //         dispatch({
  //             type: LEAVE_APPLICATION_UPDATE_EMPLOYEE_RESET
  //         })
  //         dispatch({
  //             type: LEAVE_APPLICATION_DETAILS_RESET
  //         })
  //         history.push('/')
  //     } else {
  //       if(!myLeave || !myLeave.leaveStatus) {
  //         dispatch(getAllEmployeeLeaveApplicationById(keyword, pageNumber))
  //       } else {
  //         setLeaveStatus(myLeave.leaveStatus)
  //       }
  //     }
  //   }
  // }, [dispatch, history, data, userInfo, keyword, pageNumber])

	
	const updateMyLeaveHandler = (e) => {
    e.preventDefault(e)
		dispatch(updateEmployeeLeaveApplicationId({
      _id: leaveApplicationId,
			leaveType,
      fromDate,
      toDate,
      reasonForLeave,
      leaveStatus
    }))
    history.push('/leaveapplications')
    console.log(`Leave Status: ${leaveStatus}, id: ${leaveApplicationId}`)
  }


  return (
    <>     
    	<Row className='ml-4 mr-4 py-4 profilescreen-wrapper'>
				<Col md={4} lg={2} className='d-none d-md-block'>
          <FixedNavbar />
        </Col>
        <Col xs={12} md={8} lg={10}>
          <Header />
			  <h1 className='page-header'>Change Leave Status</h1>
        <Form onSubmit={updateMyLeaveHandler} className='form-shadow'>
            
            <Form.Group controlId="leaveType">
                <Form.Label>Leave Type</Form.Label>
                <Form.Control 
									// placeholder={leaveType}
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  disabled >
                </Form.Control>
            </Form.Group>
						<Form.Row>
							<Form.Group as={Col} controlId='startDate'>
								<Form.Label>Start Date</Form.Label>
								<Form.Control 
									// placeholder={fromDate}
                  value={fromDate}
                  onChange={(e) => setLeaveStartDate(e.target.value)}
									disabled>
								</Form.Control>
							</Form.Group>
							<Form.Group as={Col} controlId='endDate'>
								<Form.Label>End Date</Form.Label>
								<Form.Control 
									// placeholder={user.toDate}
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
                rows={2} 
                // style={{ backgroundColor: 'var(--input-field-color)' }}
                // placeholder={user.reasonForLeave}
                value={reasonForLeave}
                onChange={(e) => setLeaveDescription(e.target.value)}
                disabled
							/>
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
					
      	</Col>
      </Row>
    </>
  )
}

export default UpdateMyLeave;