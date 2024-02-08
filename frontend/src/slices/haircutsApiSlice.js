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
        // Create a product
        createHaircut: builder.mutation({
            query: () => ({                 // Even if it is a post request, we don't pass any data because we create it with sample data directly in the backend endpoint and later on we will edit it
                url: HAIRCUTS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Haircut'],   // it is stopped from beeing cached. So we have fresh data. We get read of any cached data
        }),
        // Upload product Image
        uploadHaircutImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: 'POST',
                body: data
            })
        }),
        // Delete product
        deleteHaircut: builder.mutation({
            query: (productId) => ({
                url: `${HAIRCUTS_URL}/${productId}`,
                method: 'DELETE'
            })
        }),
    }),
});

export const {
    useGetHaircutsQuery,
    useCreateHaircutMutation,
    // useUpdateProductMutation,
    useUploadHaircutImageMutation,
    useDeleteHaircutMutation,
    // useGetCategoryProductsQuery //!!!!!
} = haircutsApiSlice;
