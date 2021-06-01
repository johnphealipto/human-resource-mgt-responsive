import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Table, Button, Modal, Form, Col } from 'react-bootstrap';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../components/Paginate';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';
import { createAgentLeaveApplication, getAgentApplication } from '../actions/agentLeaveActions';
import { baseUrl } from '../shared/baseUrl'
import Message from '../components/Message';

const AgentLeaveApplicationScreen = ({ history, match }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const [leaveType, setLeaveType] = useState('')
  const [fromDate, setLeaveStartDate] = useState('')
  const [toDate, setLeaveEndDate] = useState('')
  const [noOfDays, setNoOfDays] = useState(0)
  const [supervisor, setSupervisor] = useState('')
  const [reasonForLeave, setLeaveDescription] = useState('')
  const [leaveStatus] = useState('')
  const [teamLeadss, setTeamLeadss] = useState([])

  const pageNumber = match.params.pageNumber || 1
  const employees = 'myleave'
    
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const agentLeaveApp = useSelector(state => state.agentLeaveApp)
  const { data, pages, page } = agentLeaveApp

  const updateLeaveApp = useSelector(state => state.updateLeaveApp)
  const { success:successUpdate } = updateLeaveApp

  const createAgentLeave = useSelector(state => state.createAgentLeave)
  const { success:successCreate, error:errorCreate } = createAgentLeave

  const teamLeadList = useSelector(state => state.teamLeadList)
  const { loading, teamLeads } = teamLeadList


    useEffect(() => {

      if(userInfo && (userInfo.role === 'Agent')) {
          
          dispatch(getAgentApplication(pageNumber))
          // dispatch(listTeamLeads())
          // setTeamLeadss(teamLeads)

          const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
          }

        
        
          async function fetchData() {
            const request = await axios.get(
              baseUrl + '/api/v1/employees/teamleads', config)
            setTeamLeadss(request.data.data);
            return request;
          
          
          
          }
          fetchData();
      } else {
        history.push('/')
      }
  }, [dispatch, history, data, successCreate, successUpdate, userInfo, pageNumber])




  const createsubmitHandler= (e) => {
    e.preventDefault(e)
      
      dispatch(createAgentLeaveApplication(
        leaveType,
        fromDate,
        toDate,
        noOfDays,
        supervisor,
        reasonForLeave,
        leaveStatus
      ))
    
    
  }

  
  // --- Leave Application Eligibilty
  const dateJoined = new Date(userInfo.dateOfJoining);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate - dateJoined);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const daysLeft = 90 - diffDays


  // ---- For the FixedNavBar
  const [sidebarOpen, setSidebarOpen] = useState(false);
    
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
			<Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
			<FixedNavbar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
			<main>
				<div className="leave-body">
				<div className='allLeave-title'>
					  <h3>My Leave</h3>
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
          {(diffDays > 90) ? (
            
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
                    value={supervisor}
                    onChange={(e) => setSupervisor(e.target.value)}>
                      <option>Select Team Lead...</option>
                      {
                        teamLeadss.map(teamLead => (
                          <option key={teamLead._id} value={teamLead._id}>{teamLead.firstname} {teamLead.lastname}</option>
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
                  rows={3} 
                  style={{ backgroundColor: 'var(--input-field-color)' }}
                  value={reasonForLeave}
                  onChange={(e) => setLeaveDescription(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId='status'>
                <Form.Label>Status</Form.Label>
                <Form.Control placeholder="Pending" disabled />
              </Form.Group>
              <hr />
              <Button className='applyleave-btn mb-2 mr-3' type='submit' onClick={handleClose}>
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
                <code>You have {daysLeft} days left</code>
              </div>
              <hr />
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
            <th>Detailed Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user._id}>
              <td>{user.leaveType}</td>
              <td>{moment(user.fromDate).format("DD-MM-YYYY")}</td>
              <td>{moment(user.toDate).format("DD-MM-YYYY")}</td>
              <td>{user.reasonForLeave}</td>
              <td>{user.leaveStatus}</td>
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

export default AgentLeaveApplicationScreen;