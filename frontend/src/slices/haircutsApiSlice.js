// Communicate with the back-end Server

import { HAIRCUTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from './apiSlice';

// Inject endpoint to main apiSlice
export const haircutsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // ----------------------------------------------------------
        // Public
        // ----------------------------------------------------------
        // Get all the products
        getHaircuts: builder.query({
            query: ({ pageNumber}) => ({  //  Search and Pagination functionality
                url: HAIRCUTS_URL,
                params: {
                    page: pageNumber,
                },
            }),
            providesTags: ['Haircuts'], // instead of having to refresh the page or refetching the data using the refetch
            keepUnusedDataFor: 5
        }),
        // Get a single haircut
        getHaircutDetails: builder.query({
            query: (id) => ({
                url: `${HAIRCUTS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5
        }),
        // Get category products (fedora | bowler | cowboy)
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // getCategoryProducts: builder.query({
        //     query: ({category, pageNumber}) => ({ // Only Pagination functionality
        //         url: `${HAIRCUTS_URL}/category/${category}`,
        //         params: {
        //              category,
        //              pageNumber,
        //         },
        //     }),
        //     keepUnusedDataFor: 5
        // }),
        // ----------------------------------------------------------
        // ADMIN
        // ----------------------------------------------------------
        // Create a haircut
        createHaircut: builder.mutation({
            query: ({token}) => ({                 // Even if it is a post request, we don't pass any data because we create it with sample data directly in the backend endpoint and later on we will edit it
                url: HAIRCUTS_URL,
                method: 'POST',
                headers:{
                    Authorization: `Token ${token}`,
                },
            }),
            invalidatesTags: ['Haircut'],   // it is stopped from beeing cached. So we have fresh data. We get read of any cached data
        }),
        // Update a haircut
        updateHaircut: builder.mutation({
            query: (data) => ({
                url: `${HAIRCUTS_URL}/${data.id}`,
                method: 'PUT',
                body: data,
                headers:{
                    Authorization: `Token ${data.token}`,
                },
            }),
            invalidatesTags: ['Haircuts'],   // it is stopped from beeing cached. So we have fresh data or we clear the cache. We get read of any cached data
        }),
        // Upload haircut Image
        uploadHaircutImage: builder.mutation({
            query: (data ) => ({
                url: UPLOAD_URL,
                method: 'POST',
                body: data.formData,
                headers:{
                    Authorization: `Token ${data.token}`,
                },
            })
        }),
        // Delete haircut
        deleteHaircut: builder.mutation({
            query: (data) => ({
                url: `${HAIRCUTS_URL}/${data.id}`,
                method: 'DELETE',
                headers:{
                    Authorization: `Token ${data.token}`,
                },
            }),
            invalidatesTags: ['Haircuts'],
        }),
    }),
});

export const {
    useGetHaircutsQuery,
    useGetHaircutDetailsQuery,
    useCreateHaircutMutation,
    useUpdateHaircutMutation,
    useUploadHaircutImageMutation,
    useDeleteHaircutMutation,
    // useGetCategoryProductsQuery //!!!!!
} = haircutsApiSlice;
