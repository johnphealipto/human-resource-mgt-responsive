import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { EDUCATION_CREATE_EMPLOYEE_RESET, EDUCATION_DETAILS_EMPLOYEE_RESET, EDUCATION_UPDATE_RESET } from '../constants/educationConstants'
import { createEducationEmpId, getEducationDetailsEmpId, updateEducation } from '../actions/educationActions'
import '../styles/FixedNavbar.css';
import Header from '../components/Header';
import '../styles/ProfileScreen.css';
import AdminFixedNavbar from '../components/AdminFixedNav';


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

        if(userInfo  && (userInfo.role === 'Human Resource Executive' || userInfo.role === 'CEO' || userInfo.role === 'Super Admin' || userInfo.role === 'Assistant Manager - Human Resources' || userInfo.role === 'Manager - Human Resources')) {
            
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

    // ---- For the FixedNavBar
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const openSidebar = () => {
      setSidebarOpen(true);
    };
    
    const closeSidebar = () => {
      setSidebarOpen(false);
    };

    return (
        <>
         
        <div className="dashboard-container">

            <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            <AdminFixedNavbar userId={userId} sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />

            <main className='profilescreen-wrapper'>
                <div className="dashboard-body">
                <div className='allLeave-title'>
                <h3>Education</h3>
                </div>
               
                {successUpdate && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                {
                    education ? (
                        <Form onSubmit={submitHandler} className="form-shadow">
                        <Form.Row>
                            <Form.Group  className="col-md-6" controlId='institutionAttended'>
                                <Form.Label>Institution Attended</Form.Label>
                                <Form.Control 
                                type='text' 
                            
                                placeholder='Enter Institution Attended'
                                value={institutionAttended}
                                onChange={(e) => setInstitutionAttended(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-6" controlId='courseOfStudy'>
                                <Form.Label>Course Of Study</Form.Label>
                                <Form.Control 
                                type='text' 
                                
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
                                type='text' 
                                
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
                                type='text' 
                            
                                placeholder='Enter Institution ATtended'
                                value={institutionAttended}
                                onChange={(e) => setInstitutionAttended(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group  className="col-md-6" controlId='courseOfStudy'>
                                <Form.Label>Course Of Study</Form.Label>
                                <Form.Control 
                                type='text' 
                                
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
                                type='text' 
                                
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
                
            </div>
        </main>
        </div>
        </>
    )
}

export default AdminEducationScreen;
