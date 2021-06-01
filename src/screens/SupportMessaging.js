import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSingleMessageAction, createResponseAction, getResponseDetailsAction } from '../actions/messageActions';
import moment from 'moment';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const SupportMessaging = ({ history, match }) => {
  const singleMessageId = match.params.id
  

	const [response, setResponse] = useState('')

	const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const singleMessage = useSelector(state => state.singleMessage)
  const { responses } = singleMessage

  const responseDetails = useSelector(state => state.responseDetails)
  const { data } = responseDetails

  const createResponse = useSelector(state => state.createResponse)
  const { success:successCreate, error:errorCreate } = createResponse

  const userDetails = useSelector(state => state.userDetails)
   const { user } = userDetails

  useEffect(() => {
    if (userInfo) {
      dispatch(
        getSingleMessageAction(singleMessageId), 
      )
      dispatch(getResponseDetailsAction(singleMessageId))
    }
    else {
      history.push('/')
    }
  }, [dispatch, history, userInfo, data, responses, singleMessageId, successCreate])

 
  const postMyResponseHandler = (e) => {
    e.preventDefault(e)
		dispatch(createResponseAction({
      message: singleMessageId,
      response
    }))
    setResponse("")
  }


  // ---- For the FixedNavBar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {
    setSidebarOpen(true)
  }
  const closeSidebar = () => {
    setSidebarOpen(false)
  }


  return (
    <>     
      <div className="dashboard-container">
        <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <FixedNavbar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <main className='profilescreen-wrapper messaging' closeButton>
          <div className="dashboard-body">
            <div className="messaging-box">
                <div className="message-header">
                    <h4>Subject: {responses.title}</h4> 
                    <div>
                      <NavLink to={`/supportservice`} exact="true" className="update-btn">
										<Button className='msg-btn  back-btn '>
											Back
										</Button>
									</NavLink>
                    </div>

                </div>
              <div className="messaging-container">
                <p className="msg-wrapper ">{responses.body}</p>
                <div className="sender-details">
                </div>
                {data.map(user => (
                  <>
                  <span className='mgs-left text-black'>
                    <p key={user._id} className="msg-wrapper-reply ">{user.response}</p>
                    <div className="sender-details">
                      <span><i className="fas fa-circle"/> {user.employee.firstname} - {user.employee.email}</span>
                      <span id="msg-date">{moment(user.createdAt).format("DD-MM-YYYY HH:MM")}</span>
                    </div>
                    </span>
                  </>
                ))}
              </div>
              <div className="messaging-form">
                <Form onSubmit={postMyResponseHandler} className="messaging-input-field">
                  <Form.Group controlId='inputText'>
                    <InputGroup>
                      <Form.Control 
                        type="text" 
                        placeholder='Type a message..'
                        value={response}
                        onChange={(e) => setResponse(e.target.value)} />
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <Button type="submit" className='send-btn'>
                            <i className="fas fa-paper-plane" />
                          </Button>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                    </InputGroup>
                  </Form.Group>
                </Form>
              </div>
              {/* {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
              {successCreate && <Message>{successCreate}</Message>} */}
            </div>
          </div>
        </main>
	    </div>
    </>
  )
}

export default SupportMessaging;