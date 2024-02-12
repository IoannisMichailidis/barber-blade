import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// Components
import Haircut from '../../components/haircutscreen/Haircut';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';
import Paginate from '../../components/haircutscreen/Paginate';
// Slices
import { useGetHaircutsQuery } from '../../slices/haircutsApiSlice';


const HaircutsScreen = () => {
  const { pageNumber } = useParams();

  // API Slices
  const { data, isLoading, error} = useGetHaircutsQuery({pageNumber});

  return (
    <>
      { isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>Something went wrong! {error.data?.message || error.error}</Message>
      ) : (
        <>
          <Row>
              <h1 className='text-center py-3 mb-4'>All Services</h1>
          </Row>

          <Row>
              {data.results.map((haircut) => (
                  <Col key={haircut.id} sm={12} md={6} lg={4} xl={3}>
                      <Haircut haircut={haircut} />
                  </Col>
              ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
          />
      </>
    ) }
  </>
  )
}

export default HaircutsScreen;