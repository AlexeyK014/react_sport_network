import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Определяем типы для ответов API
interface AuthResponse {
  data: {
    id: number;
    login: string;
    email: string;
  };
  resultCode: number;
  messages: string[];
}

interface LoginResponse {
  data: {
    userId: number;
  };
  resultCode: number;
  messages: string[];
}

interface LogoutResponse {
  data: {};
  resultCode: number;
  messages: string[];
}

// Типы для входных данных
interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
}



export const authApi = createApi({
  reducerPath: 'auth',
  tagTypes: ['authUser', 'loginUser'],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://social-network.samuraijs.com/api/1.0",
    credentials: "include",
    headers: {
      "API-KEY": "bed6ca62-291b-4bb7-b19b-b61c0a934821"
    },
  }),
  keepUnusedDataFor: 60*60,

  endpoints: (builder) => ({
    setAuth: builder.query<{ userId: number; loginUser: string; resultCode: number }, void>({
      query() {
        return {
          url: `/auth/me`,
          method: 'GET',
          credentials: 'include',
          providesTags: ['authUser'],
        }
      },
      transformResponse: (response: AuthResponse) => ({
        userId: response.data.id,
        loginUser: response.data.login,
        resultCode: response.resultCode
      })
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
        query(body) {
          // const {email, password, rememberMe, captcha} = data;
          return {
            url: `/auth/login`,
            method: 'POST',
            credentials: 'include',
            body
          }
        } ,
        invalidatesTags: ['loginUser'], 
      }),
    logout: builder.mutation<void, void>({
      query(body) {
        return {
          url: `/auth/login`,
          method: 'DELETE',
          credentials: 'include',
          body
        }
      },
      invalidatesTags: ['loginUser'],
    }) 

  }),
})

export const { useSetAuthQuery, useLoginMutation, useLogoutMutation } = authApi
