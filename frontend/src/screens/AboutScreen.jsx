import React, {useEffect, useState} from 'react'
import { Row, Col } from 'react-bootstrap';
// Components
import Loader from '../components/common/Loader';
import Message from '../components/common/Message';
// Images
import logo from '../assets/logo.png';
import { FaFacebookSquare , FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const AboutScreen = () => {
    const position = [40.614260, 22.956390]; // Latitude and Longitude for the marker

    // Marker Custom Icon
    const customIcon = new Icon({
        iconUrl: logo, // Replace with the correct path
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });

  return (
    <>
        <Row>
            <h1 className='text-center py-3 mb-4'>About Us</h1>
        </Row>
         {/* Info */}
        <Row>

            <Col md={6} className='mb-4 text-center'>
                <Row >
                    <Col style={{ textAlign: 'right' }}>
                        <p>Address :</p>
                        <p>Phone Number :</p>
                        <p>Follow us :</p>
                    </Col>
                    <Col style={{ textAlign: 'left' }}>
                        <p>Karaiskaki 19</p>
                        <p>2310 2634</p>
                        <Col>
                            <FaTwitterSquare  color='black' size={35}/>
                            <FaInstagramSquare  color='black' size={35}/>
                            <FaFacebookSquare  color='black' size={35}/>
                        </Col>
                    </Col>
                </Row>
            </Col>
            {/* Map */}
             <Col md={6}>
                <MapContainer
                    center={position}
                    zoom={13}
                    style={{ height: '400px', width: '100%' }}
                >
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position} icon={customIcon}>
                        <Popup>
                            <img src = {logo} alt="BarberShop" />
                            <h5>Barber Shop</h5>
                            Karaiskaki 19
                            <br />
                            Thessaloniki 546 41, Greece
                            <br />
                            <a href="https://www.google.com/maps/place/Karaiskaki+19,+Thessaloniki+546+41,+Greece/@40.6674429,22.89562,17z/data=!3m1!4b1!4m6!3m5!1s0x14a83a196bafef2b:0xe4db723e8fac7ecd!8m2!3d40.6674429!4d22.8982003!16s%2Fg%2F11lm1d6n7w?entry=ttu" target="_blank" rel="noopener noreferrer">
                                View Location on Google Maps
                            </a>
                        </Popup>
                    </Marker>
                </MapContainer>
             </Col>
        </Row>
  </>
  )
}

export default AboutScreen;