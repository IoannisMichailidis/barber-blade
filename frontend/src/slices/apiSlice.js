import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        return headers;
    },
});
// Create Slice
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Gallery', 'Haircut', 'Timeslot', 'Booking', 'User'],
    endpoints: (builder) => ({})
});