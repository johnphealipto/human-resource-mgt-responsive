import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';
import "../styles/ChatScreen.css";
import { createMessages,  employeeMessage,  messageResponse } from '../actions/messageActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Paginate from '../components/Paginate';


const SupportService = ({ history, match}) => {
	const dispatch = useDispatch()

	// -- Show New Message
  const [showNewMsg, setShowNewMsg] = useState(false);
  const handleCloseNewMsg = () => setShowNewMsg(false);
  const handleShowNewMsg = () => setShowNewMsg(true);

  // ---- For the FixedNavBar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {
    setSidebarOpen(true);
  }
  const closeSidebar = () => {
    setSidebarOpen(false);
  }

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const pageNumber = match.params.pageNumber || 1
  const keyword = match.params.keyword || ''
  const employees = 'supportservice'

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const employeeMessages = useSelector(state => state.employeeMessages)
  const { data, pages, page } = employeeMessages

  const createMessage = useSelector(state => state.createMessage)
  const { success:successCreate, error:errorCreate } = createMessage

  useEffect(() => {
		if(!userInfo) {
			history.push('/')
		} else {
			dispatch(employeeMessage(pageNumber))
		}
	}, [dispatch, history, successCreate, userInfo, pageNumber])


	const createsubmitHandler= (e) => {
    e.preventDefault(e)
		dispatch(createMessages(
			title,
			body
		))
  }

  return (
    <div className="dashboard-container">
			<Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
			<FixedNavbar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
			<main>
				<div className="chat-screen-wrapper container-fluid">
					<div className='chat-screen-head'>
						<div className='chat-screen-head-text'>
							<p>Drop your message - we'll respond shortly</p>
						</div>
						<Form>
							<Button onClick={handleShowNewMsg} className='msg-btn'>
								<i className="fas fa-plus mr-2 "></i>
								Send message
							</Button>
						</Form>
          </div>
					<div className="mt-4">

						{/* --- New MSG Modal ---- */}
						<Modal
							show={showNewMsg}
							onHide={handleCloseNewMsg}
							backdrop="static"
							keyboard={false}
							centered
							className="messaging-modal">
							<Modal.Header closeButton>
								<Modal.Title>New Message</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
								<Form onSubmit={createsubmitHandler}>
									<Form.Group controlId='inputText'>
										<Form.Control 
											type="text"
											value = {title}
											onChange={(e) => setTitle(e.target.value)}
											placeholder="Subject" />
									</Form.Group>
									<Form.Group controlId='inputText' >
										<Form.Control 
											as="textarea" 
											placeholder="Type a message..."
											value = {body}
											onChange={(e) => setBody(e.target.value)}
											rows={5} 
											style={{ backgroundColor: 'var(--input-field-color)' }} />
									</Form.Group>
									<Button type='submit' onClick={handleCloseNewMsg}  className='msg-btn'>
										Send
									</Button>
								</Form>
							</Modal.Body>
						</Modal>

						<Table striped bordered hover size="sm">
							<thead>
								<tr>
									<th>Date Sent</th>
									<th>Subject</th>
									<th>View</th>
								</tr>
							</thead>
							<tbody>	
							{data.map(user => (
							<tr key={user._id}>
								<td>{moment(user.createdAt).format("DD-MM-YYYY")}</td>
								<td>{user.title}</td>
								<td>
									<NavLink to={`/support/${user._id}/messaging`} exact className="update-btn">
										<Button className='msg-btn'>
											View
										</Button>
									</NavLink>
								</td>
							</tr>
							))}
							</tbody>
						</Table>	
					</div>
			<Paginate
			destination={employees}
			pages={pages} 
			page={page}
			keyword={keyword ? keyword : ''} />
        </div>
      </main>
	  </div>
  );
}

export default SupportService;