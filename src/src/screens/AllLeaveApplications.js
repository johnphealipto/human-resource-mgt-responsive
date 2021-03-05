import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployeeLeaveApplicationId } from '../actions/leaveApplication';
import SearchBox from '../components/SearchBox';
import Paginate from '../components/Paginate';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const AllLeaveApplications = ({ history, match }) => {
	const [leaveStatus, setLeaveStatus] = useState('')

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
  }

  return (
    <>     
    	<Row className='ml-4 mr-4 py-4 profilescreen-wrapper all-leaves'>
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
						<th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
						<th>...</th>
          </tr>
        </thead>
        <tbody>
				{data.map(user => (
          <tr key={user._id}>
						<td>{userInfo.email}</td>
						<td>{user.leaveType}</td>
						<td>{user.fromDate}</td>
						<td>{user.toDate}</td>
						<td>{user.reasonForLeave}</td>
            <td>
							<Form.Control 
								as="select" 
								defaultValue="Pending" 
								custom className='approveleave-selectinput'
								// value={leaveStatus}
								// onChange={(e) => setLeaveStatus(e.target.value)}
							>
									<option value="pending">Pending</option>
									<option value="approved">Approved</option>
									<option value="declined">Declined</option>
									<option value="awaitingConfirmation">Awaiting Confirmation</option>
    					</Form.Control>
        		</td>
						<td>
							<Button>
								Post
							</Button>
						</td>
          </tr>
					))}
        </tbody>
      </Table>
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