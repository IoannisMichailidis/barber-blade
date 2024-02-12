import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Components
import FormContainer from '../../components/common/FormContainer';
import BookingSteps from '../../components/booking/BookingSteps';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';
// Slices
import { useGetBarbersQuery } from '../../slices/usersApiSlice';
// import { saveShippingAddress } from '../../slices/cartSlice';
import { saveBarber } from '../../slices/bookingSlice';
import { MEDIA_URL } from '../../constants';

function ChooseBarberScreen() {
    // Api Slice: Get the barbers
    const { data: barbers, isLoading, error} = useGetBarbersQuery();


    // Global State: Get the Barber if selected before
    const { barber } = useSelector((state) => state.booking);

    const [selectedBarber, setSelectedBarber] = useState(!barber ? null : barber.id);
    console.log(selectedBarber)
    // Initialization
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const barber = barbers.find(barber => barber.id === selectedBarber);
        console.log(barber)
        // Update the global state
        dispatch(saveBarber({...barber}));
        navigate('/booking-datetime');
    }

      const handleBarberSelect = (barberId) => {
        setSelectedBarber(barberId);
      };
  return (
<>
{ isLoading ? (
      <Loader/>
    ) : error ? (
      <Message variant='danger'>Something went wrong!</Message>
    ) : (
    <>
        <Row>
            <h1 className='text-center py-3 mb-4'>Select Barber</h1>
        </Row>
        <Row>
            <BookingSteps step1 />
        </Row>
        <Row>
            <Form onSubmit={submitHandler}>
                {/* Submit Button */}
                <Row className="mt-4 justify-content-center">
                    <Col xs={12} md={6} className="d-flex justify-content-center">
                        {/* <Button
                            type='submit'
                            variant='primary'
                            // className='btn-block'
                            disabled={selectedBarber === null}
                        >
                            Continue
                        </Button> */}
                        <input style={{width: '200px'}} aria-label="On Click" disabled={selectedBarber === null || selectedBarber ===undefined} className='CustomButton' type="submit" value="Continue"/>
                    </Col>
                </Row>
                {/* Barber */}
                {/* <div className="row"> */}
                <Form.Group controlId='barber' className='row justify-content-md-center'>
                        {/* className='my-2 d-flex justify-content-center' */}
                        { barbers && barbers.map((barber) => (
                            <Col key={barber.id} sm={12} md={6} lg={4} xl={3}>
                                <Card
                                onClick={() => handleBarberSelect(barber.id)}
                                className={selectedBarber === barber.id ? 'selected-card my-3 p-3 rounded' : 'my-3 p-3 rounded'}
                                >
                                    <Card.Img src={`${MEDIA_URL}${barber.image}`} variant='top' />
                                    <Card.Body>
                                        {/* <Card.Title as='div' className='card-title'><strong>{barber.username}</strong></Card.Title> */}
                                        <Form.Check
                                            type="radio"
                                            id={`barber-${barber.id}`}
                                            label={barber.username}
                                            checked={selectedBarber === barber.id}
                                            onChange={() => handleBarberSelect(barber.id)}
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>
                    ))}
                </Form.Group>

            </Form>
        </Row>

    </>
     ) }
</>
  )
}

export default ChooseBarberScreen