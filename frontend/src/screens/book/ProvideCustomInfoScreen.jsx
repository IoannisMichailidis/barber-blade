import React from 'react';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
// Components
import BookingSteps from '../../components/booking/BookingSteps';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';
// Slices
import { saveCustInfo } from '../../slices/bookingSlice';

function ProvideCustInfoScreen() {
    // State Slices
    const { custInfo } = useSelector((state) => state.booking);

    // Initialization
    const navigate = useNavigate();
    const dispatch = useDispatch();

      const formik = useFormik({
        initialValues: {
          name: custInfo?.name,
          surname: custInfo?.surname,
          phoneNumber: custInfo?.phoneNumber,
          email: custInfo?.email,
          comment: custInfo?.comment,
        },
        onSubmit: async (values) => {
          try{
            // Update the global state with date and time
            dispatch(saveCustInfo({...values}));
            navigate('/booking-placebooking');

          } catch (err) {
            console.log('Date & Time is not saved in global state',err);
            formik.resetForm();
          }
        },
        validationSchema: Yup.object({
          name: Yup.string().required("Name is required"),
          surname: Yup.string().required("Surname is required"),
          phoneNumber: Yup.string()
          .matches(/^[0-9]+$/, "Phone number must contain only digits")
          .min(10, "Phone number must be at least 10 digits")
          .max(15, "Phone number must be no more than 15 digits")
          .required("Phone number is required"),
          email: Yup.string()
          .required("Email is required")
          .email("Invalid email format")
          .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Email must be in the format xx@xx.xx"),
        }),
      });

  return (
    <>
        <Row className="justify-content-center">
            <h1 className='text-center py-3 mb-4'>Provide Personal Information</h1>
        </Row>
        <Row className="justify-content-center">
            <BookingSteps step1 step2 step3/>
        </Row>
        <Row className="justify-content-center" >

            <Row style={{ maxWidth: '300px', margin: '0 auto' }}>

                <form onSubmit={formik.handleSubmit} noValidate>
                    {/* Submit Button */}

                    <input
                      aria-label="On Click"
                      disabled={
                        formik.errors.name || formik.errors.surname || formik.errors.phoneNumber || formik.errors.email ||
                        !formik.values.name || !formik.values.surname || !formik.values.phoneNumber || !formik.values.email
                      }
                      className='CustomButton'
                      type="submit"
                      value="Continue"
                    />
                    {/* Name */}
                    <div className='formDivs'>
                        <label htmlFor="name">Name:</label>
                        <input
                        data-testid="name"
                        className={(formik.touched.name && formik.errors.name) ? "errorFormInput" : "formInput" }
                        type="text"
                        id="name"
                        {...formik.getFieldProps("name")}
                        />
                        {formik.touched.name && formik.errors.name && <p className="errorDiv">{formik.errors.name}</p>}
                    </div>

                    {/* Surname */}
                    <div className='formDivs'>
                        <label htmlFor="surname">Surname:</label>
                        <input
                        data-testid="surname"
                        className={(formik.touched.surname && formik.errors.surname) ? "errorFormInput" : "formInput" }
                        type="text"
                        id="surname"
                        {...formik.getFieldProps("surname")}
                        />
                        {formik.touched.surname && formik.errors.surname && <p className="errorDiv">{formik.errors.surname}</p>}
                    </div>

                    {/* Phone number */}
                    <div className='formDivs'>
                        <label htmlFor="phoneNumber">Phone number:</label>
                        <input
                        data-testid="phoneNumber"
                        className={(formik.touched.phoneNumber && formik.errors.phoneNumber) ? "errorFormInput" : "formInput" }
                        type="tel"
                        id="phoneNumber"
                        {...formik.getFieldProps("phoneNumber")}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && <p className="errorDiv">{formik.errors.phoneNumber}</p>}
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

                    {/* Comment */}
                    <div className='formDivs'>
                        <label htmlFor="comment">Comment:</label>
                        <textarea
                        data-testid="comment"
                        className={(formik.touched.comment && formik.errors.comment) ? "errorFormInput" : "formInput" }
                        id="comment"
                        {...formik.getFieldProps("comment")}
                        ></textarea>
                        {formik.touched.comment && formik.errors.comment && <p className="errorDiv">{formik.errors.comment}</p>}
                    </div>
                </form>
              </Row>
        </Row>

    </>
  )}


export default ProvideCustInfoScreen