import { Table, Button, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Components
import Message from '../components/common/Message';
import Loader from '../components/common/Loader';
import Paginate from '../components/haircutscreen/Paginate';
// Slices
import { useGetBookingsQuery } from '../slices/bookingsApiSlice';

const BookingScreen = () => {
    const { pageNumber } = useParams();
    // Global State / State Slices
    const { token } = useSelector((state) => state.auth);
    // Api Slices
    const { data, isLoading, error } = useGetBookingsQuery({pageNumber, token});

  return (
    <Row>
            <Row>
                <h1 className='text-center py-3 mb-4'>Bookings</h1>
            </Row>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    { error?.data?.message || error.error}
                </Message>
            ) : (
                <>
                    <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>DATE</th>
                                <th>TIME</th>
                                <th>BARBER</th>
                                <th>CUSTOMER NAME</th>
                                {/* <th>CUSTOMER SURNAME</th> */}
                                <th>CUSTOMER NUMBER</th>
                                <th>CUSTOMER COMMENT</th>
                                <th></th>
                                {/* <th>TOTAL</th> */}
                                {/* <th>PAID</th> */}
                                {/* <th>ATTEND</th> */}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.results.map((booking) => (
                                <tr key={booking.id}>
                                    {/* <td>{booking.created_at.substring(0,10)}</td> */}
                                    <td>{booking.timeslot_info.date}</td>
                                    <td>{booking.timeslot_info.start_time.substring(0,5)}</td>
                                    <td>{booking.timeslot_info.barber_username}</td>
                                    <td>{booking.name} {booking.surname}</td>
                                    <td>{booking.phone_number}</td>
                                    <td>{booking.comment}</td>

                                    {/* <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={data.pages} page={data.page}/>
                </>
            )}
    </Row>
  )
}

export default BookingScreen;