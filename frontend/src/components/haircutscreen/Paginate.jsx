import React from 'react'
import  { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isOwner = false }) => {
  return (
    pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (         // Create an array of pages & Map through the pages

                <LinkContainer
                    key={x + 1}                            // because key is 0 based
                    to={!isOwner ?
                          `/haircuts/page/${x+1}`                   // If not keyword pagination functionality
                        : `/owner/haircutlist/page/${x+1}`}     // If admin pagination functionality
                >
                    <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                </LinkContainer>

            ))}
        </Pagination>
  )
  )
}

export default Paginate;