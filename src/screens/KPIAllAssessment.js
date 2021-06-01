import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const AllKPIAssessment = () => {

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
				<div className="leave-body all-leave-wrapper">
          <div className='allLeave-title'>
              <h3>All KPI Assessments</h3>
            </div>
            <Table striped bordered hover size="sm" className='myleave-table' style={{ backgroundColor: '#fff' }}>
            <thead style={{ backgroundColor: '#124383', color: 'rgba(248, 248, 255, 0.95)' }} >
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Report To</th>
                <th>Date Registered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OUT/ADM/223</td>
                <td>Otto</td>
                <td>Software developer</td>
                <td>Pascal Ojinnaka</td>
                <td>11/20/2021</td>
                <td>
                  <NavLink to={'/kpi/:id/finalreview'} exact className="update-btn rounded-0" style={{background: '#E2522E', boxShadow: 'none'}}>
                    View
                  </NavLink>
                </td>
              </tr>
              <tr>
                <td>OUT/ADM/223</td>
                <td>Otto</td>
                <td>Software developer</td>
                <td>Pascal Ojinnaka</td>
                <td>11/20/2021</td>
                <td>
                  <NavLink to={'/kpi/:id/finalreview'} exact className="update-btn rounded-0" style={{background: '#E2522E', boxShadow: 'none'}}>
                    View
                  </NavLink>
                </td>
              </tr>
              <tr>
                <td>OUT/ADM/223</td>
                <td>Otto</td>
                <td>Software developer</td>
                <td>Pascal Ojinnaka</td>
                <td>11/20/2021</td>
                <td>
                  <NavLink to={'/kpi/:id/finalreview'} exact className="update-btn rounded-0" style={{background: '#E2522E', boxShadow: 'none'}}>
                    View
                  </NavLink>
                </td>
              </tr>
              <tr>
                <td>OUT/ADM/223</td>
                <td>Otto</td>
                <td>Software developer</td>
                <td>Pascal Ojinnaka</td>
                <td>11/20/2021</td>
                <td>
                  <NavLink to={'/kpi/:id/finalreview'} exact className="update-btn rounded-0" style={{background: '#E2522E', boxShadow: 'none'}}>
                    View
                  </NavLink>
                </td>
              </tr>
              <tr>
                <td>OUT/ADM/223</td>
                <td>Otto</td>
                <td>Software developer</td>
                <td>Pascal Ojinnaka</td>
                <td>11/20/2021</td>
                <td>
                  <NavLink to={'/kpi/:id/finalreview'} exact className="update-btn rounded-0" style={{background: '#E2522E', boxShadow: 'none'}}>
                    View
                  </NavLink>
                </td>
              </tr>
              <tr>
                <td>OUT/ADM/223</td>
                <td>Otto</td>
                <td>Software developer</td>
                <td>Pascal Ojinnaka</td>
                <td>11/20/2021</td>
                <td>
                  <NavLink to={'/kpi/:id/finalreview'} exact className="update-btn rounded-0" style={{background: '#E2522E', boxShadow: 'none'}}>
                    View
                  </NavLink>
                </td>
              </tr>
          </tbody>
        </Table>
        </div>
     </main>
	  </div>   
  )
}

export default AllKPIAssessment;