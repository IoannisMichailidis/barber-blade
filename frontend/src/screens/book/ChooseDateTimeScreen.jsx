import React, { useState, useEffect } from 'react';
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
import { useGetTimeslotsQuery } from '../../slices/timeslotsApiSlice';
import { saveDateTime } from '../../slices/bookingSlice';

function ChooseDateTimeScreen() {
    // Used for the Client-side validation
    const todayInitial = new Date().toLocaleDateString("en-CA");
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // State Slices
    const { barber } = useSelector((state) => state.booking);
    const { dateTime } = useSelector((state) => state.booking);

    // Local state
    const [timeslotID, setTimeslotID] = useState(dateTime?.timeslotId || '');

    // Initialization
    const navigate = useNavigate();
    const dispatch = useDispatch();

      const formik = useFormik({
        initialValues: {
          date: dateTime?.date || todayInitial,
          time: dateTime?.time,
        },
        onSubmit: async (values) => {
          try{
            // Update the global state with date and time
            dispatch(saveDateTime({...values, timeslotID}));
            navigate('/booking-custominfo');

          } catch (err) {
            console.log('Date & Time is not saved in global state',err);
            formik.resetForm();
          }
        },
        validationSchema: Yup.object({
          date: Yup.date().min(yesterday, "Date can't be in the past").required("Date is required"),
          time: Yup.string().required("Select one of the available time slots"),
    }),
      });

    // API Slices
    // Using RTK Query hook with dependencies on formik.values.date and barber.id
    // This will automatically refetch timeslots when the selected date or barber changes
    const { data: timeslots, isLoading, error } = useGetTimeslotsQuery({
        barber_id: barber?.id,
        date: formik.values.date
    });

    console.log(timeslots)

    // Find the timeslotID from time
    useEffect(() => {
        if (timeslots && formik.values.time) {
            const timeslot = timeslots.find(ts => ts.start_time === formik.values.time);
            if (timeslot) {
                setTimeslotID(timeslot.id);
            }
        }
    },[formik.values.time, timeslots])

  return (
<>
{ isLoading ? (
      <Loader/>
    ) : error ? (
      <Message variant='danger'>Something went wrong! {error.data?.message || error.error}</Message>
    ) : (
    <>
        <Row className="justify-content-center">
            <h1 className='text-center py-3 mb-4'>Select Date & Time</h1>
        </Row>
        <Row className="justify-content-center">
            <BookingSteps step1 step2/>
        </Row>
        <Row className="justify-content-center" >

            <Row style={{ maxWidth: '300px', margin: '0 auto' }}>

                <form onSubmit={formik.handleSubmit} noValidate>
                    {/* Submit Button */}
                    {isLoading ?
                    <input aria-label="On Click" disabled className='CustomButton' type="submit" value="loading"/>
                    :
                    <input aria-label="On Click" disabled={ !formik.values.date || !formik.values.time || formik.errors.date || formik.errors.time} className='CustomButton' type="submit" value="Continue"/>
                    }
                    { error && <p className="errorDiv">Something went wrong! Booking is not submitted.</p>}
                    {/* Date */}
                    <div className='formDivs' >
                        <label htmlFor="res-date">Choose date</label>
                        <input
                        data-testid="res-date"
                        className={( formik.errors.date) ? "errorFormInput" : "formInput" }
                        type="date"
                        id="res-date"
                        {...formik.getFieldProps("date")}
                        />
                        {formik.errors.date && <p className="errorDiv">{formik.errors.date}</p>}
                    </div>
                    {/* Time */}
                    <div className='formDivs'>
                        <label htmlFor="res-time">Choose time </label>
                        <select
                        data-testid="res-time"
                        className={(formik.touched.time && formik.errors.time) ? "errorFormInput" : "formInput" }
                        id="res-time"
                        {...formik.getFieldProps("time")}
                        >
                        <option value="" disabled hidden></option>
                        {timeslots.length > 0 && !formik.errors.date ? (
                        timeslots.map((timeslot) => (
                            <option key={timeslot.id} value={timeslot.start_time} disabled={timeslot.is_booked} style={{ backgroundColor: timeslot.is_booked ? 'lightgrey' : 'white' }}>{timeslot.start_time.substring(0,5)}  </option>
                        ))
                        ) : (
                            <option value="" disabled>No available timeslots</option>
                        )}
                        </select>
                        {formik.touched.time && formik.errors.time && <p className="errorDiv">{formik.errors.time}</p>}
                    </div>
                </form>
              </Row>
        </Row>

    </>
     ) }
</>
  )
}

export default ChooseDateTimeScreen