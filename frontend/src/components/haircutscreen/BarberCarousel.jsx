import React from 'react'
import { Carousel, Image } from 'react-bootstrap';

// Components
import Loader from '../common/Loader';
import Message from '../common/Message';
// URL
import { MEDIA_URL } from '../../constants';

const BarberCarousel = ({ barbers, isLoading, error }) => {

  return (
    isLoading ? <Loader/> : error ? <Message variant='danger'>Something went wrong! {error.data?.message || error.error}</Message>
    : (
        <Carousel pause='hover' className='bg-dark mb-4 custom-carousel'>
            {barbers.map((barber) => (
                <Carousel.Item key={barber.id}>
                    <Image src={`${MEDIA_URL}${barber.image}`} alt={barber.username} fluid/>
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{barber.username} </h2>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
  )
}

export default BarberCarousel;