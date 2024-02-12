// Communicate with the back-end Server

import { BOOKINGS_URL } from "../constants";
import { apiSlice } from './apiSlice';

// Inject endpoint to main apiSlice
export const bookingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create booking
        createBooking: builder.mutation({
            query: (order) => ({
                url: BOOKINGS_URL,
                method: 'POST',
                body: {...order}
            })
        }),
        // ----------------------------------------------------------
        // OWNER || BARBER
        // ----------------------------------------------------------
        // Get all bookings
        getBookings: builder.query({
            query: ({pageNumber, token}) => ({ // Pagination functionality
                url: BOOKINGS_URL,
                params: {
                    page: pageNumber,
                },
                headers:{
                    Authorization: `Token ${token}`,
                },
            }),
            keepUnusedDataFor: 5
        }),
    }),
});

export const {
    useCreateBookingMutation,
    useGetBookingsQuery,
 } = bookingsApiSlice;
