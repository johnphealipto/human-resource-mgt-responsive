import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Paginate from '../components/Paginate';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';
import { getAllAgentApplication } from '../actions/agentLeaveActions';

const AllAgentLeaveApplicationsScreen = ({ history, match }) => {
  const keyword = match.params.keyword || ''
	const pageNumber = match.params.pageNumber || 1
	const employees = 'allagentleaveapplications'
	const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

	const allAgentLeaveApplications = useSelector(state => state.allAgentLeaveApplications)
  const { data, pages, page } = allAgentLeaveApplications



  useEffect(() => {

    if (userInfo  && (userInfo.role === 'Human Resource Executive' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources')) {
       dispatch(getAllAgentApplication(pageNumber))
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
					  <h3>Agent Leave Applications</h3>  
          </div>
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
                <NavLink to={`/myteamleaveapplications/${user._id}/update`} exact className="update-btn">
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
      </div>
    </main>
	</div>
  )
}

export default AllAgentLeaveApplicationsScreen;