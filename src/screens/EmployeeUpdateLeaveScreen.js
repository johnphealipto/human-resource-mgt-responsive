import React, { useState, useEffect } from 'react';
import { Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { EMPLOYEE_UPDATE_LEAVE_APPLICATION_RESET, LEAVE_APPLICATION_DETAILS_ID_RESET } from '../constants/leaveApplicationConstants';
import { employeeUpdateApplication, getAllEmployeeLeaveApplicationById } from '../actions/leaveApplication';

const EmployeeUpdateLeaveScreen = ({ history, match }) => {
    const leaveApplicationId = match.params.id

	const [leaveType, setLeaveType] = useState('')
    const [fromDate, setLeaveStartDate] = useState('')
    const [toDate, setLeaveEndDate] = useState('')
    const [noOfDays, setNoOfDays] = useState(0)
    const [reasonForLeave, setLeaveDescription] = useState('')
    const [leaveStatus, setLeaveStatus] = useState('')
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const leaveApplicationDetailsById = useSelector(state => state.leaveApplicationDetailsById)
    const { leaveapplication } = leaveApplicationDetailsById

    const employeeUpdateLeave = useSelector(state => state.employeeUpdateLeave)
    const { success:successUpdate, error:errorUpdate } = employeeUpdateLeave

    useEffect(() => {
        if (userInfo) {
           if(successUpdate) {
              dispatch({
                  type: EMPLOYEE_UPDATE_LEAVE_APPLICATION_RESET
              })
              dispatch({
                  type: LEAVE_APPLICATION_DETAILS_ID_RESET
              })
              history.push('/myleave')
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
       
        
       
          
      }, [history, userInfo, leaveApplicationId, leaveapplication, successUpdate, dispatch])

      const updateMyLeaveHandler = (e) => {
        e.preventDefault(e)
            dispatch(employeeUpdateApplication({
          _id: leaveApplicationId,
          leaveType,
          fromDate,
          toDate,
          noOfDays,
          reasonForLeave,
        }))
        // history.push('/leaveapplications')
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
          <h1 className='page-header'>UPDATE LEAVE</h1>
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
                  onChange={(e) => setLeaveDescription(e.target.value)}
                  />
              </Form.Group>
              {
              approved ? (
                <Link to='/myleave' className='btn btn-light my-3 go-back-btn'>
                    APPROVED || Go Back
                </Link>
              ) : rejected ? (
                <Link to='/myleave' className='btn btn-light my-3 go-back-btn'>
                    REJECTED || Go Back
                </Link>
              ) :
                <>
                <Button className='applyleave-btn mb-2 mr-3' type='submit'>
                  Update
                </Button>
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

export default EmployeeUpdateLeaveScreen
