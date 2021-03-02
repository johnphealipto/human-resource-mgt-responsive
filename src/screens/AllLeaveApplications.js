import React, { useState, useEffect } from 'react'
import { Row, Col, Table, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const AllLeaveApplications = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {

    if(!userInfo) {
      history.push('/')
    } 
  }, [dispatch, history, userInfo])

  return (
    <>     
    	<Row className='ml-4 mr-4 py-4 profilescreen-wrapper all-leaves'>
				<Col md={2} className='d-none d-md-block'>
          <FixedNavbar />
        </Col>
        <Col className='col-xs-12 col-md-10'>
          <Header />
					<h1 className='page-header'>LEAVE APPLICATIONS</h1>
					<hr />
					<Table striped bordered hover size="sm" className='myleave-table'>
        <thead>
          <tr>
            <th>Date Applied</th>
						<th>Name - Agent.ID</th>
            <th>Leave Type</th>
            <th>Duration</th>
            <th>Reason</th>
            <th>Status</th>
						<th>...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jan 5, 2020</td>
						<td>John Adibe <br /> Agent.5544</td>
            <td>Sick leave</td>
            <td>Jan 11, 2020 - Jan 14, 2020</td>
            <td>Malaria and Typhoid fever</td>
            <td>
    					<Form.Control as="select" defaultValue="Pending" custom className='approveleave-selectinput'>
								<option value="pending">Pending</option>
          			<option value="approved">Approved</option>
          			<option value="declined">Declined</option>
          			<option value="awaitingConfirmation">Awaiting Confirmation</option>
    					</Form.Control>
						</td>
						<td>
							<Button>
								Post
							</Button>
						</td>
          </tr>
          <tr>
            <td>Oct 10, 2020</td>
						<td>John Adibe <br /> Agent.5544</td>
            <td>Paid leave</td>
            <td>Oct 15, 2020 - Oct 17, 2020</td>
            <td>Paid Leave</td>
            <td>
    					<Form.Control as="select" defaultValue="Pending" custom className='approveleave-selectinput'>
								<option value="pending">Pending</option>
          			<option value="approved">Approved</option>
          			<option value="declined">Declined</option>
          			<option value="awaitingConfirmation">Awaiting Confirmation</option>
    					</Form.Control>
						</td>
						<td>
							<Button>
								Post
							</Button>
						</td>
          </tr>
          <tr>
            <td>Feb 18, 2021</td>
						<td>John Adibe <br /> Agent.5544</td>
            <td>Sick leave</td>
            <td>Feb 19, 2021 - Feb 22, 2021</td>
            <td>Malaria and Typhoid fever</td>
            <td>
							<Form.Control as="select" defaultValue="Pending" custom className='approveleave-selectinput'>
								<option value="pending">Pending</option>
          			<option value="approved">Approved</option>
          			<option value="declined">Declined</option>
          			<option value="awaitingConfirmation">Awaiting Confirmation</option>
    					</Form.Control>
        		</td>
						<td>
							<Button>
								Post
							</Button>
						</td>
          </tr>
					<tr>
            <td>Feb 18, 2021</td>
						<td>John Adibe <br /> Agent.5544</td>
            <td>Sick leave</td>
            <td>Feb 19, 2021 - Feb 22, 2021</td>
            <td>Malaria and Typhoid fever</td>
            <td>
							<Form.Control as="select" defaultValue="Pending" custom className='approveleave-selectinput'>
								<option value="pending">Pending</option>
          			<option value="approved">Approved</option>
          			<option value="declined">Declined</option>
          			<option value="awaitingConfirmation">Awaiting Confirmation</option>
    					</Form.Control>
        		</td>
						<td>
							<Button>
								Post
							</Button>
						</td>
          </tr>
					<tr>
            <td>Feb 18, 2021</td>
						<td>John Adibe <br /> Agent.5544</td>
            <td>Sick leave</td>
            <td>Feb 19, 2021 - Feb 22, 2021</td>
            <td>Malaria and Typhoid fever</td>
            <td>
							<Form.Control as="select" defaultValue="Pending" custom className='approveleave-selectinput'>
								<option value="pending">Pending</option>
          			<option value="approved">Approved</option>
          			<option value="declined">Declined</option>
          			<option value="awaitingConfirmation">Awaiting Confirmation</option>
    					</Form.Control>
        		</td>
						<td>
							<Button>
								Post
							</Button>
						</td>
          </tr>
        </tbody>
      </Table>
      	</Col>
      </Row>
    </>
  )
}

export default AllLeaveApplications;