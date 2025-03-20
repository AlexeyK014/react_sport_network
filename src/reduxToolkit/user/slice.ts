import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../../Types/Types";

interface User {
  id: number;
  name: string;
  status: string;
  photos: {
    small: string | null;
    large: string | null;
  };
  followed: boolean;
}

interface UsersResponse {
  items: UserType[];
  totalCount: number;
  error: string | null;
}

interface FollowResponse {
  resultCode: number;
  messages: string[];
  data: Record<string, never>;
}

// типизация аргументов в запросах
interface GetUsersArgs {
  currentPage: number;
  term: string;
  filter: string;
}

interface FollowUnfollowArgs {
  id: number;
}

export const usersApi = createApi({
  reducerPath: 'users',
  tagTypes: ['users', 'follow'],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://social-network.samuraijs.com/api/1.0/",
    credentials: "include",
    headers: {
      "API-KEY": "bed6ca62-291b-4bb7-b19b-b61c0a934821"
    }
  }),

  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, GetUsersArgs>({
      query(args) {
        const { currentPage, term, filter } = args
        return {
          url: `users?page=${currentPage}&term=${term}&followed=${filter}`,
          credentials: "include",
          providesTags: ['users']
        }
      },
    }),
    follow: builder.mutation<FollowResponse, FollowUnfollowArgs>({
      query(user) {
        return {
          url: `follow/${user.id}`,
          method: 'POST',
          credentials: "include",
          body: {user},
        }
      },
      invalidatesTags: ['follow'],
    }),
    unfollow: builder.mutation<FollowResponse, FollowUnfollowArgs>({
      query(user) {
        return {
          url: `follow/${user.id}`,
          method: 'DELETE',
          credentials: "include",
          body: {user},
        }
      },
      invalidatesTags: ['follow'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useFollowMutation,
  useUnfollowMutation
} = usersApi