import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addUser = createAsyncThunk("users/add", async () => {
  //the first parameter is the URL,
  //the 2nd parameter is the request body,
  // and the 3rd parameter is the options
  const response = await axios.post(
    "http://localhost:3005/users",
    {
      name: faker.name.fullName(),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});
export { addUser };
