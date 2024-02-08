import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Button, Row, Col, Image} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
// Components
import Loader from '../../components/common/Loader';
// Slices
import { useProfileMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';

const ProfileScreen = () => {
    // Initialization
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get user info from global state
    const { userInfo, token } = useSelector((state) => state.auth);
    // Api Slices
    const [updateProfile, { isLoading: loadingUpdateProfile, error }] = useProfileMutation();

    const formik = useFormik({
        // Align local with global state
        initialValues: {
            username: userInfo?.username,
            email: userInfo?.email,
            password: '',
            confPassword: ''
        },
        onSubmit: async (values) => {
        try {
            const requestData = {
                ...values,
                id: userInfo.id,
                token: token,
            };
            // Api Slice
            const res = await updateProfile(requestData).unwrap(); // unwrap the resolved value from the promise
            // State Slice (upate the credentials)
            dispatch(setCredentials(res));
            toast.success('Profile updated successfully');
            navigate("/");
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
    <div className="formContainer">
        <div className='form'>
            <div className='formTitle'>
                <h2>Employee Info</h2>
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
                    {loadingUpdateProfile ?
                        <input aria-label="On Click" disabled className='CustomButton' type="submit" value="loading"/>
                        :
                        <input aria-label="On Click" disabled={formik.errors.email || formik.errors.password} className='CustomButton' type="submit" value="Update"/>
                    }
                    { error && <p className="errorDiv">Incorrect email or password.</p>}
                    { loadingUpdateProfile && <Loader />}
                </form>
            </div>
        </div>
    </div>
  )
}

export default ProfileScreen;