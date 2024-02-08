import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
// Components
import FormContainer from '../../components/common/FormContainer';
import Loader from '../../components/common/Loader';
// Slices
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials, setToken } from '../../slices/authSlice';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginApiCall, { isLoading, error }] = useLoginMutation();

    // Get user info from the global state
    const { userInfo } = useSelector((state) => state.auth);

    // Search params to implement redirection functionality
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const redirect = searchParams.get('redirect') || '/'; // checks if there is the redirect in the params. If not then /

    // Redirected if logged in
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    },[userInfo, redirect, navigate])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: async (values) => {
        //   const doc = { ...values };
          try {
            // Login user using login from userLoginMutation (post request to back-end)
            //const res = await loginApiCall({username, password}).unwrap(); // unwrap the resolved value from the promise
            const res = await loginApiCall({...values}).unwrap();
            const setCredentials_res = res.user;
            const setToken_res = res.token;

            // Update global states
            dispatch(setCredentials({...setCredentials_res}));
            dispatch(setToken(setToken_res));
            // Redirect the user
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required")
        }),
      });

  return (
    <div className="formContainer">
        <div className='form'>
            <div className='formTitle'>
                <h2>Welcome Back</h2>
            </div>
            <div className='formInputes'>
                <form onSubmit={formik.handleSubmit} noValidate>
                    {/* Username */}
                    {/* isInvalid={formik.errors.username} */}
                    <div className='formDivs'> 
                        <label htmlFor="username">Username:</label>
                        <input 
                        data-testid="username"  
                        className={(formik.touched.username && formik.errors.username) ? "errorFormInput" : "formInput" }
                        type="text" 
                        id="user-name" 
                        {...formik.getFieldProps("username")} 
                        />
                        {formik.touched.username && formik.errors.username && <p className="errorDiv">{formik.errors.username}</p>}
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

                    {/* Submit Button */}
                    {isLoading ?
                        <input aria-label="On Click" disabled className='CustomButton' type="submit" value="loading"/>
                        :
                        <input aria-label="On Click" disabled={formik.errors.email || formik.errors.password} className='CustomButton' type="submit" value="Login"/>
                    }
                    { error && <p className="errorDiv">Incorrect email or password.</p>}
                    { isLoading && <Loader />}
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginScreen