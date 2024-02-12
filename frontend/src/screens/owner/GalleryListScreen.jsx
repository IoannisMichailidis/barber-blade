import React, { useState } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaRegPlusSquare, FaTrash } from 'react-icons/fa';

// Components
import Message from '../../components/common/Message';
import Loader from '../../components/common/Loader';
import GalleryPaginate from '../../components/galleryscreen/GalleryPaginate';
// Slices
import { useGetGalleryQuery, useCreateGalleryMutation, useDeleteGalleryMutation } from '../../slices/galleryApiSlice';

const GalleryListScreen = () => {
    const { pageNumber } = useParams();

    // Local state
    const [image, setImage] = useState('');

    // State Slices
    const { token } = useSelector((state) => state.auth);

    // Api Slices
    const { data:gallery, isLoading, error, refetch } = useGetGalleryQuery({pageNumber});
    const [ createGalleryItem, {isLoading: loadingCreate }] = useCreateGalleryMutation();
    const [deleteGalleryItem, { isLoading: loadingDelete }] = useDeleteGalleryMutation();

    const addImageHandler = async (e) => {
        e.preventDefault();
        // Resize the image before upload
        const file = image;
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = async () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 640;
                canvas.height = 960;
                // Draw the image on canvas with new dimensions
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                // Convert canvas to blob
                canvas.toBlob(async (blob) => {
                    const formData = new FormData();
                    formData.append('image', blob, 'resized-image.jpg');
                    console.log(formData)
                    try {
                        const requestData = {
                            formData: formData,
                            token: token,
                        };
                        // Api Slice
                        console.log(formData)
                        const res = await createGalleryItem(requestData).unwrap();
                        console.log(res);
                        toast.success(res.message);
                        // Update local state
                        setImage('');
                    } catch (err) {
                        console.error('Error:', err)
                    }
                }, 'image/jpeg', 0.75);
            };
        };
    };

    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure?')) {
            try {
                const requestData = {
                    id: id,
                    token: token,
                };
                // Api Slice
                await deleteGalleryItem(requestData);
                toast.success('Gallery Item deleted');
                refetch(); // refetch the haircuts using the get haircut api call (that's why the refetch function comes from the useGetHaircutsQuery)
            } catch (err) {
                toast.error(`Something went wrong! ${err.data?.message || err.error}`)
            }
        }
    };
  return (
    <Row>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='text-center py-3 mb-4'>Gallery</h1>
                </Col>
                <Col className='text-end d-flex justify-content-end '>
                    <form noValidate>
                        <Button  onClick={addImageHandler} className='btn-sm m-3'>
                            <FaRegPlusSquare/> Add
                        </Button>
                        <input
                        type="file"
                        id="image"
                        label='Upload file'
                        name="image"
                        onChange={e => setImage(e.target.files[0])}
                            />
                    </form>
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
                                <th>IMAGE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {gallery.results.map((haircut) => (
                                <tr key={haircut.id}>
                                    <td>{haircut.id}</td>
                                    <td>{haircut.image===null ? 'None' : haircut.image}</td>
                                    <td>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(haircut.id)}>
                                            <FaTrash/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <GalleryPaginate pages={gallery.pages} page={gallery.page} isOwner={true}/>
                </>
            )}
    </Row>
  )
}

export default GalleryListScreen;