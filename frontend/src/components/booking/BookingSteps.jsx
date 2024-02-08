import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';



const BookingSteps = ({step1, step2, step3, step4}) => {
    return (
        <Nav className='justify-content-center mb-4'> 
            {/* Step 1 */}
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/booking-barber'>
                        <Nav.Link>Barber</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Barber</Nav.Link>
                )}
            </Nav.Item>
            {/* Step 2 */}
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/booking-datetime'>
                        <Nav.Link>Date & Time</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Date & Time</Nav.Link>
                )}
            </Nav.Item>
            {/* Step 3 */}
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/booking-custominfo'>
                        <Nav.Link>Information</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Information</Nav.Link>
                )}
            </Nav.Item>
            {/* Step 4 */}
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/booking-placebooking'>
                        <Nav.Link>Place Booking</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Place Booking</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default BookingSteps;