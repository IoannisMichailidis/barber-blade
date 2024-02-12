import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookSquare , FaInstagramSquare, FaTwitterSquare, FaMapMarkerAlt, FaPhone  } from 'react-icons/fa';
// Images
import logo from '../../assets/logo2.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{ backgroundColor: '#212529', color: 'white'}}>
            <Container >
                <Row className="align-items-stretch" row>
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                        <img src={logo} alt="BarberShop" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </Col>

                    {/* <Col  className='text-center py-3 '> */}
                    <Col md={4} className='text-center py-3 d-flex flex-column justify-content-around'>
                        <h4>About us</h4>
                        <Row className='align-items-center'>
                            <Col >
                                <Row className='flex-row align-items-center'>
                                    <Col xs={5} md={5} style={{ textAlign: 'right' }}>
                                        <FaMapMarkerAlt   color='white' size={20}/>
                                    </Col>
                                    <Col style={{ textAlign: 'left' }}>
                                        <p style={{ all: 'unset' }}>Karaiskaki 19</p>
                                    </Col>
                                </Row>
                                <Row className='flex-row mt-3'>
                                    <Col xs={5} md={5} style={{ textAlign: 'right' }}>
                                        <FaPhone   color='white' size={20}/>
                                    </Col>
                                    <Col style={{ textAlign: 'left' }} >
                                        <p style={{ all: 'unset' }}>2310 265696</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4} className='text-center py-3' >
                        <h4>Follow us</h4>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookSquare  color='white' size={50}/>
                        </a>
                        <a href="https://www.Instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagramSquare  color='white' size={50}/>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitterSquare  color='white' size={50}/>
                        </a>
                    </Col>
                </Row>
                <Row >
                    <p style={{textAlign:'center'}}>HatHaven &copy; {currentYear}</p>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer