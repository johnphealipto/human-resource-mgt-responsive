import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';


const UserKPIDetails = () => {

  // ---- For the FixedNavBar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {
    setSidebarOpen(true)
  }
  const closeSidebar = () => {
    setSidebarOpen(false)
  }
  


  return (
    <div className="dashboard-container">
			<Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
			<FixedNavbar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />

			<main>
				<div className="chat-screen-wrapper container-fluid">
					<div className='chat-screen-head'>
						<div className='chat-screen-head-text'>
							<p>KPI Details</p>
						</div>		
                  </div>
					<div className="mt-4">
						
						<Table striped bordered hover size="sm" overview-table >
                        
							<thead>
								<tr>
									<th>Emp Name</th>
									<th>Emp ID</th>
									<th>Date Registered</th>
									<th>HOD Comments</th>
									<th>Emp Rating</th>
                                    <th>HOD Rating</th>
									<th>Total Rating</th>
									<th></th>
								</tr>
							</thead>
							<tbody>	
								<tr>
									<td>Oduka Ikemba</td>
									<td>OUT/ADM/223</td>
									<td>21-22-2021</td>
									<td>Doing Great</td>
									<td>76%</td>
									<td>66%</td>
									<td>86%</td>
									<td>
									<NavLink to='/kpi/overview' className="update-btn">
										<Button className='agent-details-kpi'>
											Details
										</Button>
									</NavLink>
									</td>
								</tr>
								
								
							</tbody>
						</Table>	
						
					</div>
        </div>
      </main>
	  </div>
	  
  );
}

export default UserKPIDetails;