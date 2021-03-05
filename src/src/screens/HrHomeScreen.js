import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { getUserDetailsById } from '../actions/userActions';
import FixedNavbar from '../components/FixedNavbar';


const HrHomeScreen = ({ history, match }) => {
    const userId = match.params.id

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const userDetailsById = useSelector(state => state.userDetailsById)
    const { user } = userDetailsById

    useEffect(() => {
        if (!userInfo  && (userInfo.role !== 'hr')) {
            
            history.push('/')
        } else {
            dispatch(getUserDetailsById(userId))
        }
        
        
    }, [history, userInfo, userId, dispatch])

    return (
        <>
            
        <Row className='ml-4 mr-4 py-4'>
        <Col md={3}>
            <FixedNavbar />
        </Col>
        <Col md={8}>
        <Table striped bordered hover reesponsive className='table-sm mr-4 ml-3'>
            <thead>
                <tr>
                    <th>EMPLOYEE ID</th>
                    <th>FIRST NAME</th>
                    <th>MIDDLE NAME</th>
                    <th>LAST NAME</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>DEPARTMENT</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                
                <tr key={user.employee._id}>
                    <td>{user.employee.employeeCode}</td>
                    <td>{user.employee.firstname}</td>
                    <td>{user.employee.middlename}</td>
                    <td>{user.employee.lastname}</td>
                    <td><a href={`mailto:${user.employee.email}`}>{user.employee.email}</a></td>
                    <td>{user.employee.role}</td>
                    <td>{user.employee.department}</td>
                    {userInfo && (
                    <td>
                        <LinkContainer to={`/dashboard`}>
                            <Button variant='light' className='btn-sm'>
                                <i className='fas fa-edit'></i>
                            </Button>
                        </LinkContainer>
                        
                    </td>
                    )}
                </tr>
                
            </tbody>
        </Table>
        </Col>
        </Row>
        </>
    )
}

export default HrHomeScreen
