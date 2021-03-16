import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { Button, Row, Col, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { EDUCATION_CREATE_RESET, EDUCATION_DETAILS_RESET, EDUCATION_UPDATE_RESET } from '../constants/educationConstants'
import { createEducation, getEducationDetails, updateEducation } from '../actions/educationActions';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const EducationScreen = ({ history }) => {
    const [institutionAttended, setInstitutionAttended] = useState('')
    const [courseOfStudy, setCourseOfStudy] = useState('')
    const [yearOfGraduation, setYearOfGraduation] = useState('')
    const [professionalMembership, setProfessionalMembership] = useState('')


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const educationDetails = useSelector(state => state.educationDetails)
    const { loading, education } = educationDetails

    const educationUpdate = useSelector(state => state.educationUpdate)
    const {  error:errorUpdate, success:successUpdate } = educationUpdate

    const educationCreate = useSelector(state => state.educationCreate)
    const { error:errorCreate, success:successCreate } = educationCreate
    
  

    useEffect(() => {

        if(!userInfo) {
            history.push('/')
        } else {
            if(successUpdate || successCreate) {
                dispatch({
                    type: EDUCATION_UPDATE_RESET
                })
                dispatch({
                    type: EDUCATION_DETAILS_RESET
                })
                dispatch({
                    type: EDUCATION_CREATE_RESET
                })
                history.push('/home')
            } else {
            if(!education || !education.institutionAttended) {
                dispatch(getEducationDetails('me'))
            } else {
                setInstitutionAttended(education.institutionAttended)
                setCourseOfStudy(education.courseOfStudy)
                setProfessionalMembership(education.professionalMembership)
                setYearOfGraduation(moment(education.yearOfGraduation).format("YYYY-MM-DD"))
            }
        }
    }
    }, [dispatch, history, education, successCreate, successUpdate, userInfo])

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
        dispatch(createEducation({
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
        <FixedNavbar />
      </Col>
      <Col xs={12} md={8} lg={10}>
          <Header />
          <h1 className='page-header'>Education</h1>
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {successUpdate && <Message variant='success'>Profile Updated</Message>}
          {loading && <Loader />}
          {
            education ? (
              <Form onSubmit={submitHandler} className="form-shadow">
                <Form.Row>
                  <Form.Group className="col-md-6" controlId='institutionAttended'>
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

export default EducationScreen;
