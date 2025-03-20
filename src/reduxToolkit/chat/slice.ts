import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getChatMessages: builder.query({
      queryFn: () => ({ data: [] }), // Заглушка, так как мы будем использовать WebSocket
    }),
  }),
});

export const { useGetChatMessagesQuery } = chatApi;