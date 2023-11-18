import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamApi = createApi({
  reducerPath: "shazamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://spotify81.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_SHAZAM_RAPID_API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "top_200_tracks" }),
    getPlayableUrl: builder.query({
      query: (trackid) => `tracks/?ids=${trackid}`,
    }),
    getSongLyrics: builder.query({
      query: (songLyrics) => `track_lyrics/?id=${songLyrics}`,
    }),
    getArtist: builder.query({
      query: (artistid) => `artists/?ids=${artistid}`,
    }),
    getSongRelated: builder.query({
      query: (artistIdForImg) => `artist_related/?ids=${artistIdForImg}`,
    }),
    getTop20: builder.query({
      query: () => `top_20_by_monthly_listener`,
    }),
    getSongsBySearch: builder.query({
      query: (search) => `search?q=${search}&type=multi`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetPlayableUrlQuery,
  useGetSongLyricsQuery,
  useGetArtistQuery,
  useGetSongRelatedQuery,
  useGetTop20Query,
  useGetSongsBySearchQuery,
} = shazamApi;
