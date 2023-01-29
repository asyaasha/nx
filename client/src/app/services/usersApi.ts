// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '@acme/shared-models';

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => 'users',
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Users', id } as const)),
      ],
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUsersQuery,
} = usersApi;