import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const HRreviewEmpKPI = () => {

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
						</div>
						<Table striped bordered hover size="sm"  overview-table>      
							<thead class="HrKpiHeader">
								<tr>
									<th>Employee KPI</th>
									<th>Self Evaluation</th>
									<th>HOD Evaluation</th>
									<th>HOD Comments</th>
									<th>Emp Rating</th>
									<th>HOD Rating</th>
									<th>Final Rating</th>
								</tr>
							</thead>
							<tbody className="over">	
								<tr>
									<td>Approach to work</td>
									<td>3</td>
									<td>4</td>
									<td>Needs a certifcation and raise</td>
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
						<div className="hrcomments">
							<form className="empdetailsform">
								<p>HR comments</p>
							<textarea id="title" type="text" placeholder="write a comment......"></textarea>
							</form>
							<button class="btn btn-primary hrempdetail-btn " type="button">Submit</button>
						</div>
					</div>
        </div>
      </main>
	  </div>
  )
}

export default HRreviewEmpKPI;