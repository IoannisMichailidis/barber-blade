import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
// Components
import Loader from '../../components/common/Loader';
// Slices
import { useProfileMutation, useUploadBarberImageMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';

const ProfileScreen = () => {
    // Initialization
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State Slices
    const { userInfo, token } = useSelector((state) => state.auth);
    // Api Slices
    const [updateProfile, { isLoading: loadingUpdateProfile, error }] = useProfileMutation();
    const [uploadBarberImage, {isLoading: loadingUpload}] = useUploadBarberImageMutation();

    const formik = useFormik({
        // Align local with global state
        initialValues: {
            username: userInfo?.username,
            email: userInfo?.email,
            image: userInfo?.image,
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
            image: Yup.string().required("Image is required"),
            password: Yup.string().required('Password is required').min(8, "Password must be at least 8 characters"),
            confPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Confirmation password is required'),
        }),
    });

    const uploadFileHandler = async (e) => {
        e.preventDefault();
        // Resize the image before upload
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
                    try {
                        const requestData = {
                            formData: formData,
                            token: token,
                        };
                        // Api Slice
                        console.log(formData)
                        const res = await uploadBarberImage(requestData).unwrap();
                        console.log(res);
                        toast.success(res.message);
                        // Update local state
                        formik.setFieldValue('image', res.image);
                    } catch (err) {
                        toast.error(err?.data?.message || err.error);
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
    <div className="formContainer">
        <div className='form'>
            <div className='formTitle'>
                <h2>Employee Info</h2>
            </div>
            <div className='formInputes'>
                <form onSubmit={formik.handleSubmit} noValidate>
                    {/* Username */}
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

                    {/* Image */}
                    <div className='formDivs'>
                        <label htmlFor="image">Image:</label>
                        <input
                        data-testid="image"
                        className={(formik.touched.image && formik.errors.image) ? "errorFormInput" : "formInput" }
                        type="text"
                        id="image"
                        {...formik.getFieldProps("image")}
                        />
                        <input
                        className={(formik.touched.email && formik.errors.image) ? "errorFormInput" : "formInput" }
                        type="file"
                        id="image"
                        onChange={uploadFileHandler}
                        />
                        {formik.touched.image && formik.errors.image && <p className="errorDiv">{formik.errors.image}</p>}
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
    </>
  )
}

export default ProfileScreen;