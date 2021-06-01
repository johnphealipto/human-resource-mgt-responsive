import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Header from '../components/Header';
import FixedNavBar from '../components/FixedNavbar';

const HODReviewEmpKPI = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ---- For the FixedNavBar ---- //
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
      <FixedNavBar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      
      <main>
        <div className="dashboard-body">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className="kpi-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Submit Assessment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you Sure?</p>
              <p>This action cannot be reversed</p>
              <p>Once an assessment is submitted, it can't be taken back</p>
              <input 
                type="button"
                value="No"
                className="KPI-close-btn"
                onClick={handleClose} />
                <input 
                  type="button"
                  value="Yes"
                  className="KPI-submit-btn"/>
              </Modal.Body>  
            </Modal>
          <div className="kpi-body">
          <div className="kpi-performance-section">
            <div className="kpi-performance-section"> 
              <div className="">
                <div className="kpi-info-title">
                  <p>Name</p>
                  <p>Pascal Ojinnaka</p>
                  <p>Agent ID</p>
                  <p>OUT/ADM/001</p>
                </div>
              </div>
            </div>
              
              <div className="key-performance-box">
                <div className="key-perf-title">
                  <p>Employee  KPI</p>
                  <p>Agent</p>
                  <p>HOD</p>
                </div>
                <form>
                  <div className="performance-field">
                    <input
                      type="text"
                      disabled
                      placeholder="Punctuality"
                    />
                    <input
                      type="text"
                      name="score"
                      disabled
                      placeholder="4"
                    />
                    <input
                      type="number" 
                      name="score" 
                      min="1" 
                      max="4"
                    />
                  </div>
                  <div className="performance-field">
                    <input
                      type="text"
                      disabled
                      placeholder="Attitude to Work"
                    />
                    <input
                      type="text"
                      name="score"
                      disabled
                      placeholder="4"
                    />
                    <input
                      type="number" 
                      name="score" 
                      min="1" 
                      max="4"
                    />
                  </div>
                  <div className="performance-field">
                    <input
                      type="text"
                      disabled
                      placeholder="Interpersonal Skill"
                    />
                    <input
                      type="text"
                      name="score"
                      disabled
                      placeholder="4"
                    />
                    <input
                      type="number" 
                      name="score" 
                      min="1" 
                      max="4"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Add Comment"
                      className="inputField" />
                  </div>
                  <input 
                    type="button"
                    value="Submit"
                    className="KPI-submit-btn"
                    onClick={handleShow}/>
                </form>
              </div>
            </div>

            <div className="kpi-legend-section">
              <div className="grading-system">
                <div className="grading-system-title">
                  <p>Grading System</p>
                </div>
                <div className="grading-system-body">
                  <p>4</p>
                  <p>Exceptional</p>
                  <p>3</p>
                  <p>Expectations</p>
                  <p>2</p>
                  <p>Marginal</p>
                  <p>1</p>
                  <p>Unsatisfactory</p>
                </div>
              </div>
              <div className="kpi-summary">
                <div className="kpi-summary-title">
                  <p>KPI Summary</p>
                </div>
                <div className="kpi-summary-body">
                  <p>Employee</p>
                  <p>40%</p>
                  <p>Line Manager</p>
                  <p>50%</p>
                  <p>Final Rating</p>
                  <p>90%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>  
    </div>
  )
}

export default HODReviewEmpKPI;