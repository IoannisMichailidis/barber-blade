// Communicate with the back-end Server

import { GALLERY_URL } from "../constants";
import { apiSlice } from './apiSlice';

// Inject endpoint to main apiSlice
export const galleryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // ----------------------------------------------------------
        // Public
        // ----------------------------------------------------------
        // Get all the gallery images
        getGallery: builder.query({
            query: ({ pageNumber}) => ({  //  Search and Pagination functionality
                url: GALLERY_URL,
                params: {
                    page: pageNumber,
                },
            }),
            providesTags: ['Gallery'], // instead of having to refresh the page or refetching the data using the refetch
            keepUnusedDataFor: 5
        }),

        // ----------------------------------------------------------
        // OWNER
        // ----------------------------------------------------------
        // Create a gallery item
        createGallery: builder.mutation({
            query: (data) => ({
                url: GALLERY_URL,
                method: 'POST',
                body: data.formData,
                headers:{
                    Authorization: `Token ${data.token}`,
                },
            }),
            invalidatesTags: ['Gallery'],
        }),

        // Delete haircut
        deleteGallery: builder.mutation({
            query: (data) => ({
                url: `${GALLERY_URL}/${data.id}`,
                method: 'DELETE',
                headers:{
                    Authorization: `Token ${data.token}`,
                },
            }),
            invalidatesTags: ['Gallery'],
        }),
    }),
});

export const {
    useGetGalleryQuery,
    useCreateGalleryMutation,
    useDeleteGalleryMutation,
} = galleryApiSlice;
