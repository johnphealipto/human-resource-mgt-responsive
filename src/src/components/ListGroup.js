import React from 'react'
import { ListGroup } from 'react-bootstrap'

const ListGroup = () => {
    return (
        <ListGroup>
            <ListGroup.Item variant="info">
                <Link to='/home'>
                    <strong><i className='fas fa-user'></i> Home</strong>
                </Link>
            </ListGroup.Item>
            
            <ListGroup.Item variant="info">
                <Link to='/dashboard'>
                    <strong><i className='fas fa-user'></i> Personal Details</strong>
                </Link>
            </ListGroup.Item>
            <ListGroup.Item variant="info">
                <Link to='/profile'>
                    <strong><i className='fas fa-user'></i> Profile</strong>
                </Link>
            </ListGroup.Item>
            <ListGroup.Item variant="info">
                <Link to='/nextofkin'>
                    <strong><i className='fas fa-user'></i> Next Of Kin</strong>
                </Link>
            </ListGroup.Item>
            <ListGroup.Item variant="info">
                <Link to='/updatepassword'>
                    <strong><i className='fas fa-user'></i> Update Password</strong>
                </Link>
            </ListGroup.Item>
            <ListGroup.Item variant="info">
                <Link to='/education'>
                    <strong><i className='fas fa-school'></i> Education</strong>
                </Link>
            </ListGroup.Item>
            <ListGroup.Item variant="info">
                <Link to='/dashboard'>
                    <strong><i className='fas fa-building'></i> My Leave Application</strong>
                </Link>
            </ListGroup.Item>
           
        </ListGroup>
    )
}

export default ListGroup
