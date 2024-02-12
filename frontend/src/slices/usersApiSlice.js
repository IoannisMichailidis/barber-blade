// Communicate with the back-end Server

import { USERS_URL, USERS_AUTH_URL } from "../constants";
import { apiSlice } from './apiSlice';

// Inject endpoints to main apiSlice
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // login user endpoint
        login: builder.mutation({      // POST request (mutation instead of query)
            query: (data) => ({        // send data to login endpoint
                // url: `${USERS_AUTH_URL}/login/`,
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        // logout user endpoint
        logout: builder.mutation({      // POST request (mutation instead of query)
            query: (token) => ({
                url: `${USERS_AUTH_URL}/logout/`,
                method: 'POST',
                headers:{
                    Authorization: `Token ${token}`,
                },
            }),
        }),
        // Get barbers
        getBarbers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['Users'], // Otherwise we need to reload the page in case a user is deleted or updated
            keepUnusedDataFor: 5
        }),

        // Update user profile endpoint
        profile: builder.mutation({      // POST request (mutation instead of query)
            query: (data) => ({
                url: `${USERS_URL}/${data.id}`,
                method: 'PUT',
                body: data,
                headers:{
                    Authorization: `Token ${data.token}`,
                },
            }),
        }),
        // ----------------------------------------------------------
        // ADMIN
        // ----------------------------------------------------------
        // Create a barber
        createBarber: builder.mutation({
            query: (data) => ({                 // Even if it is a post request, we don't pass any data because we create it with sample data directly in the backend endpoint and later on we will edit it
                url: USERS_URL,
                method: 'POST',
                body: data,
                headers:{
                    Authorization: `Token ${data.token}`,
                },
            }),
        }),

        // Delete user
        deleteBarber: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.id}`,
                method: 'DELETE',
                headers:{
                    Authorization: `Token ${data.token}`,
                },
            }),
        }),
        // Upload Barber Image
        uploadBarberImage: builder.mutation({
            query: (data ) => ({
                url: `${USERS_URL}/upload-user`,
                method: 'POST',
                body: data.formData,
                headers:{
                    Authorization: `Token ${data.token}`,
                },
            })
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useCreateBarberMutation,
    useProfileMutation,
    useGetBarbersQuery,
    useDeleteBarberMutation,
    useUploadBarberImageMutation
} = usersApiSlice;
