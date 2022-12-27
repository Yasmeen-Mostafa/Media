// store a list of users that will change over time as we=>  fetch data, create new users, delete user

import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { deleteUser } from "../thunks/deleteUser";

const userSlice = createSlice({
  name: "users",
  initialState: {
    usersList: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    //watch for all promises cases
    builder.addCase(fetchUsers.pending, (state, action) => {
      //in process of fetching data, loading
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      //data fetched successfully
      //action.payload===whatever we returned from fetchUsers
      state.isLoading = false;
      state.usersList = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      //when a req is failed, an error object is automatically created for us in action.error
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      //action.payload===whatever we returned from fetchUsers
      state.isLoading = false;
      //add new user into our usersList array
      state.usersList.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      //assumption, action.payload===userObj that have name and id
      state.isLoading = false;
      // console.log(action.meta.arg);
      state.usersList = state.usersList.filter(
        (user) => user.id !== action.payload.id
      );
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = userSlice.reducer;
