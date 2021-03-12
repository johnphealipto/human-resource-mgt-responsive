import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({history, url}) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`${url}/search/${keyword}`)
        } else {
            history.push(`${url}`)
        }
    }

    return (
        <Form onSubmit={submitHandler} inline className=''>
            <Form.Control type='text' 
                name='q' onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search ...'
                className='mr-sm-2 ml-sm-5 search-input'></Form.Control>
            <Button type='submit' className='py-2 search-btn'>
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
