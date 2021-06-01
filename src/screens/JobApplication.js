import React, { useState, useEffect } from 'react';
import logo from "../img/outcess-logo-white.png";
import { createJobApplication } from '../actions/jobApplicantsAction';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';

const JobApplication = ({ history }) => {

  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [jobLocation, setJobLocation] = useState('')
  const [educationalQualification, setEducationalQualification] = useState('')
  const [nyscStatus, setNyscStatus] = useState('')
  const [operatingWindow, setOperatingWindow] = useState('')
  const [yearsOfExperience, setYearsOfExperience] = useState(0)
  const [igboLanguage, setIgboLanguage] = useState(false)
  const [hausaLanguage, setHausaLanguage] = useState(false)
  const [yorubaLanguage, setYorubaLanguage] = useState(false)
  const [englishLanguage, setEnglishLanguage] = useState(false)
  const [frenchLanguage, setFrenchLanguage] = useState(false)

  const createJobApp = useSelector(state => state.createJobApp)
  const { success:successCreate, error:errorCreate } = createJobApp

  useEffect(() => {
    if(successCreate) {
      history.push('/jobapplication')
    }
  }, [successCreate])


  const dispatch = useDispatch()
  
  const submitHandler = (e) => {
    e.preventDefault(e)
    dispatch(createJobApplication(
      fullname,
      email,
      gender, 
      age,
      phoneNumber, 
      address,
      jobLocation, 
      educationalQualification, 
      nyscStatus,
      operatingWindow,
      yearsOfExperience,
      igboLanguage,
      hausaLanguage,
      yorubaLanguage,
      englishLanguage,
      frenchLanguage
      ))  
      console.log(frenchLanguage, englishLanguage)   
    }
 

  return (
    <>
      <div className="container-fluid">
        <div className="job-survey-container">
          <div className="header job-logo">
            <img src={logo} alt="logo" /> 
            <h1>Job Application Form </h1>
          </div>
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
          {successCreate ? (
            <div className="success-msg">
              <i className="far fa-check-circle fa-4x"></i>
              <p>Your form has been Submitted!</p>
            </div>
          ) : (
            <form className="form-main" onSubmit={submitHandler}>
            <p>Job Location</p>
              <select id="jobLocation" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)}>
                <option value="select">Select</option>
                <option value="Lagos">Lagos</option>
                <option value="Enugu">Enugu</option>
              </select>
              <p>Full Name</p>
              <input
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                id="fullname"
                placeholder="John Doe"
              />
              <p>Email Address</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="john@example.com"
              />
  
              <p>Gender</p>
              <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option >Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <p>Age</p>
              <input id="age" type="number" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} />
              <p >Mobile Number</p>
              <input
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
              />
              <p>Area of Residence</p>
              <input 
                id="address" 
                type="text" 
                placeholder="Enter Home Address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}/>
              <p>Educational Qualification</p>
              <select id="educationQualification" value={educationalQualification} onChange={(e) => setEducationalQualification(e.target.value)}>
                <option value="select">Select</option>
                <option value="BSC">B.Sc</option>
                <option value="MSC">M.Sc</option>
                <option value="HND">HND</option>
                <option value="OND">OND</option>
                <option value="SSCE">SSCE</option>
              </select>
              <p>NYSC Status</p>
              <select id="nyscStatus" value={nyscStatus} onChange={(e) => setNyscStatus(e.target.value)}>
                <option value="select">Select</option>
                <option value="completed">Completed</option>
                <option value="currently serving">Currently Serving</option>
                <option value="not served">Not Served</option>
              </select>
              <p>Operation Window</p>
              <select id="operatingWindow" value={operatingWindow} onChange={(e) => setOperatingWindow(e.target.value)}>
                <option value="">Select</option>
                <option value="Inbound [8:00am-3:30pm]">Inbound [8:00am-3:30pm]</option>
                <option value="Inbound [1:00pm-9:00pm]">Inbound [1:00pm-9:00pm]</option>
                <option value="Inbound [8:30pm-8:30am]">Inbound [8:30pm-8:30am]</option>
                <option value="Outbound [8:00am-5:00pm]">Outbound [8:00am-5:00pm]</option>
                <option value="Recovery [8:00am-5:00pm]">Recovery [8:00am-5:00pm]</option>
              </select>
              <p>Years of Experience</p>
              <input
                id="yearsOfExperience"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                type="number"
                placeholder="Enter Number of Years"
              />
              <div className="language-type">
              <p>Spoken Languages</p>
              <input
                id="igboLanguage"
                checked={igboLanguage}
                onChange={(e) => setIgboLanguage(e.target.checked)}
                type="checkbox"
              />
              <span>Igbo</span> <br />
              
              <input
                id="hausaLanguage"
                checked={hausaLanguage}
                onChange={(e) => setHausaLanguage(e.target.checked)}
                type="checkbox" 
              />
              <span>Hausa</span> <br />
  
              <input
                id="yorubaLanguage"
                checked={yorubaLanguage}
                onChange={(e) => setYorubaLanguage(e.target.checked)}
                type="checkbox"
              />
              <span>Yoruba</span> <br />
               
              <input
                id="frenchLanguage"
                checked={frenchLanguage}
                onChange={(e) => setFrenchLanguage(e.target.checked)}
                type="checkbox"
              />
              <span>French</span> <br />
              
              <input
                id="englishLanguage"
                checked={englishLanguage}
                onChange={(e) => setEnglishLanguage(e.target.checked)}
                type="checkbox"
              />
              <span>English</span> <br />
              </div>
              <button type="submit" className="apply-button">Apply</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default JobApplication;
