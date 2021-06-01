import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';


const UserKPIOverview = () => {

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
					<div className="mt-4 EmployeeDetailsKpi" >
                        <div className="employeeDetailsCard">
                            <div className="EmpCardText">
                            <p>Name: </p>
                            <span> Oduka Ikemba</span>
                            </div>
                            <div className="EmpCardText">
                            <p>Emp ID: </p>
                            <span> OUT/ADM/223</span>
                            </div>
                            <div className="EmpCardText">
                            <p>Department: </p>
                            <span> Software And It </span>
                            </div>
                            <div className="EmpCardText">
                            <p>Final Score: </p>
                            <span> 90% </span>
                            </div>
                        </div>
						
                        <div className="HrEmployeeKpiReview">

                        </div>
						
						<Table striped bordered hover size="sm" >
                        
							<thead class="HrKpiHeader">
								<tr>
									<th>Employee KPI</th>
									<th>Emp Score</th>
									<th>HOD Score</th>
									<th>HOD Comments</th>
                                    <th>Hr Comments</th>
									<th>Emp Rating</th>
									<th>HOD Rating</th>
									<th>Final Rating</th>
								</tr>
							</thead>
							<tbody>	
								<tr>
								<td>Approach to work</td>

									<td>3</td>
									<td>4</td>
									<td>Needs a certifcation and raise</td>
                                    <td> - </td>
									<td>50%</td>
									<td>50%</td>
									<td>100%</td>
								</tr>
								<tr>
								<td>Intelligence</td>

									<td>3</td>
									<td>4</td>
								</tr>
								<tr>
								<td>Development Approach</td>

									<td>3</td>
									<td>4</td>
								</tr>
								<tr>
									<td>Coding Skill</td>
									<td>2</td>
									<td>1</td>
								</tr>
								<tr>
									<td>Coding Skill</td>
									<td>2</td>
									<td>1</td>
								</tr>
							</tbody>
						</Table>
					</div>
        </div>
      </main>
	  </div>
	  
  )
}

export default UserKPIOverview;