import { initialState } from "@/components/_model/admin/adminState.init";
import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = adminSlice.actions;

export default adminSlice.reducer;
