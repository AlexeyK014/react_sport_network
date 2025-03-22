import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { chatAPI, ChatMessageAPIType, StatusType } from '../../Components/api/chat-api.ts';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fakeBaseQuery(), // Используем fakeBaseQuery, так как мы не работаем с HTTP
  endpoints: (builder) => ({
    getMessages: builder.query<ChatMessageAPIType[], void>({
      queryFn: () => ({ data: [] }), // Инициализация пустого массива сообщений
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // Ждем, пока кэш будет готов
          await cacheDataLoaded;

          // Обработчик новых сообщений
          const newMessageHandler = (messages: ChatMessageAPIType[]) => {
            console.log('New messages received:', messages); // Логируем полученные сообщения
            updateCachedData((draft) => {
              // Добавляем новые сообщения в кэш
              draft.push(...messages);
            });
          };

          // Подписываемся на событие получения сообщений
          chatAPI.subscride('message-received', newMessageHandler);

          // Ждем, пока кэш будет удален (например, при unmount компонента)
          await cacheEntryRemoved;

          // Отписываемся от события
          chatAPI.unsubscribe('message-received', newMessageHandler);
        } catch (error) {
          console.error('Ошибка в подписке на сообщения:', error);
        }
      },
    }),
    getStatus: builder.query<StatusType, void>({
      queryFn: () => ({ data: 'pending' }), // Инициализация статуса
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // Ждем, пока кэш будет готов
          await cacheDataLoaded;

          // Обработчик изменения статуса
          const statusChangedHandler = (status: StatusType) => {
            updateCachedData(() => status); // Обновляем статус в кэше
          };

          // Подписываемся на событие изменения статуса
          chatAPI.subscride('status-changed', statusChangedHandler);

          // Ждем, пока кэш будет удален
          await cacheEntryRemoved;

          // Отписываемся от события
          chatAPI.unsubscribe('status-changed', statusChangedHandler);
        } catch (error) {
          console.error('Ошибка в подписке на статус:', error);
        }
      },
    }),
    sendMessage: builder.mutation<void, string>({
      queryFn: (message) => {
        // Отправляем сообщение через WebSocket
        chatAPI.sendMessage(message);
        return { data: undefined };
      },
    }),
  }),
});

export const { useGetMessagesQuery, useGetStatusQuery, useSendMessageMutation } = chatApi;