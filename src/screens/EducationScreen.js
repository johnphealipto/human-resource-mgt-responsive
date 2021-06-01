import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Button, Form } from 'react-bootstrap'
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux'
import { EDUCATION_CREATE_RESET, EDUCATION_DETAILS_RESET, EDUCATION_UPDATE_RESET } from '../constants/educationConstants'
import { createEducation, getEducationDetails, updateEducation } from '../actions/educationActions';
import Loader from '../components/Loader';


const EducationScreen = ({ history }) => {
  const [institutionAttended, setInstitutionAttended] = useState('')
  const [courseOfStudy, setCourseOfStudy] = useState('')
  const [yearOfGraduation, setYearOfGraduation] = useState('')
  const [professionalMembership, setProfessionalMembership] = useState('')


  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const educationDetails = useSelector(state => state.educationDetails)
  const { education } = educationDetails

  const educationUpdate = useSelector(state => state.educationUpdate)
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = educationUpdate

  const educationCreate = useSelector(state => state.educationCreate)
  const { loading:loadingCreate, error:errorCreate, success:successCreate } = educationCreate
  


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
				<div className="profilescreen-wrapper mt-3">
          {loadingUpdate && <Loader />}
					{loadingCreate && <Loader />}
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {successUpdate && <Message variant='success'>Profile Updated</Message>}
          {
            education ? (
              <Form onSubmit={submitHandler} className="form-shadow">
                  <Form.Group controlId='institutionAttended'>
                    <Form.Label>Institution Attended</Form.Label>
                    <Form.Control 
                    	type='text'
                    	placeholder='Enter Institution Attended'
                    	value={institutionAttended}
                    	onChange={(e) => setInstitutionAttended(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='courseOfStudy'>
                    <Form.Label>Degree & Course</Form.Label>
                    <Form.Control 
                      type='text'    
                      placeholder='BSc Mathematics'
                      value={courseOfStudy}
                      onChange={(e) => setCourseOfStudy(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='professionalMembership'>
                    <Form.Label>Professional Membership</Form.Label>
                    <Form.Control 
                      type='text' 
                      placeholder='Enter Professional Membership'
                      value={professionalMembership}
                      onChange={(e) => setProfessionalMembership(e.target.value)}
                    ></Form.Control>
                	</Form.Group>
                	<Form.Group controlId='yearOfGraduation'>
                    <Form.Label>Year Of Graduation</Form.Label>
                    <Form.Control 
                      type='date' 
                      placeholder='Enter Year Of Graduation'
                      value={yearOfGraduation}
                      onChange={(e) => setYearOfGraduation(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button type='submit' variant='primary' className='btn-block'>
                    Update
                  </Button>
              </Form>

              ) : (
              <Form onSubmit={createsubmitHandler} className="form-shadow">
                <Form.Group controlId='institutionAttended'>
                    <Form.Label>Institution Attended</Form.Label>
                    <Form.Control 
                    	type='text'
                    	placeholder='Enter Institution Attended'
                    	value={institutionAttended}
                    	onChange={(e) => setInstitutionAttended(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='courseOfStudy'>
                    <Form.Label>Degree & Course</Form.Label>
                    <Form.Control 
                      type='text'    
                      placeholder='BSc Mathematics'
                      value={courseOfStudy}
                      onChange={(e) => setCourseOfStudy(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='professionalMembership'>
                    <Form.Label>Professional Membership</Form.Label>
                    <Form.Control 
                      type='text' 
                      placeholder='Enter Professional Membership'
                      value={professionalMembership}
                      onChange={(e) => setProfessionalMembership(e.target.value)}
                    ></Form.Control>
                	</Form.Group>
                	<Form.Group controlId='yearOfGraduation'>
                    <Form.Label>Year Of Graduation</Form.Label>
                    <Form.Control 
                      type='date' 
                      placeholder='Enter Year Of Graduation'
                      value={yearOfGraduation}
                      onChange={(e) => setYearOfGraduation(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                <Button type='submit' variant='primary' className='btn-block'>
                  Create
                </Button>
              </Form>
              )
            }
            </div>
    )
}

export default EducationScreen;
