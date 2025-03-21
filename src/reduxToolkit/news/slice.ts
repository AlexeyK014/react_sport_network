import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsItem } from "../../Types/Types";

// Определяем тип для ответа от API
interface NewsResponse {
    status: string;
    totalResults: number;
    articles: NewsItem[];
}


export const newsApi = createApi({
    reducerPath: 'newsApi',
    tagTypes: ['News'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://newsapi.org/v2/",
        headers: {
            'User-Agent': 'Your-App-Name',
            'Accept': 'application/json',
          },
    }),
    endpoints: (builder) => ({
        getNews: builder.query<NewsResponse, void>({
            query: () => 'top-headlines?country=us&apiKey=9302c67949d945ecb3270ebee2bf7557&category=sport',
            providesTags: ['News'],
        }),
    })
})

export const { useGetNewsQuery } = newsApi
