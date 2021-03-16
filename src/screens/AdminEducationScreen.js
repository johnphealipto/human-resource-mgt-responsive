import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { Button, Row, Col, Nav, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { EDUCATION_CREATE_EMPLOYEE_RESET, EDUCATION_DETAILS_EMPLOYEE_RESET, EDUCATION_UPDATE_RESET } from '../constants/educationConstants'
import { createEducationEmpId, getEducationDetailsEmpId, updateEducation } from '../actions/educationActions'
import '../styles/FixedNavbar.css';
import AdminHeader from '../components/AdminHeader';
import '../styles/ProfileScreen.css';

const AdminEducationScreen = ({ history, match }) => {
    const userId = match.params.id

    const [institutionAttended, setInstitutionAttended] = useState('')
    const [courseOfStudy, setCourseOfStudy] = useState('')
    const [yearOfGraduation, setYearOfGraduation] = useState('')
    const [professionalMembership, setProfessionalMembership] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const educationDetailsEmpId = useSelector(state => state.educationDetailsEmpId)
    const { loading, education } = educationDetailsEmpId

    const educationUpdate = useSelector(state => state.educationUpdate)
    const { success:successUpdate } = educationUpdate

    const educationCreateEmpId = useSelector(state => state.educationCreateEmpId)
    const { success:successCreate } = educationCreateEmpId
    
  

    useEffect(() => {

        if(userInfo  && (userInfo.role === 'hr' || userInfo.role === 'hr-manager' || userInfo.role === 'admin')) {
            
            if(successUpdate || successCreate) {
                dispatch({
                    type: EDUCATION_UPDATE_RESET
                })
                dispatch({
                    type: EDUCATION_DETAILS_EMPLOYEE_RESET
                })
                dispatch({
                    type: EDUCATION_CREATE_EMPLOYEE_RESET
                })
                history.push('/home')
            } else {
            if(!education || education.employee  !== userId) {
                dispatch(getEducationDetailsEmpId(userId))
            } else {
                setInstitutionAttended(education.institutionAttended)
                setCourseOfStudy(education.courseOfStudy)
                setProfessionalMembership(education.professionalMembership)
                setYearOfGraduation(education.yearOfGraduation)
            }
        }
        } else {
            history.push('/')
    }
    }, [dispatch, history, education, userId, successCreate, successUpdate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateEducation({
            _id: education._id,
            institutionAttended,
            courseOfStudy,
            professionalMembership,
            yearOfGraduation
        }))
       
    }

    const createsubmitHandler= (e) => {
        e.preventDefault()
        dispatch(createEducationEmpId({
            employee: userId,
           institutionAttended,
           courseOfStudy,
           professionalMembership,
           yearOfGraduation
        }))
    }

    return (
        <>
         
        <Row className='ml-4 mr-4 py-4 profilescreen-wrapper'>
        <Col md={4} lg={2} className='d-none d-md-block'>
        <div className="fixednavbar-wrapper">
            <div className='employee-details'>
                <p>{userInfo.role}</p>
                <p>{userInfo.email}</p>
            </div>
        <Nav className="flex-column">
        <NavLink to='/admin/userlist' exact className="nav-link" activeClassName='active-here'>
          <i class="fas fa-home pr-3"></i>
          All Employees
        </NavLink>
        <NavLink to={`/admin/user/${userId}/edit`} exact className="nav-link" activeClassName='active-here'>
          <i class="far fa-id-card pr-3"></i>
          Details
        </NavLink>
        <NavLink to={`/admin/profile/${userId}/edit`} exact className="nav-link" activeClassName='active-here'>
          <i class="fas fa-user-circle pr-3"></i>
          Profile
        </NavLink>
        <NavLink to={`/admin/education/${userId}/edit`} exact className="nav-link" activeClassName='active-here'>
          <i class="fas fa-user-friends pr-3"></i>
          Education
        </NavLink>
        <NavLink to={`/admin/nextofkin/${userId}/edit`} exact className="nav-link" activeClassName='active-here'>
          <i class="fas fa-graduation-cap pr-3"></i>
          Employee Next Of Kin
        </NavLink>
        </Nav>
        </div>
        </Col>

        <Col xs={12} md={8} lg={10}>
                <AdminHeader
                    userId
                />
                <h1 className='page-header'>Education</h1>
               
               
                {successUpdate && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                {
                    education ? (
                        <Form onSubmit={submitHandler} className="form-shadow">
                        <Form.Row>
                            <Form.Group  className="col-md-6" controlId='institutionAttended'>
                                <Form.Label>Institution Attended</Form.Label>
                                <Form.Control 
                                type='institutionAttended' 
                            
                                placeholder='Enter Institution Attended'
                                value={institutionAttended}
                                onChange={(e) => setInstitutionAttended(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-6" controlId='courseOfStudy'>
                                <Form.Label>Course Of Study</Form.Label>
                                <Form.Control 
                                type='courseOfStudy' 
                                
                                placeholder='Enter Course Of Study'
                                value={courseOfStudy}
                                onChange={(e) => setCourseOfStudy(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group  className="col-md-6" controlId='professionalMembership'>
                                <Form.Label>Professional Membership</Form.Label>
                                <Form.Control 
                                type='professionalMembership' 
                                
                                placeholder='Enter Professional Membership'
                                value={professionalMembership}
                                onChange={(e) => setProfessionalMembership(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-6" controlId='yearOfGraduation'>
                                <Form.Label>Year Of Graduation</Form.Label>
                                <Form.Control 
                                type='date' 
                            
                                placeholder='Enter Year Of Graduation'
                                value={yearOfGraduation}
                                onChange={(e) => setYearOfGraduation(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        
                    
                        <Button type='submit' variant='primary' className='btn-block'>
                            Update
                        </Button>
                    </Form>
                    ) : (
                        <Form onSubmit={createsubmitHandler} className="form-shadow">
                        <Form.Row>
                            <Form.Group  className="col-md-6" controlId='institutionAttended'>
                                <Form.Label>Institution Attended</Form.Label>
                                <Form.Control 
                                type='institutionAttended' 
                            
                                placeholder='Enter Institution ATtended'
                                value={institutionAttended}
                                onChange={(e) => setInstitutionAttended(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-6" controlId='courseOfStudy'>
                                <Form.Label>Course Of Study</Form.Label>
                                <Form.Control 
                                type='courseOfStudy' 
                                
                                placeholder='Enter Course Of Study'
                                value={courseOfStudy}
                                onChange={(e) => setCourseOfStudy(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            
                            
                    
                            
                        </Form.Row>
                        <Form.Row>
                            <Form.Group  className="col-md-6" controlId='professionalMembership'>
                                <Form.Label>Professional Membership</Form.Label>
                                <Form.Control 
                                type='professionalMembership' 
                                
                                placeholder='Enter Professional Membership'
                                value={professionalMembership}
                                onChange={(e) => setProfessionalMembership(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-6" controlId='yearOfGraduation'>
                                <Form.Label>Year Of Graduation</Form.Label>
                                <Form.Control 
                                type='date' 
                            
                                placeholder='Enter Year Of Graduation'
                                value={yearOfGraduation}
                                onChange={(e) => setYearOfGraduation(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        
                        
                    
                        <Button type='submit' variant='primary' className='btn-block'>
                            Create
                        </Button>
                    </Form>
                    )
                }
                
            </Col>
        </Row>
        </>
    )
}

export default AdminEducationScreen;
