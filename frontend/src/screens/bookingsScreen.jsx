import { Table, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Components
import Message from '../components/common/Message';
import Loader from '../components/common/Loader';
import BookingPaginate from '../components/booking/BookingPaginate';
// Slices
import { useGetBookingsQuery } from '../slices/bookingsApiSlice';

const BookingScreen = () => {
    const { pageNumber } = useParams();
    // State Slices
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
                    Something went wrong! {error.data?.message || error.error}
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
                                <th>CUSTOMER NUMBER</th>
                                <th>CUSTOMER COMMENT</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.results.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.timeslot_info.date}</td>
                                    <td>{booking.timeslot_info.start_time.substring(0,5)}</td>
                                    <td>{booking.timeslot_info.barber_username}</td>
                                    <td>{booking.name} {booking.surname}</td>
                                    <td>{booking.phone_number}</td>
                                    <td >{booking.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <BookingPaginate pages={data.pages} page={data.page}/>
                </>
            )}
    </Row>
  )
}

export default BookingScreen;