import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PhotosType, ProfileType, StatusType } from "../../Types/Types";



export const profileApi = createApi({
    reducerPath: 'profile', 
    tagTypes: ['profile'],
    baseQuery: fetchBaseQuery({ 
            baseUrl: "https://social-network.samuraijs.com/api/1.0/", 
            credentials: "include",
              headers: {
                "API-KEY": "bed6ca62-291b-4bb7-b19b-b61c0a934821"
              }    
        }), 
  
    endpoints: (builder) => ({ 
      getProfile: builder.query<ProfileType, number>({
        query(userId) {
          return {
            url: `profile/${userId}`,
            credentials: "include",
            providesTags: ['profile']
          }
        },
      }), 
      getStatus: builder.query<StatusType | undefined, number>({ 
        query(userId) {
          return {
            url: `profile/status/${userId}`,
            method: 'GET', 
            credentials: "include",
          }
        },
      }), 
      updatedProfile: builder.mutation<ProfileType, Partial<ProfileType>>({
        query: (profile) => ({
            url: `/profile`,
            method: 'PUT',
            body: profile
        }),
        invalidatesTags: ['profile']
      }),
      updatedStatus: builder.mutation<void, { status: string | null }>({
        query: (status) => ({
            url: `/profile/status`,
            method: 'PUT',
            body: status
        }),
        invalidatesTags: ['profile']
      }),
      savePhoto: builder.mutation<PhotosType, File>({
        //@ts-ignore
        async queryFn(file, _queryApi, _extraOptions, fetchWithBQ) {
          // загрузка с многочастными данными формы
          const formData = new FormData();
          formData.append('file', file);
          const response = await fetchWithBQ({
            url: 'profile/photo/',
            method: 'POST',
            body: formData,
          });
          if (response.error) throw response.error;
          return response.data ? { data: response.data } : { error: response.error };
        },
        invalidatesTags: ['profile']
      }),
  }), 
}) 

export const { 
  useGetProfileQuery,
  useGetStatusQuery, 
  useUpdatedProfileMutation, 
  useUpdatedStatusMutation,
  useSavePhotoMutation
} = profileApi