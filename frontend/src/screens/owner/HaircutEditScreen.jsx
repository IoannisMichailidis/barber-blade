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

    // Global State / State Slices
    const { token } = useSelector((state) => state.auth);

    // Local state
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    // Api Slice: Get a haircut
    const { data: haircut, isLoading, error } = useGetHaircutDetailsQuery(id);

    // Api Slice: Update a product
    const [ updateHaircut, {isLoading: loadingUpdate }] = useUpdateHaircutMutation();

    // Api Slice: Upload product image (POST)
    const [uploadHaircutImage, {isLoading: loadingUpload}] = useUploadHaircutImageMutation();

    // Initialization
    const navigate = useNavigate();

    // Align the local state with the product data coming from the api call for form initial data representation.
    useEffect(() => {
        if (haircut) {
            setTitle(haircut.title);
            // setPrice(product.price);
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
            // price,
            // image,
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
        // Resize the image before upload
    //     const file = e.target.files[0];
    //     console.log(file)
    //     if (!file) {
    //         return;
    //     }
    //     const formData = new FormData();

    //     formData.append('image', file)
    //     formData.append('haircut_id', id)
    //     console.log(formData)
    //     console.log(id)
    //     try {
    //         const requestData = {
    //             formData: formData,
    //             token: token,
    //         };
    //         // Api Slice
    //         const res = await uploadHaircutImage(requestData).unwrap();
    //         console.log(`result after the execution of the API Slice${res}`);
    //         toast.success(res.message);
    //         // Update local state
    //         setImage(res.image);
    //     } catch (err) {
    //         toast.error(err?.data?.message || err.error);
    // }

        const file = e.target.files[0];
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
                        toast.error(err?.data?.message || err.error);
                    }
                }, 'image/jpeg', 0.75); // Adjust the format and quality as needed
            };
        };
    };

  return (
    <>
        <Link to='/owner/haircutlist' className='btn btn-light my-2'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit Haircut</h1>
            {loadingUpdate && <Loader/>}

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>Something went wrong!</Message> /* {error.data.message}*/
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