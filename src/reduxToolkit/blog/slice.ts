import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostType } from "../../Types/Types";


export const postsApi = createApi({
    reducerPath: 'postsApi',
    tagTypes: ['Posts'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://65e210dea8583365b317db8c.mockapi.io/",
    }),

    endpoints: (builder) => ({
        getPosts: builder.query<PostType[], void>({
            query: () => '/posts',
            providesTags: ['Posts'],
            transformResponse: (res: PostType[]) => res.sort((a, b) => parseInt(b.id) - parseInt(a.id))
        }),
        addPost: builder.mutation<PostType, Partial<PostType>>({
            query: (post) => ({
                url: '/posts',
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Posts'] 
        }),
        updatePost: builder.mutation<PostType, PostType>({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['Posts'] 
        }),
        updatePostTitle: builder.mutation<PostType, { id: string; title: string }>({
            query: (post) => ({
                url: '/posts/' + post.id,
                method: 'PUT',
                body: post, 
            }),
            invalidatesTags: ['Posts']
        }),
        updatePostDescription: builder.mutation<PostType, { id: string; description: string }>({
            query: (post) => ({
                url: '/posts/' + post.id,
                method: 'PUT',
                body: post, 
            }),
            invalidatesTags: ['Posts']
        }),
        deletePost: builder.mutation<void, { id: string }>({
            query: ({id}) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Posts'] 
        }),
    })
})

export const {
    useGetPostsQuery,
    useAddPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useUpdatePostTitleMutation,
    useUpdatePostDescriptionMutation
} = postsApi
