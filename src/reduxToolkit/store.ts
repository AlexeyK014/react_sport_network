import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { postsApi } from './blog/slice.ts'
import { profileApi } from '../reduxToolkit/profile/slice.ts'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authApi } from './auth/slice.ts';
import { usersApi } from './user/slice.ts';
import { targetsApi } from './targets/slice.ts';
import { newsApi } from './news/slice.ts';




const rootReducer = combineReducers({
  [profileApi.reducerPath]: profileApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [targetsApi.reducerPath]: targetsApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  // [chatApi.reducerPath]: chatApi.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat([
          profileApi.middleware,
          authApi.middleware,
          postsApi.middleware,
          usersApi.middleware,
          targetsApi.middleware,
          newsApi.middleware,
          // chatApi.middleware
        ])  
})



export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


