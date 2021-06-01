import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Col } from 'react-bootstrap';
import moment from 'moment';
import { createLeaveApplication, getMyLeaveApplication } from '../actions/leaveApplication';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../components/Paginate';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';
import axios from 'axios'
import { baseUrl } from '../shared/baseUrl'
import Message from '../components/Message';
import { LEAVE_APPLICATION_CREATE_RESET } from '../constants/leaveApplicationConstants';
import { Link } from 'react-router-dom';

const MyLeaveApplicationScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  } 
  
  const [leaveType, setLeaveType] = useState('')
  const [fromDate, setLeaveStartDate] = useState('')
  const [toDate, setLeaveEndDate] = useState('')
  const [reasonForLeave, setLeaveDescription] = useState('')
  const [reportsTo, setReportsTo] = useState('')
  const [noOfDays, setNoOfDays] = useState(0)
  const [leaveStatus] = useState('')
  const [hods, setHods] = useState([])
  const [headeHR, setHeadHR] = useState('')
  const [superadmins, setSuperAdmins] = useState([])

  const pageNumber = match.params.pageNumber || 1
  const employees = 'agentleave'
    
  

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const leaveAppDetails = useSelector(state => state.leaveAppDetails)
  const { data, pages, page } = leaveAppDetails

  const updateLeaveApp = useSelector(state => state.updateLeaveApp)
  const { success:successUpdate } = updateLeaveApp

  const createLeaveApp = useSelector(state => state.createLeaveApp)
  const { success:successCreate, error:errorCreate } = createLeaveApp


    useEffect(() => {

      if(!userInfo) {
          history.push('/')
      } else {
          if(successCreate || successUpdate) {
            dispatch({
              type: LEAVE_APPLICATION_CREATE_RESET
            })
            
            handleClose()
          } else {
            dispatch(getMyLeaveApplication(pageNumber))

            const config = {
              headers: {
                  Authorization: `Bearer ${userInfo.token}`
              }
            }
    
            async function fetchHODS() {
              const request = await axios.get(
                baseUrl + '/api/v1/employees/hods', config)
              setHods(request.data.data);
              return request;
            
            }
            async function fetchAdmins() {
              const request = await axios.get(
                baseUrl + '/api/v1/employees/superadmins', config)
              setSuperAdmins(request.data.data);
              return request;
            
            }

            fetchHODS();
            fetchAdmins();


          }
            

          
          
         
      }
  }, [dispatch, history, data, successCreate, successUpdate, userInfo, pageNumber])




  const createsubmitHandler= (e) => {
    e.preventDefault(e)
   
      dispatch(createLeaveApplication(
        leaveType,
        fromDate,
        toDate,
        noOfDays,
        reportsTo,
        reasonForLeave,
        leaveStatus
      ))  
  }

  // --- Leave Application Eligibilty
  const dateJoined = new Date(userInfo.dateOfJoining);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate - dateJoined);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const daysLeft = 365 - diffDays;


  // ---- For the FixedNavBar
  const [sidebarOpen, setSidebarOpen] = useState(false);
    
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const dropDown = (hods) => {
    hods?.map(hod => (
      <h1 key={hod._id}> {hod.firstname}</h1>
     ))
  }

  return (
    <div className="dashboard-container">
			<Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
			<FixedNavbar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
			<main className='profilescreen-wrapper'>
				<div className="leave-body">
				<div className='allLeave-title'>
          <>
					  <h3>My Leave</h3>
            <p>{userInfo.firstname}'s leave details</p>
          </>
					  <Button onClick={handleShow} className='applyleave-btn'>
              Apply Leave
            </Button>
          </div>
					<div className='myleave-wrapper'>
      <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="myleave-modal">
        <Modal.Header closeButton>
          <Modal.Title>Apply for Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
          {(diffDays > 365) ? (
            <Form onSubmit={createsubmitHandler}>
              <Form.Group controlId="leaveType">
                <Form.Label>Leave Type</Form.Label>
                <Form.Control 
                  as="select"
                  custom 
                  size='sm'
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}>
                    <option value=''>Select Leave Type...</option>
                    <option value='Sick-Leave'>Sick Leave</option>
                    <option value='Paid-Leave'>Paid Leave</option>
                    <option value='Casual-Leave'>Casual Leave</option>
                    <option value='Compassionate-Leave'>Compassionate-Leave</option>
                    <option value='Maternity-Leave'>Maternity Leave</option>
                    <option value='Other'>Other</option>
                </Form.Control>
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="reportsTo">
                  <Form.Label>Reports To</Form.Label>
                  <Form.Control 
                    as="select"
                    custom 
                    size='sm'
                    value={reportsTo}
                    onChange={(e) => setReportsTo(e.target.value)}>
                      <option>Reports To...</option>
                      {(userInfo.role === 'Head Of Department' || userInfo.role === 'Super Admin') ?
                        superadmins.map(superadmin => (
                          <option key={superadmin._id} value={superadmin._id}>{superadmin.firstname} {superadmin.lastname}</option>
                        ))
                        : 
                        hods.map(hod => (
                          <option key={hod._id} value={hod._id}>{hod.firstname} {hod.lastname}</option>
                        ))
                      }
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
                  <Form.Control type='date' placeholder='Start Date'  value={fromDate}
                    onChange={(e) => setLeaveStartDate(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId='endDate'>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type='date' placeholder='End Date'  value={toDate}
                    onChange={(e) => setLeaveEndDate(e.target.value)}></Form.Control>
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
              <hr />
              <Button className='applyleave-btn mb-2 mr-3' type='submit'>
                Apply
              </Button>
              <Button className='mb-2' variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Form>
           ) : (
            <div className='not-eligible'>
              <div className='not-eligible-container'>
                <i className="fas fa-exclamation-triangle fa-2x pb-3"></i>
                <h2>Not eligible</h2>
                <p>You have <code>{daysLeft}</code> days left</p>
              </div>
              <hr/>
              <Button className='mb-2' variant="secondary" onClick={handleClose}>
                Close
              </Button>
              
            </div>
          )}
        
        </Modal.Body>
      </Modal>
    </>

      <Table striped bordered hover size="sm" className='myleave-table'>
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>HOD Approval</th>
            <th>Final Approval</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>

          {data.map(user => (
            <tr key={user._id}>
              <td>{user.leaveType}</td>
              <td>{moment(user.fromDate).format("DD-MM-YYYY")}</td>
              <td>{moment(user.toDate).format("DD-MM-YYYY")}</td>
              <td>
                {user.hodApproval ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                ) : (
                    <i className='fas fa-times' style={{  color: 'red' }}></i>
                )}
              </td>
              <td>
                {user.finalApproval ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                ) : (
                    <i className='fas fa-times' style={{  color: 'red' }}></i>
                )}
              </td>
              <td>
                {
                  user.hodApproval && user.finalApproval ? (
                    <p>APPROVED</p>
                  ) : user.hodApproval ? (
                    <p>PENDING</p>
                  ) : user.rejected ? (
                    <p>REJECTED</p>
                  ) : (
                    <Link to={`/employeeupdateleave/${user._id}/update`} exact className="update-btn">
									    UPDATE
							      </Link>
                  )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Paginate
        destination={employees}
        pages={pages} 
        page={page} />			
    		</div>
            </div>
        </main>
	  </div>
  );
}

export default MyLeaveApplicationScreen;