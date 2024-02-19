// Communicate with the back-end Server

import { TIMESLOTS_URL } from "../constants";
import { apiSlice } from './apiSlice';

// Inject endpoint to main apiSlice
export const timeslotsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // ----------------------------------------------------------
        // PUBLIC
        // ----------------------------------------------------------
        // Get all timeslots
        getTimeslots: builder.query({
            query: ({barber_id, date}) => ({ // Pagination functionality
                url: TIMESLOTS_URL,
                params: {
                    barber_id,
                    date,
                },
                headers: {
                    'Accept': 'application/json', // Explicitly accept JSON response
                },
            }),
            keepUnusedDataFor: 5
        }),
        // Update timeslot to be set as booked
        updateTimeslot: builder.mutation({
            query: (orderId) => ({
                url: `${TIMESLOTS_URL}/${orderId}`,
                method: 'PUT',
                headers: {
                    'Accept': 'application/json', // Explicitly accept JSON response
                },
            }),
        }),
    }),
});

export const {
    useGetTimeslotsQuery,
    useUpdateTimeslotMutation
 } = timeslotsApiSlice;
