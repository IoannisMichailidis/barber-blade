import React from 'react'
import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';
// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
// Image
import homeImage from './assets/homeImage.jpg';
// Styles
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Header/>
      {/* className='py-3' */}
      <main className='pb-3'>
        <Row className="image-container" >
            <Image src={homeImage} alt='home image' fluid style={{height: '400px', width: '100%', objectFit: 'cover'}} className='mb-4'/>
            <h2 className="image-text">Welcome to Barber Blade - Your Ultimate Destination for Stylish Haircut!</h2>
        </Row>
        <Container>
          <Outlet/>
        </Container>
      </main>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default App