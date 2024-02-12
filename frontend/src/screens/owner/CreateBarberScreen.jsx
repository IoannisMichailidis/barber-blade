import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
// Components
import FormContainer from '../../components/common/FormContainer';
import BookingSteps from '../../components/booking/BookingSteps';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';
// Slices
import { useCreateBarberMutation } from '../../slices/usersApiSlice';

function CreateBarberScreen() {

    // Global State
    const { token } = useSelector((state) => state.auth);
    console.log(token)
    // Api Slices
    const [ createBarber, { isLoading, error}] = useCreateBarberMutation();
    console.log(error?.data)
    // Initialization
    const navigate = useNavigate();

      const formik = useFormik({
        initialValues: {
          username: '',
          email: '',
          password: '',
          confPassword: ''
        },
        onSubmit: async (values) => {
        try {
            const requestData = {
                ...values,
                token: token,
            };
            console.log(`user created ${requestData.password}`)
            // Api Slice
            const res = await createBarber(requestData).unwrap();
            console.log(res)
            if(res.error){
                toast.error(res.error)
                formik.resetForm();
            } else {
                toast.success('Barber created');
                navigate('/owner/barberlist');
            }
        } catch (err) {
            toast.error(err?.data?.message || err?.error );
        }
        },
        validationSchema: Yup.object({
          username: Yup.string().required("Username is required"),
          email: Yup.string()
          .required("Email is required")
          .email("Invalid email format"),
          password: Yup.string().required('Password is required').min(8, "Password must be at least 8 characters"),
          confPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirmation password is required'), 
        }),
      });

  return (
    <>
        <Link to='/owner/barberlist' className='btn btn-light my-2'>
            Go Back
        </Link>
        <Row className="justify-content-center">
            <h1 className='text-center py-3 mb-4'>Create Barber</h1>
        </Row>
        <Row className="justify-content-center" >

            <Row style={{ maxWidth: '300px', margin: '0 auto' }}>

                <form onSubmit={formik.handleSubmit} noValidate>

                    {/* Username */}
                    <div className='formDivs'> 
                        <label htmlFor="username">Username:</label>
                        <input 
                        data-testid="username"  
                        className={(formik.touched.username && formik.errors.username) ? "errorFormInput" : "formInput" }
                        type="text" 
                        id="username" 
                        {...formik.getFieldProps("username")} 
                        />
                        {formik.touched.username && formik.errors.username && <p className="errorDiv">{formik.errors.username}</p>}
                    </div>

                    {/* Email */}
                    <div className='formDivs'> 
                        <label htmlFor="email">Email:</label>
                        <input 
                        data-testid="email"  
                        className={(formik.touched.email && formik.errors.email) ? "errorFormInput" : "formInput" }
                        type="email" 
                        id="email" 
                        {...formik.getFieldProps("email")} 
                        />
                        {formik.touched.email && formik.errors.email && <p className="errorDiv">{formik.errors.email}</p>}
                    </div>
                    {/* Password */}
                    <div className='formDivs' >
                        <label htmlFor="password">Password:</label>
                        <input 
                        data-testid="password"  
                        className={( formik.touched.password && formik.errors.password) ? "errorFormInput" : "formInput" }
                        type="password" 
                        id="password" 
                        {...formik.getFieldProps("password")} 
                        />
                        {formik.touched.password && formik.errors.password && <p className="errorDiv">{formik.errors.password}</p>}
                    </div>

                    {/* Conf Password */}
                    <div className='formDivs' >
                        <label htmlFor="confPassword">Conf Password:</label>
                        <input 
                        data-testid="confPassword"  
                        className={( formik.touched.confPassword && formik.errors.confPassword) ? "errorFormInput" : "formInput" }
                        type="password" 
                        id="confPassword" 
                        {...formik.getFieldProps("confPassword")} 
                        />
                        {formik.touched.confPassword && formik.errors.confPassword && <p className="errorDiv">{formik.errors.confPassword}</p>}
                    </div>
                    {/* Submit Button */}
                    {isLoading ?
                        <input aria-label="On Click" disabled className='CustomButton' type="submit" value="loading"/>
                        :
                        <input
                            aria-label="On Click"
                            disabled={
                                formik.errors.username || formik.errors.email || formik.errors.password || formik.errors.confPassword ||
                                !formik.values.username || !formik.values.email || !formik.values.password || !formik.values.confPassword
                              }
                            className='CustomButton'
                            type="submit"
                            value="Create"/>
                    }
                    { error && <p className="errorDiv">{error?.data?.username}</p>}
                    { isLoading && <Loader />}
                </form>
              </Row>
        </Row>

    </>
  )}


export default CreateBarberScreen