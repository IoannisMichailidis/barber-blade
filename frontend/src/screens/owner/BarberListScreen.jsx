import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';


// Components
import Message from '../../components/common/Message';
import Loader from '../../components/common/Loader';
// Slices
import { useGetBarbersQuery, useDeleteBarberMutation } from '../../slices/usersApiSlice';

const BarberListScreen = () => {
    // Global State / State Slices
    const { token } = useSelector((state) => state.auth);

    // Api Slices
    const { data:barbers, isLoading, error, refetch } = useGetBarbersQuery();

    // Api Slice: Create product
    // const [ createHaircut, {isLoading: loadingCreate }] = useCreateHaircutMutation();

    // Api Slice: Delete product
    const [deleteBarber, { isLoading: loadingDelete }] = useDeleteBarberMutation();

    console.log(token)

    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure?')) {
            try {
                const requestData = {
                    id: id,
                    token: token,
                };
                console.log(requestData)
                // Api Slice
                await deleteBarber(requestData);
                toast.success('Barber deleted');
                refetch(); // refetch the haircuts using the get haircut api call (that's why the refetch function comes from the useGetHaircutsQuery)
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    };
  return (
    <Row>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='text-center py-3 mb-4'>Barbers</h1>
                </Col>
                <Col className='text-end'>
                    <LinkContainer to={`/owner/create-barber`}>
                        <Button className='btn-sm m-3'>
                            <FaEdit/> Create Barber
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
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
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>IMAGE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {barbers && barbers.map((barber) => (
                                <tr key={barber.id}>
                                    <td>{barber.username}</td>
                                    <td>{barber.email===null ? 'None' : barber.email}</td>
                                    <td>{barber.image===null ? 'None' : barber.image}</td>
                                    <td>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(barber.id)}>
                                            <FaTrash/>
                                        </Button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
    </Row>
  )
}

export default BarberListScreen;