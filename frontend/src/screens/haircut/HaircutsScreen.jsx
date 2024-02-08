import React, {useEffect, useState} from 'react'
import { Row, Col, Image } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
// Components
import Haircut from '../../components/haircutscreen/Haircut';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';
import Paginate from '../../components/haircutscreen/Paginate';
// Slices
import { useGetHaircutsQuery } from '../../slices/haircutsApiSlice';
// Images
import allHatsScreenImage from '../../assets/allHatsScreenImage.jpg';


const HaircutsScreen = () => {
  const { pageNumber } = useParams();

  // Query the haircuts using the useGetHaircutsQuery instead of using axios or fetch
  const { data, isLoading, error} = useGetHaircutsQuery({pageNumber}); 
  console.log(data);
  console.log(error);
  console.log(isLoading);

  return (
    <>
    {/* Back nav button after search */}
       {/* <Link to='/haircuts' className='btn btn-light mb-4'>Go Back</Link>  */}

    { isLoading ? (
      <Loader/>
    ) : error ? (
      <Message variant='danger'>Something went wrong!</Message>
    ) : (
      <>
        <Row>
            {/* <Image src={allHatsScreenImage} alt='hats image' fluid style={{height: '400px', width: '100%', objectFit: 'cover'}} className='mb-4'/> */}
            <h1 className='text-center py-3 mb-4'>All Haircuts</h1>
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