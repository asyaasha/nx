// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Ticket } from '@acme/shared-models';

// Define a service using a base URL and expected endpoints
export const ticketsApi = createApi({
  reducerPath: 'ticketsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Tickets'],
  endpoints: (build) => ({
    getTickets: build.query<Ticket[], void>({
      query: () => 'tickets',
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Tickets', id } as const)),
      ],
    }),
    getTicketById: build.query<Ticket, string>({
      query: (ticketId) => `tickets/${ticketId}`,
      providesTags: (result, error, id) => [{ type: 'Tickets', id }],
    }),
    assignTicket: build.mutation<void, Partial<{ticketId: string, userId: string}>>({
      query: ({ticketId, userId}) => ({
        url: `tickets/${ticketId}/assign/${userId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Tickets'],
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useAssignTicketMutation,
} = ticketsApi;