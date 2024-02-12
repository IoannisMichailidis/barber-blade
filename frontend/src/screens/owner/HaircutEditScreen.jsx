import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// Components
import Message from '../../components/common/Message';
import Loader from '../../components/common/Loader';
import FormContainer from '../../components/common/FormContainer';
// Slices
import { useUpdateHaircutMutation, useGetHaircutDetailsQuery, useUploadHaircutImageMutation } from '../../slices/haircutsApiSlice';
const HaircutEditScreen = () => {
    // Get product id from url
    const { id } = useParams();

    // State Slices
    const { token } = useSelector((state) => state.auth);

    // Local state
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    // Api Slice: Get a haircut
    const { data: haircut, isLoading, error } = useGetHaircutDetailsQuery(id);
    const [ updateHaircut, {isLoading: loadingUpdate }] = useUpdateHaircutMutation();
    const [uploadHaircutImage, {isLoading: loadingUpload}] = useUploadHaircutImageMutation();

    // Initialization
    const navigate = useNavigate();

    // Align the local state with the product data coming from the api call for form initial data representation.
    useEffect(() => {
        if (haircut) {
            setTitle(haircut.title);
            setPrice(haircut.price);
            setImage(haircut.image);
        } else {
            setTitle('');
            setImage('');
        }
    }, [haircut]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedHaircut = {
            id,
            title,
            price,
            token
        };
        // Api Slice: Update a haircut
        const result = await updateHaircut(updatedHaircut).unwrap();
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('Haircut updated');
            navigate('/owner/haircutlist');
        }
    };

    const uploadFileHandler = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        console.log(`FILE${file}`)
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
                    formData.append('haircut_id', id);
                    try {
                        const requestData = {
                            formData: formData,
                            token: token,
                        };
                        // Api Slice
                        console.log(formData)
                        const res = await uploadHaircutImage(requestData).unwrap();
                        console.log(res);
                        toast.success(res.message);
                        // Update local state
                        setImage(res.image);
                    } catch (err) {
                        toast.error(`Something went wrong! ${err.data?.message || err.error}`);
                    }
                }, 'image/jpeg', 0.75);
            };
        };
    };

  return (
    <>
        <Link to='/owner/haircutlist' className='btn btn-light my-2'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit Service</h1>
            {loadingUpdate && <Loader/>}

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    Something went wrong! {error.data?.message || error.error}
                </Message>
            ) : (
                <Form onSubmit={ submitHandler }>
                    {/* Title */}
                    <Form.Group controlId='title' className='my-2'>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Insert title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    {/* Price */}
                    <Form.Group controlId='price' className='my-2'>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Insert price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    {/* Image */}
                    <Form.Group controlId='image' className='my-2'>
                        <Form.Label>Image:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Insert image url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                        <Form.Control
                            type='file'
                            label='Upload file'
                            onChange={uploadFileHandler}
                        ></Form.Control>
                    </Form.Group>
                    {loadingUpload && <Loader />}

                    {/* Submit Button */}
                    <Button type='submit' variant='primary' className='my-2'>
                        Update
                    </Button>
                </Form>
            )}
        </FormContainer>
    </>
  )
}

export default HaircutEditScreen;