import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';
import "../styles/ChatScreen.css";
import Paginate from '../components/Paginate';
import { getAllChatMessages } from '../actions/messageActions';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from '../components/SearchBox';
import Loader from '../components/Loader';


const AllSupportService = ({ history, match}) => {
const keyword = match.params.keyword || ''
const pageNumber = match.params.pageNumber || 1
const employees = 'allsupportservice';
const dispatch = useDispatch()

  // ---- For the FixedNavBar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {
    setSidebarOpen(true);
  }
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  }
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  const getMyMessage = useSelector(state => state.getMyMessage)
  const {loading, data, pages, page} = getMyMessage

   const userDetails = useSelector(state => state.userDetails)
   const { user } = userDetails

  useEffect(() => {

    if (userInfo  && (userInfo.role === 'Human Resource Executive' || userInfo.role === 'CEO' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources')) {
       dispatch(getAllChatMessages(pageNumber))
    } else {
      history.push('/')
    }
  }, [dispatch, history, userInfo, pageNumber])


  return (
    <div className="dashboard-container">
			<Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
			<FixedNavbar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
			<main>
				<div className="chat-screen-wrapper container-fluid">
					<div className='chat-screen-head'>
						<div className='chat-screen-head-text'>
							<p>Drop your message - we'll respond shortly</p>
						</div>
						<Form>
						<SearchBox history={history} url={'/admin/userlist'} />
						</Form>				
                  </div>
				  {loading ? <Loader />
                         : ( 
					<div className="mt-4">
						
						<Table striped bordered hover size="sm">
                        
							<thead>
								<tr>
									<th>Email Address</th>
									<th>FIRST NAME</th>
									<th>Date Sent</th>
									<th>ROLE</th>
                                    <th>DEPARTMENT</th>
									<th>Subject</th>
									<th>View</th>
								</tr>
							</thead>
							<tbody>	
							{data.map(user => (
							<tr key={user._id}>
								<td>{user.employee.email}</td>
								<td>{user.employee.firstname}</td>
								<td>{moment(user.createdAt).format("DD-MM-YYYY")}</td>
								<td>{user.employee.role}</td>
                                <td>{user.employee.department}</td>
								<td>{user.title}</td>
								<td>
									<NavLink to={`/support/${user._id}/messaging`} exact className="update-btn">
										<Button className='msg-btn'>
											Reply
										</Button>
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
					)}
        </div>
      </main>
	  </div>
	  
  );
}

export default AllSupportService;