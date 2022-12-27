import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");
  //dev only
  await pause(1000);

  return response.data;
});
//DEV ONLY
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
export { fetchUsers };
//fetchUsers will have three variable automatically,
//fetchUsers:{pending,fulfilled,rejected}
//fetchUsers.pending===users/fetch/pending
//fetchUsers.fulfilled===users/fetch/fulfilled
//fetchUsers.rejected===users/fetch/rejected
