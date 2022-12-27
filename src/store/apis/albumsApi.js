import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
const albumsApi = createApi({
  //describe each individual request for albums
  //reducer path=>  our state in the store must have the same name as reducerPath
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    //fetchBaseQuery=> Handle how and where to send requests
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      //configurations for all the requests
      fetchAlbums: builder.query({
        //we assign to this query a tag called 'Album'
        providesTags: (result, error, user) => {
          //arg is the user object
          //result is what we got back from json server
          const tags = result.map((album) => {
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UsersAlbums", id: user.id });
          return tags;
        },
        query: (user) => {
          //this query function is for specify to RTK query how to make a request
          return {
            url: "/albums",
            params: {
              //http://localhost:3005/albums?userId=user.id
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: "UsersAlbums", id: user.id }];
        },
        //whenever we run this mutation,, go and find all th queries that make use of 'Album' tag
        //mark them as out of date, so those queries will be executed again.
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              title: faker.commerce.productName(),
              userId: user.id,
            },
          };
        },
      }),
      deleteAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "Album", id: album.id }];
        },
        query: (album) => {
          //album that we want to delete
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
} = albumsApi;
export { albumsApi };
