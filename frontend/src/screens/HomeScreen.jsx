import React from 'react'
import { Row, Col, Image } from 'react-bootstrap';
// Components
import BarberCarousel from '../components/haircutscreen/BarberCarousel';
// Images
import sideImage from '../assets/sideImage.jpg';
import homeImage from '../assets/homeImage.jpg';
import { useSelector } from 'react-redux';
import { useGetBarbersQuery } from '../slices/usersApiSlice';


const HomeScreen = () => {
    // Get user info from the global state
    const { userInfo, token } = useSelector((state) => state.auth);
    // Api Slice: get top products
    const {data: barbers, isLoading, error} = useGetBarbersQuery();
  return (
    <>
        {/* <Row className="image-container" >
            <Image src={homeImage} alt='home image' fluid style={{height: '400px', width: '100%', objectFit: 'cover'}} className='mb-4'/>
            <h2 className="image-text">Welcome to Barber Blade - Your Ultimate Destination for Stylish Haircut!</h2>
        </Row> */}

        <Row className="justify-content-md-center">
            <Col md={6} >
                <h2 className='text-center py-3 mb-4'>Our Barbers</h2>
                <BarberCarousel barbers={barbers} isLoading={isLoading} error={error} />
            </Col>
        </Row>

        <Row>
            <h2 className='text-center py-3 mb-4'>History</h2>
            <Col md={6} >
                <Image src={sideImage} alt='history image' fluid style={{height: '500px', width: '100%', objectFit: 'cover'}} />
            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-center mt-4">
            <p className="text-center">Nestled in the heart of our vibrant community, our barbershop stands as a testament to the timeless tradition of classic grooming blended with the pulse of modern style. Established with a passion for excellence and a dedication to the craft of barbering, our shop has been a place where generations come together, sharing stories and laughter, all while receiving the highest quality of service.</p>
            </Col>
        </Row>
    </>
  )
}

export default HomeScreen;