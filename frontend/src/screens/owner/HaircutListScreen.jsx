import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Components
import Message from '../../components/common/Message';
import Loader from '../../components/common/Loader';
import Paginate from '../../components/haircutscreen/Paginate';
// Slices
import { useGetHaircutsQuery, useCreateHaircutMutation, useDeleteHaircutMutation } from '../../slices/haircutsApiSlice';

const HaircutListScreen = () => {
    const { pageNumber } = useParams();
    // State Slices
    const { token } = useSelector((state) => state.auth);

    // Api Slices
    const { data:haircuts, isLoading, error, refetch } = useGetHaircutsQuery({pageNumber});
    const [ createHaircut, {isLoading: loadingCreate }] = useCreateHaircutMutation();
    const [deleteHaircut, { isLoading: loadingDelete }] = useDeleteHaircutMutation();

    const createHaircutHandler = async () => {
        if(window.confirm('Are you sure you want to create a new haircut?')) {
            try{
                // Api slice
                await createHaircut({token: token});
                refetch(); // refetch the haircuts using the get haircuts api call (that's why the refetch function comes from the useGetHaircutsQuery)
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure?')) {
            try {
                const requestData = {
                    id: id,
                    token: token,
                };
                // Api Slice
                await deleteHaircut(requestData);
                toast.success('Haircut deleted');
                refetch(); // refetch the haircuts using the get haircut api call (that's why the refetch function comes from the useGetHaircutsQuery)
            } catch (err) {
                toast.error(`Something went wrong! ${err?.data?.message || err.error}`)
            }
        }
    };
  return (
    <Row>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='text-center py-3 mb-4'>Services</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3' onClick={createHaircutHandler}>
                        <FaEdit/> Create Service
                    </Button>
                </Col>
            </Row>
            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
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
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>IMAGE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {haircuts.results.map((haircut) => (
                                <tr key={haircut.id}>
                                    <td>{haircut.id}</td>
                                    <td>{haircut.title===null ? 'None' : haircut.title}</td>
                                    <td>{haircut.price} $</td>
                                    <td>{haircut.image===null ? 'None' : haircut.image}</td>
                                    <td>
                                        <LinkContainer to={`/owner/haircut/${haircut.id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2'>
                                                <FaEdit/>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(haircut.id)}>
                                            <FaTrash/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={haircuts.pages} page={haircuts.page} isOwner={true}/>
                </>
            )}
    </Row>
  )
}

export default HaircutListScreen;