import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TargetType } from "../../Types/Types";

// interface TargetType {
//     id: number;
//     target?: string | null;
//     completed?: boolean;
// }
interface TargetResponse extends Array<TargetType> { }

interface AddTargetArgs {
    id: number;
    target?: string | null;
    completed?: boolean;
}

interface DeleteTargetArgs {
    id: number;
}

interface UpdateTargetArgs extends TargetType{} // Для обновления цели используем тот же тип, что и для цели

export const targetsApi = createApi({
    reducerPath: 'targetsApi',
    tagTypes: ['Targets'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://679f314024322f8329c30685.mockapi.io/",
    }),

    endpoints: (builder) => ({
        getTargets: builder.query<TargetType[], void>({
            query: () => 'targets',
            providesTags: ['Targets'],
            //@ts-ignore
            transformResponse: (res: TargetResponse) => res.sort((a, b) => b.id - a.id),
        }),
        addTarget: builder.mutation<TargetType[], AddTargetArgs>({
            query: (target) => ({
                url: '/targets',
                method: 'POST',
                body: target
            }),
            invalidatesTags: ['Targets']
        }),
        deleteTarget: builder.mutation<void, DeleteTargetArgs>({
            query: ({ id }) => ({
                url: `/targets/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Targets']
        }),
        updatedTarget: builder.mutation<TargetType, UpdateTargetArgs>({
            query: (target) => ({
                url: `/targets/${target.id}`,
                method: 'PUT',
                body: target
            }),
            invalidatesTags: ['Targets']
        }),
        updatedTargetText: builder.mutation<TargetType, UpdateTargetArgs>({
            query: (target) => ({
                url: '/targets/' + target.id,
                method: 'PUT',
                body: target,
            }),
            invalidatesTags: ['Targets']
        }),
    })
})

export const {
    useGetTargetsQuery,
    useAddTargetMutation,
    useDeleteTargetMutation,
    useUpdatedTargetMutation,
    useUpdatedTargetTextMutation
} = targetsApi
