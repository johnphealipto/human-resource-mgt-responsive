import React, { useEffect } from "react";
import SearchBox from "../components/SearchBox";
import { useDispatch, useSelector } from 'react-redux';
import { getAllApplicantsForm } from '../actions/jobApplicantsAction';
import Paginate from "../components/Paginate";
import { NavLink } from 'react-router-dom';

const AllJobApplications = ({ history, match }) => {
  const keyword = match.params.keyword || "";
  const pageNumber = match.params.pageNumber || 1;
  const employees = "alljobapplication";
  const dispatch = useDispatch();

  
	const getAllJobApplication = useSelector(state => state.getAllJobApplication)
  const { data, pages, page } = getAllJobApplication

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {

    if (userInfo  && (userInfo.role === 'Human Resource Executive' || userInfo.role === 'CEO' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources')) {
       dispatch(getAllApplicantsForm(keyword, pageNumber))
    } else {
      history.push('/')
    }
  }, [dispatch, history, data, userInfo, keyword, pageNumber])

  return (
    <>
   
      <div className="container-fluid job-app-wrapp">
        <div className="table-wrapp">
          <div className="table-head">
            <NavLink to='/home' className='btn btn-light my-3 go-back-btn'>
              Go Back
            </NavLink>
            <h2>All Job Applications</h2>
            <SearchBox history={history} url={"/alljobapplication"} />
          </div>
          <div className="table-main">
            <table class="survey-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Job location</th>
                  <th>Educational Qualification</th>
                  <th>Nysc Status</th>
                  <th>Operating Window</th>
                  <th>Years of Experience</th>
                  <th>Igbo Lang</th>
                  <th>Hausa Lang</th>
                  <th>Yoruba Lang</th>
                  <th>English Lang</th>
                  <th>French Lang</th>
                </tr>
              </thead>
              <tbody>
              {data.map(user => (
              <tr key={user._id}>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.age}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.address}</td>
                <td>{user.jobLocation}</td>
                <td>{user.educationalQualification}</td>
                <td>{user.nyscStatus}</td>
                <td>{user.operatingWindow}</td>
                <td>{user.yearsOfExperience}</td>
                <td>
                  {user.igboLanguage ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{  color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {user.hausaLanguage ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{  color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {user.yorubaLanguage ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{  color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {user.englishLanguage ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{  color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {user.frenchLanguage ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{  color: 'red' }}></i>
                  )}
                </td>
              </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        <Paginate
          destination={employees}
          pages={pages} 
          page={page}
          keyword={keyword ? keyword : ''} />
      </div>
    </>
  );
};

export default AllJobApplications;
