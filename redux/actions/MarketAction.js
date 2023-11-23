import { request } from "../config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMarketsActions = createAsyncThunk(
  "application/json",
  async () => {
    try {
      const response = await request.get(`/v1/mkt/markets/`);
      return response;
    } catch (response) {
      return response;
    }
  }
);
