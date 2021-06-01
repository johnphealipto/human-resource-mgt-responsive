import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ destination, pages, page, keyword = '' }) => {
    return (
        pages > 1 && (
            <Pagination className='mr-4 ml-3 flex-wrap'>
                {[...Array(pages).keys()].map(x => (
                    <LinkContainer key={x +1} to={keyword 
                        ? `/${destination}/search/${keyword}/page/${x+1}`
                        : `/${destination}/page/${x+1}`}>
                            <Pagination.Item active={x+1 === page} activeClassName="active-page">{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    )
}

export default Paginate;