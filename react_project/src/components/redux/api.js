import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const getToken = () => {
    return localStorage.getItem('LoggedUserToken');
};

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users',
            providesTags: ['User'],
        }),
        getUser: builder.query({
            query: (id) => `users/fetchuser/${id}`,
        }),
        getallUser: builder.query({
            query: () => `users/fetchuser`,
            invalidatesTags: ['User'],
        }),

        getSingleUser: builder.query({
            query: (id) => ({
                url: `users/getSingle/${id}`,
                // headers: {
                //     Authorization: `Bearer ${getToken()}`
                // }
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/deleteuser/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        addUser: builder.mutation({
            query: (user) => ({
                url: 'users/register',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
        getSingleData: builder.mutation({
            query: (id) => ({
                url: `/update/update${id}`,
                method: 'POST',
              
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: ( {id,data} ) => ({
                url: `users/update/${id}`,
                method: 'PUT',
                body:{data},
            }),
            invalidatesTags: ['User'],
        }),
        logInUser: builder.mutation({
            query: (data) => ({
                url: 'users/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    }),

});


export const { useGetallUserQuery,useGetSingleUserQuery, useGetUsersQuery, useGetUserQuery, useAddUserMutation, useDeleteUserMutation, useGetSingleDataMutation, useLogInUserMutation, useUpdateUserMutation } = usersApi;