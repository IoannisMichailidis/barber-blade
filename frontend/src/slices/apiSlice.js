import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        // Add headers here
        // headers.set('Content-Type', 'application/json');
        // headers.set('Accept', 'application/json');
        // You can also conditionally add headers, like authorization tokens
        return headers;
    },
});
// const baseQuery = fetchBaseQuery({ baseUrl: '/api' });
// Create Slice
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Haircut', 'Timeslot', 'Booking', 'User'],
    endpoints: (builder) => ({})
});