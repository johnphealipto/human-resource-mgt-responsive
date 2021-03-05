import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/admin/userlist/search/${keyword}`)
        } else {
            history.push('/admin/userlist')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline className=''>
            <Form.Control type='text' 
                name='q' onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Employee'
                className='mr-sm-2 ml-sm-5'></Form.Control>
            <Button type='submit' variant='outline-success' className='py-2'>
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
