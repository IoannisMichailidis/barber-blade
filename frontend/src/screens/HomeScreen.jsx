import React from 'react'
import { Row, Col, Image } from 'react-bootstrap';
// Components
// import ProductCarousel from '../components/productscreen/ProductCarousel';
// Images
import historyImage2 from '../assets/historyImage2.jpg';
import homeImage from '../assets/homeImage.jpg';
import { useSelector } from 'react-redux';
import { useGetBarbersQuery } from '../slices/usersApiSlice';

const HomeScreen = () => {
    // Get user info from the global state
    const { userInfo, token } = useSelector((state) => state.auth);
    
    console.log(userInfo)
    console.log(token)



  return (
    <>
        <Row className="image-container" >
            <Image src={homeImage} alt='home image' fluid style={{height: '400px', width: '100%', objectFit: 'cover'}} className='mb-4'/>
            <h2 className="image-text">Welcome to Hat Haven - Your Ultimate Destination for Stylish Headwear!</h2>
        </Row>

        <Row className="justify-content-md-center">
            <Col md={6}>
                <h2 className='text-center py-3 mb-4'>Top Picks</h2>
                {/* <ProductCarousel/> */}
            </Col>
        </Row>

        <Row>
            <h2 className='text-center py-3 mb-4'>History</h2>
            <Col md={6}>
                <Image src={historyImage2} alt='history image' fluid style={{height: '100%', width: '100%', objectFit: 'cover'}} />
            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-center mt-4">
            <p className="text-center">From a humble beginning as a passionate milliner's dream, our e-commerce platform, Hat Haven, has blossomed into a thriving digital marketplace for stylish headwear. Established in 2010, we embarked on a journey to celebrate the timeless elegance and diverse functionality of hats. Over the years, Hat Haven has curated an exquisite collection, ranging from classic fedoras to trendy beanies, catering to a wide spectrum of hat enthusiasts. Our commitment to quality, coupled with an unwavering focus on customer satisfaction, has transformed us into a beloved destination for hat lovers worldwide. Each hat in our collection tells a story, weaving together tradition, fashion, and craftsmanship, reflecting our dedication to keeping this age-old art alive in the modern era.</p>
            </Col>
        </Row>
    </>
  )
}

export default HomeScreen;