import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Form, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployeeLeaveApplicationId, updateEmployeeLeaveApplicationId } from '../actions/leaveApplication';
import SearchBox from '../components/SearchBox';
import Paginate from '../components/Paginate';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const AllLeaveApplications = ({ history, match }) => {
	const [leaveType, setLeaveType] = useState('')
	const [fromDate, setLeaveStartDate] = useState('')
	const [toDate, setLeaveEndDate] = useState('')
	const [reasonForLeave, setLeaveDescription] = useState('')
	const [leaveStatus, setLeaveStatus] = useState('')

	const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const keyword = match.params.keyword || ''
	const pageNumber = match.params.pageNumber || 1
	const employees = 'leaveapplications'
	const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

	const getLeaveAppDetails = useSelector(state => state.getLeaveAppDetails)
  const { data, pages, page } = getLeaveAppDetails

  useEffect(() => {

    if(!userInfo) {
      history.push('/')
    } else {
			dispatch(getAllEmployeeLeaveApplicationId(keyword, pageNumber))
		}
  }, [dispatch, history, data, userInfo, keyword, pageNumber])

	
	const updateMyLeaveHandler= (e) => {
    e.preventDefault(e)
		dispatch(updateEmployeeLeaveApplicationId(
        leaveType,
        fromDate,
        toDate,
        reasonForLeave,
				leaveStatus
      ))
  }


  return (
    <>     
    	<Row className='ml-4 mr-4 py-4'>
				<Col md={2} className='d-none d-md-block'>
          <FixedNavbar />
        </Col>
        <Col className='col-xs-12 col-md-10'>
          <Header />
					<h1 className='page-header'>LEAVE APPLICATIONS</h1>
					<hr />
					<SearchBox history={history} />
					<Table striped bordered hover size="sm" className='myleave-table'>
        <thead>
          <tr>
						<th>Email Address</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>Reason</th>
						<th>Update</th>
          </tr>
        </thead>
        <tbody>
				{data.map(user => (
          <tr key={user._id}>
						<td>{userInfo.email}</td>
						<td>{user.leaveType}</td>
						<td>{user.fromDate}</td>
						<td>{user.reasonForLeave}</td>
						<td>
							<Button variant="primary" onClick={handleShow} className='applyleave applyleave-btn btn-sm'>
        				Update
      				</Button>
						</td>
          </tr>
					))}
        </tbody>
      </Table>
			{data.map(user => (
			<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
				className="myleave-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Leave Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
				
        <Form onSubmit={updateMyLeaveHandler} >
            
            <Form.Group controlId="leaveType">
                <Form.Label>Leave Type</Form.Label>
                <Form.Control 
									placeholder={user.leaveType}
                  disabled >
                </Form.Control>
            </Form.Group>
						<Form.Row>
							<Form.Group as={Col} controlId='startDate'>
								<Form.Label>Start Date</Form.Label>
								<Form.Control 
									placeholder={user.fromDate}
									disabled>
								</Form.Control>
							</Form.Group>
							<Form.Group as={Col} controlId='endDate'>
								<Form.Label>End Date</Form.Label>
								<Form.Control 
									placeholder={user.toDate}
									disabled
								></Form.Control>
							</Form.Group>
						</Form.Row>
            <Form.Group controlId='description'>
              <Form.Label>Detailed Reason For Leave Application</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                style={{ backgroundColor: 'var(--input-field-color)' }}
                placeholder={user.reasonForLeave}
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
                  onChange={(e) => setLeaveStatus(e.target.value)}>
                    <option value=''>Select Leave Status</option>
                    <option value='Approve'>Approve</option>
                    <option value='Decline'>Decline</option>
                    <option value='Awaitin-Confirmation'>Awaiting Confirmation</option>
                </Form.Control>
            </Form.Group>
            <hr />
            <Button className='applyleave-btn mb-2 mr-3' type='submit' onClick={handleClose}>
              Update
            </Button>
            <Button className='mb-2' variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Form>
					
        </Modal.Body>
      </Modal>
			))}

	  	<Paginate
				destination={employees}
				pages={pages} 
				page={page}
				keyword={keyword ? keyword : ''} />
      	</Col>
      </Row>
    </>
  )
}

export default AllLeaveApplications;