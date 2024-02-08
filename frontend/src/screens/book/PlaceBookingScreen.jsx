import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
// Components
import BookingSteps from '../../components/booking/BookingSteps';
import Message from '../../components/common/Message';
import Loader from '../../components/common/Loader';
// Slices
import { useCreateBookingMutation } from '../../slices/bookingsApiSlice';
import { resetBooking } from '../../slices/bookingSlice';

const PlaceBookingScreen = () => {

    // Global State: Get the Barber if selected before
    const { barber, dateTime, custInfo } = useSelector((state) => state.booking);

    // Initialization
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Api Slice
    const [createBooking, { isLoading, error}] = useCreateBookingMutation();

    const errorBooking = JSON.stringify(error);
    console.log(`error from the API Slice ${errorBooking}`)

    const placeBookingHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await createBooking({
                user: barber.id,
                timeslot: dateTime.timeslotID,
                name: custInfo.name,
                surname: custInfo.surname,
                phone_number:custInfo.phoneNumber,
                email: custInfo.email,
                comment: custInfo?.comment,
            }).unwrap(); // unwrap the resolved value from the promise
            // Send all the info comming from the response to customers email
            console.log(res);
            // Update the global state
            dispatch(resetBooking());
            toast.success('Reservation booked successfully');
            navigate("/");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

  return (
    <>
        <BookingSteps step1 step2 step3 step4/>
        <Row className="justify-content-center">
            <Col xs={12} sm={12} md={6}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                                <h2 className='text-center'>Booking Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Selected Barber</h3>
                            <Row>
                                <Col>Name:</Col>
                                <Col>{barber.username}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Booking Information</h3>
                            <Row>
                                <Col>Date:</Col>
                                <Col>{dateTime.date}</Col>
                            </Row>
                            <Row>
                                <Col>Time:</Col>
                                <Col>{dateTime?.time?.substring(0,5)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Personal Information</h3>
                            <Row>
                                <Col>Full Name:</Col>
                                <Col>{custInfo.name} {custInfo.surname}</Col>
                            </Row>
                            <Row>
                                <Col>Phone Number:</Col>
                                <Col>{custInfo.phoneNumber}</Col>
                            </Row>
                            <Row>
                                <Col>Email:</Col>
                                <Col>{custInfo.email}</Col>
                            </Row>
                            <Row>
                                <Col>Comment:</Col>
                                <Col className='card-comment'>{custInfo.comment}</Col>
                            </Row>
                        </ListGroup.Item>



                        {errorBooking &&
                        <ListGroup.Item>
                             <Message variant='danger'>Something went wrong! Please try again!</Message>
                        </ListGroup.Item>
                        }
                         <form onSubmit={placeBookingHandler} style={{ all: 'unset' }}>
                            <ListGroup.Item >
                                {/* Submit Button */}
                                {isLoading ?
                                    <Row className='justify-content-center'>
                                        <input style={{width: '200px'}} aria-label="On Click"  className='CustomButton' type="submit" value="loading"/>
                                    </Row>
                                    :
                                    <Row className='justify-content-center'>
                                        <input style={{width: '200px'}} aria-label="On Click"  className='CustomButton' type="submit" value="Book"/>
                                    </Row>
                                }
                                { isLoading && <Loader />}
                            </ListGroup.Item>
                         </form>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceBookingScreen;