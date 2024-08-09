import { createAsyncThunk } from "@reduxjs/toolkit";
import { findAllUserApi } from "./user.api";

export const findAllUser: any = createAsyncThunk(
  "user/findAllUser",
  async () => {
    const data: any = await findAllUserApi();
    return data;
  }
);
