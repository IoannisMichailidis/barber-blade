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

        // Register user endpoint
        // register: builder.mutation({      // POST request (mutation instead of query)
        //     query: (data) => ({           // send data to login endpoint
        //         url: USERS_URL,
        //         method: 'POST',
        //         body: data,
        //     }),
        // }),
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

        // Delete user
        // deleteUser: builder.mutation({
        //     query: (userId) => ({
        //         url: `${USERS_URL}/${userId}`,
        //         method: 'DELETE',
        //     }),
        // }),
        // Get user details
        // getUserDetails: builder.query({
        //     query: (userId) => ({
        //         url: `${USERS_URL}/${userId}`,
        //     }),
        //     keepUnusedDataFor: 5,
        // }),
        // Update user
        // updateUser: builder.mutation({
        //     query: (data) => ({
        //         url: `${USERS_URL}/${data.userId}`,
        //         method: 'PUT',
        //         body: data,
        //     }),
        //     invalidatesTags: ['Users'],  // it is stopped from beeing cached. So we have fresh data. We get read of any cached data
        // }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    // useRegisterMutation,
    useProfileMutation,
    useGetBarbersQuery,
    // useDeleteUserMutation,
    // useGetUserDetailsQuery,
    // useUpdateUserMutation
} = usersApiSlice;
