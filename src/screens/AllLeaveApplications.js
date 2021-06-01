import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllEmployeeLeaveApplications } from '../actions/leaveApplication';
import SearchBox from '../components/SearchBox';
import Paginate from '../components/Paginate';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const AllLeaveApplications = ({ history, match }) => {
  const keyword = match.params.keyword || ''
	const pageNumber = match.params.pageNumber || 1
	const employees = 'leaveapplications'
	const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

	const getLeaveAppDetails = useSelector(state => state.getLeaveAppDetails)
  const { data, pages, page } = getLeaveAppDetails



  useEffect(() => {

    if (userInfo  && (userInfo.role === 'Human Resource Executive' || userInfo.role === 'CEO' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources')) {
       dispatch(getAllEmployeeLeaveApplications(keyword, pageNumber))
    } else {
      history.push('/')
    }
  }, [dispatch, history, data, userInfo, keyword, pageNumber])



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
				<div className="leave-body all-leave-wrapper">
          <div className='allLeave-title'>
              <h3>Leave Applications</h3>
              <SearchBox history={history} url={'/leaveapplications'} />
            </div>
            <Table striped bordered hover size="sm" className='myleave-table'>
          <thead>
            <tr>
              <th>Email Address</th>
							<th>Leave Type</th>
							<th>Start Date</th>
							<th>N0: Days</th>
							<th>HOD Approval</th>
              <th>Final Approval</th>
							<th>Action</th>
            </tr>
          </thead>
          <tbody>
          {data.map(user => (
            <tr key={user._id}>
              <td>{user.employee.email}</td>
              <td>{user.leaveType}</td>
              <td>{moment(user.fromDate).format("DD-MM-YYYY")}</td>
              <td>{user.noOfDays}</td>
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
                <NavLink to={`/myleave/${user._id}/update`} exact className="update-btn">
                  View
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
        </div>
     </main>
	  </div>   
  )
}

export default AllLeaveApplications;