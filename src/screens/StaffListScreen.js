import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import SearchBox from '../components/SearchBox';
import Paginate from '../components/Paginate';
import { listUsers } from '../actions/userActions'

const StaffListScreen = ({ history, match }) => {
    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1
    const employees = 'admin/userlist'
    const dispatch = useDispatch()
    //kk

    

    const userList = useSelector(state => state.userList)
    const {  loading, error, data, pages, page } = userList

    const userLogin = useSelector(state => state.userLogin)
    const {  userInfo } = userLogin

    useEffect(() => {
        if (userInfo  && (userInfo.role === 'hr' || userInfo.role === 'hr-manager' || userInfo.role === 'admin')) {
            
            dispatch(listUsers(keyword, pageNumber))
        } else {
            history.push('/')
        }
        
    }, [dispatch, history, userInfo, keyword, pageNumber])

    

    const createUserHandler = () => {
        history.push('/admin/register')
    }

    return (
        <>
            
            <Row className='align-items-center mr-3 ml-3'>
                <Col>
                <Link to='/home' className='btn btn-light my-3'>
                Go Back
                </Link>
                </Col>
                <Col>
                    <SearchBox history={history} />
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createUserHandler}>
                       <i className='fas fa-plus'></i> Create Employee
                    </Button>
                </Col>
            </Row>
            
            {loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            : (
                <>
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
                            <th>IS ACTIVE</th>
                            {userInfo && (userInfo.role === 'hr') && (
                            <th></th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(user => (
                            <tr key={user._id}>
                                <td>{user.employeeCode}</td>
                                <td>{user.firstname}</td>
                                <td>{user.middlename}</td>
                                <td>{user.lastname}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.role}</td>
                                <td>{user.department}</td>
                                <td>
                                    {user.isActive ? (
                                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                                    ) : (
                                        <i className='fas fa-times' style={{  color: 'red' }}></i>
                                    )}
                                </td>
                                {userInfo && (userInfo.role === 'hr' || userInfo.role === 'hr-manager' || userInfo.role === 'admin') && (
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <LinkContainer to={`/admin/user/${user._id}/role`}>
                                        <Button variant='primary' className='btn-sm'>
                                            <i className='fas fa-key'></i>
                                        </Button>
                                    </LinkContainer>
                                    
                                </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate
                destination={employees}
                pages={pages} 
                page={page}
                keyword={keyword ? keyword : ''} />
                </>
            )}
        </>
    )
}

export default StaffListScreen
