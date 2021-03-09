import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Form, Button, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllEmployeeLeaveApplications, updateEmployeeLeaveApplicationId } from '../actions/leaveApplication';
import SearchBox from '../components/SearchBox';
import Paginate from '../components/Paginate';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const AllLeaveApplications = ({ history, match }) => {
	const [leaveStatus, setLeaveStatus] = useState('')
  const [id, setId] = useState('')

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
  const { myLeave, data, pages, page } = getLeaveAppDetails

  const updateLeaveApp = useSelector(state => state.updateLeaveApp)
  const {  error:errorUpdate, success:successUpdate } = updateLeaveApp


  useEffect(() => {

    if (userInfo  && (userInfo.role === 'hr' || userInfo.role === 'hr-manager' || userInfo.role === 'admin')) {
       dispatch(getAllEmployeeLeaveApplications(keyword, pageNumber))
    } else {
      history.push('/')
    }
  }, [dispatch, history, data, userInfo, keyword, pageNumber])



  return (
    <>     
    	<Row className='ml-4 mr-4 py-4 all-leave-wrapper'>
				<Col md={2} className='d-none d-md-block'>
          <FixedNavbar />
        </Col>
        <Col className='col-xs-12 col-md-10'>
          <Header />
					<h1 className='page-header'>Leave Applications</h1>
					<SearchBox history={history} url={'/leaveapplications'} />
					<Table striped bordered hover size="sm" className='myleave-table'>
        <thead>
          <tr>
            <th>Date Applied</th>
						<th>Email Address</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>Leave Status</th>
						<th>Update</th>
          </tr>
        </thead>
        <tbody>
				{data.map(user => (
          <tr key={user._id}>
            <td>{moment(user.createdAt).format("DD-MM-YYYY")}</td>
						<td>{user.employee.email}</td>
						<td>{user.leaveType}</td>
						<td>{moment(user.fromDate).format("DD-MM-YYYY")}</td>
            <td>{user.leaveStatus}</td>
						<td>
              <NavLink to={`/myleave/${user._id}/update`} exact className="update-btn">
                Update
              </NavLink>
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