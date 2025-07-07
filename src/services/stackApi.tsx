import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface  Stack {
  id: number;
  name: string;
  image: string;
  createdAt: string
}

export const stackApi = createApi({
  reducerPath: 'stackApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://54.210.160.235/' }),
  tagTypes: ['Stack'],
  endpoints: (builder) => ({
    getStacks: builder.query<Stack[], void>({
      query: () => 'stacks',
      providesTags: ['Stack'],
    }),
    createStack: builder.mutation<Stack, Partial<Stack>>({
      query: (body) => ({
        url: 'stacks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Stack'],
    }),
    updateStack: builder.mutation<Stack, { id: number; body: Partial<Stack> }>({
      query: ({ id, body }) => ({
        url: `stacks/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Stack'],
    }),
    deleteStack: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `stacks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Stack'],
    }),
  }),
});

export const {
  useGetStacksQuery,
  useCreateStackMutation,
  useUpdateStackMutation,
  useDeleteStackMutation,
} = stackApi;
