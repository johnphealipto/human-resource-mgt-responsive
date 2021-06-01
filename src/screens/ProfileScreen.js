import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { createProfile, getProfileDetails, updateProfile } from '../actions/profileActions'
import { PROFILE_CREATE_RESET, PROFILE_DETAILS_RESET, PROFILE_UPDATE_RESET } from '../constants/profileConstants'
import Loader from '../components/Loader'

const ProfileScreen = ({ history }) => {
	const [dob, setDob] = useState('')
	const [contactNo, setContactNo] = useState('')
	const [privateEmail, setPrivateEmail] = useState('')
	const [gender, setGender] = useState('')
	const [dateOfLastPromotion, setDateOfLastPromotion] = useState('')
	const [address, setAddress] = useState('')
	const [stateOfOrigin, setStateOfOrigin] = useState('')
	const [lga, setLga] = useState('')
	const [maritalStatus, setMaritalStatus] = useState('')
	const [religion, setReligion] = useState('')

	const dispatch = useDispatch()

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const profileDetails = useSelector(state => state.profileDetails)
	const { profile } = profileDetails

	const profileUpdate = useSelector(state => state.profileUpdate)
	const {  loading:loadingUpdate, error:errorUpdate, success:successUpdate } = profileUpdate

	const profileCreate = useSelector(state => state.profileCreate)
	const { loading:loadingCreate, error:errorCreate, success:successCreate } = profileCreate



	useEffect(() => {

			if(!userInfo) {
					history.push('/')
			} else {
					if(successUpdate || successCreate) {
							dispatch({
									type: PROFILE_UPDATE_RESET
							})
							dispatch({
									type: PROFILE_CREATE_RESET
							})
							dispatch({
									type: PROFILE_DETAILS_RESET
							})
							history.push('/')
					} else {
					if(!profile || !profile.dob) {
							dispatch(getProfileDetails('me'))
					} else {
							setDob(profile.dob)
							setContactNo(profile.contactNo)
							setPrivateEmail(profile.privateEmail)
							setGender(profile.gender)
							setDateOfLastPromotion(profile.dateOfLastPromotion)
							setAddress(profile.address)
							setStateOfOrigin(profile.stateOfOrigin)
							setLga(profile.lga)
							setMaritalStatus(profile.maritalStatus)
							setReligion(profile.religion)

					}
			}
	}
	}, [dispatch, history, profile, successUpdate, successCreate, userInfo])

	const submitHandler = (e) => {
			e.preventDefault()
			dispatch(updateProfile({
					_id: profile._id,
					dob,
					contactNo,
					privateEmail,
					gender,
					dateOfLastPromotion,
					address,
					stateOfOrigin,
					lga,
					maritalStatus,
					religion
			}))
	}


	const createsubmitHandler= (e) => {
		e.preventDefault()
		//Create Actions
		dispatch(createProfile({
			
				dob,
				contactNo,
				privateEmail,
				gender,
				dateOfLastPromotion,
				address,
				stateOfOrigin,
				lga,
				maritalStatus,
				religion
			}))
	}

	return (
		<div className="profilescreen-wrapper mt-3">
					{loadingUpdate && <Loader />}
					{loadingCreate && <Loader />}
					{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
					{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
					{successUpdate && <Message variant='success'>Profile Updated</Message>}
					{profile ? (
					<Form onSubmit={submitHandler} className="form-shadow">
					<Form.Row>
						<Form.Group  className="col-md-6" controlId='dateOfBirth'>
								<Form.Label>Date Of Birth</Form.Label>
								<Form.Control 
								type='date'
								placeholder='Enter Date Of Birth'
								value={dob.substring(0, 10)}
								onChange={(e) => setDob(e.target.value)}
								></Form.Control>
						</Form.Group>
						<Form.Group  className="col-md-6" controlId='contactNo'>
								<Form.Label>Contact Number</Form.Label>
								<Form.Control 
								type='text'
								placeholder='Enter Contact Number'
								value={contactNo}
								onChange={(e) => setContactNo(e.target.value)}
								></Form.Control>
						</Form.Group>
				
				
								
					</Form.Row>
					<Form.Row>
						
						<Form.Group  className="col-md-6" controlId='privateEmail'>
									<Form.Label>Email Address</Form.Label>
									<Form.Control 
									type='email'
									placeholder='Enter Private Email'
									value={privateEmail}
									onChange={(e) => setPrivateEmail(e.target.value)}
									></Form.Control>
							</Form.Group>
								<Form.Group className="col-md-6" controlId="formGridGender">
										<Form.Label>Gender</Form.Label>
										<Form.Control 
										as="select"
										custom 
										size='sm'
										value={gender}
										onChange={(e) => setGender(e.target.value)}>
												<option value=''>Select...</option>
												<option value='MALE'>MALE</option>
												<option value='FEMALE'>FEMALE</option>
										</Form.Control>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group  className="col-md-6" controlId='dateOfLastPromotion'>
										<Form.Label>Date Of Last Promotion</Form.Label>
										<Form.Control 
										type='date' 
										placeholder='Enter Date Of Last Promotion'
										value={dateOfLastPromotion}
										onChange={(e) => setDateOfLastPromotion(e.target.value)}
										></Form.Control>
								</Form.Group>
								<Form.Group  className="col-md-6" controlId='address'>
										<Form.Label>Address</Form.Label>
										<Form.Control 
										type='text' 
										placeholder='Enter Address'
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										></Form.Control>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group  className="col-md-6" controlId='stateOfOrigin'>
										<Form.Label>State Of Origin</Form.Label>
										<Form.Control 
										type='text' 
										placeholder='Enter State Of Origin'
										value={stateOfOrigin}
										onChange={(e) => setStateOfOrigin(e.target.value)}
										></Form.Control>
								</Form.Group>
								<Form.Group  className="col-md-6" controlId='lga'>
										<Form.Label>LGA</Form.Label>
										<Form.Control 
										type='text' 
										placeholder='Enter LGA'
										value={lga}
										onChange={(e) => setLga(e.target.value)}
										></Form.Control>
								</Form.Group>
							</Form.Row>

						<Form.Row>
							<Form.Group  className="col-md-6" controlId='maritalStatus'>
									<Form.Label>Marital Status</Form.Label>
									<Form.Control 
									type='text' 
									placeholder='Enter Marital Status'
									value={maritalStatus}
									onChange={(e) => setMaritalStatus(e.target.value)}
									></Form.Control>
							</Form.Group>
							<Form.Group  className="col-md-6" controlId='religion'>
									<Form.Label>Religion</Form.Label>
									<Form.Control 
									type='text' 
									placeholder='Enter Religion'
									value={religion}
									onChange={(e) => setReligion(e.target.value)}
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
						<Form.Group  className="col-md-6" controlId='dateOfBirth'>
								<Form.Label>Date Of Birth</Form.Label>
								<Form.Control 
								type='date'
								placeholder='Enter Date Of Birth'
								value={dob.substring(0, 10)}
								onChange={(e) => setDob(e.target.value)}
								></Form.Control>
						</Form.Group>
						<Form.Group  className="col-md-6" controlId='contactNo'>
								<Form.Label>Contact Number</Form.Label>
								<Form.Control 
								type='text'
								placeholder='Enter Contact Number'
								value={contactNo}
								onChange={(e) => setContactNo(e.target.value)}
								></Form.Control>
						</Form.Group>
				
				
								
					</Form.Row>
					<Form.Row>
						
						<Form.Group  className="col-md-6" controlId='privateEmail'>
									<Form.Label>Email Address</Form.Label>
									<Form.Control 
									type='email'
									placeholder='Enter Private Email'
									value={privateEmail}
									onChange={(e) => setPrivateEmail(e.target.value)}
									></Form.Control>
							</Form.Group>
								<Form.Group className="col-md-6" controlId="formGridGender">
										<Form.Label>Gender</Form.Label>
										<Form.Control 
										as="select"
										custom 
										size='sm'
										value={gender}
										onChange={(e) => setGender(e.target.value)}>
												<option value=''>Select...</option>
												<option value='MALE'>MALE</option>
												<option value='FEMALE'>FEMALE</option>
										</Form.Control>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group  className="col-md-6" controlId='dateOfLastPromotion'>
										<Form.Label>Date Of Last Promotion</Form.Label>
										<Form.Control 
										type='date' 
										placeholder='Enter Date Of Last Promotion'
										value={dateOfLastPromotion}
										onChange={(e) => setDateOfLastPromotion(e.target.value)}
										></Form.Control>
								</Form.Group>
								<Form.Group  className="col-md-6" controlId='address'>
										<Form.Label>Address</Form.Label>
										<Form.Control 
										type='text' 
										placeholder='Enter Address'
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										></Form.Control>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group  className="col-md-6" controlId='stateOfOrigin'>
										<Form.Label>State Of Origin</Form.Label>
										<Form.Control 
										type='text' 
										placeholder='Enter State Of Origin'
										value={stateOfOrigin}
										onChange={(e) => setStateOfOrigin(e.target.value)}
										></Form.Control>
								</Form.Group>
								<Form.Group  className="col-md-6" controlId='lga'>
										<Form.Label>LGA</Form.Label>
										<Form.Control 
										type='text' 
										placeholder='Enter LGA'
										value={lga}
										onChange={(e) => setLga(e.target.value)}
										></Form.Control>
								</Form.Group>
							</Form.Row>

						<Form.Row>
							<Form.Group  className="col-md-6" controlId='maritalStatus'>
									<Form.Label>Marital Status</Form.Label>
									<Form.Control 
									type='text' 
									placeholder='Enter Marital Status'
									value={maritalStatus}
									onChange={(e) => setMaritalStatus(e.target.value)}
									></Form.Control>
							</Form.Group>
							<Form.Group  className="col-md-6" controlId='religion'>
									<Form.Label>Religion</Form.Label>
									<Form.Control 
									type='text' 
									placeholder='Enter Religion'
									value={religion}
									onChange={(e) => setReligion(e.target.value)}
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

	)
}

export default ProfileScreen;
