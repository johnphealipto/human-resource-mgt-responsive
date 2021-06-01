import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import "../styles/Main.css";
import '../styles/ProfileScreen.css';
import Header from '../components/Header';
import FixedNavBar from '../components/FixedNavbar';
import '../styles/KPIboard.css';

const UserKPIAssessment = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // ---- For the FixedNavBar ---- //
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const openSidebar = () => {
    setSidebarOpen(true);
  }
  const closeSidebar = () => {
    setSidebarOpen(false);
  }
  
  // --- Handles Adding & Deleting Input Fields --- //
  const [inputField, setInputField] = useState([{ }])
  const handleAddField = () => {
    setInputField([...inputField, { }])
  }
  const handleRemoveField = (index) => {
    const field = [...inputField]
    field.splice(index, 1)
    setInputField(field)
  }


  const [ratings, setRatings] = useState([])
  // const getRatings = (e) => {
  //   e.preventDefault(e)
  //   const score = document.getElementsByName('score').value;
  //   ratings.push(score) 
  //   console.log(score)
  // }

  const score = (document.getElementsByName('score')).value;
  // console.log(score)

  // --- Function for the KPI Calculations --- //
  const handleTotal = (e) => {
    // const score = parseInt(e.target.value);
    // setValue(score)
    // console.log(totalScore)
    // const inputs = document.getElementsByName('score')
    // let totalScore = 0
    // for (var i = 0; i < inputs.length; i++) {
    //   totalScore += parseFloat(inputs[i].value)
    //   console.log(totalScore)
    // }
    // document.getElementById('total').innerHTML = totalScore;
    // return totalScore
    // setTotalValue(totalScore)
  }
  var scoreSet = [1, 4, 4]
  const sum = scoreSet.reduce((accumulator, element) => {
    return accumulator + element;
  }, 0);
  console.log(sum)

  // const refScore = document.getElementsByName('score')
  // var totalExpectedScore = refScore.length * 4
  // var avgScorePercent = ((totalScore / totalExpectedScore) * 100).toFixed(0)


  return (
    <div className="dashboard-container">
      <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <FixedNavBar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      
      <main>
        <div className="dashboard-body kpi">
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
              <div>
                <input 
                  type="button" 
                  value="+ Add Field"
                  className="add-field-btn"
                  onClick={handleAddField} />
                </div>
                <div className="key-performance-box">
                  <div className="key-perf-title">
                    <p>My Performance KPI</p>
                    <p>Score</p>
                  </div>
                  <form>
                    <div className="performance-field">
                      <input
                        type="text"
                        disabled
                        placeholder="Punctuality"
                      />
                      <input
                        type="number" 
                        name="score" 
                        min="1" 
                        max="4"
                        onChange={handleTotal}
                      />
                    </div>
                    <div className="performance-field">
                      <input
                        type="text"
                        disabled
                        placeholder="Attitude to Work"
                      />
                      <input
                        type="number" 
                        name="score" 
                        min="1" 
                        max="4"
                        onChange={handleTotal}
                      />
                    </div>
                    <div className="performance-field">
                      <input
                        type="text"
                        disabled
                        placeholder="Interpersonal Skill"
                      />
                      <input
                        type="number" 
                        name="score" 
                        min="1" 
                        max="4"
                        onChange={handleTotal}
                      />
                    </div>
                    {inputField.map((item, index) =>
                      <div key={index} className="performance-field">
                        <input
                          type="text"
                          placeholder="Enter Task"
                          className="inputField"
                          name="keyTask"
                        />
                        <input
                          type="number" 
                          name="keyScore" 
                          min="1" 
                          max="4"
                        />
                        <input
                          type="button"
                          title="Delete Field"
                          value="x"
                          onClick={(e) => handleRemoveField(index)}
                        />
                      </div>
                    )}
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
                      {/* <input 
                        type="button"
                        value="check"
                        className="KPI-submit-btn"
                        onClick={getRatings}/> */}
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
                  <p>Meets Expectation</p>
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
                  <p>Total</p>
                  <p id="total"></p>
                  <p>Average Score</p>
                  <p>65%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>  
    </div>
  )
}

export default UserKPIAssessment;