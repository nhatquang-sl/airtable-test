import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { apiService } from './constants';
import { ServiceDto } from 'shared/models';

type ServicesState = {
  getServicesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  records: ServiceDto[];
};

const initialState: ServicesState = { getServicesStatus: 'idle', records: [] };

export const getServices = createAsyncThunk(`airtable/services`, async () => {
  try {
    const response = await apiService.get(`airtable/services`);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) return err.response;
  }
});

export const modelsSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getServices.fulfilled, (state, action) => {
        state.getServicesStatus = 'succeeded';
        state.records = action.payload;
      })
      .addCase(getServices.pending, (state, action) => {
        state.getServicesStatus = 'loading';
      })
      .addCase(getServices.rejected, (state, action) => {
        state.getServicesStatus = 'failed';
      });
  },
});

export const {} = modelsSlice.actions;

export default modelsSlice.reducer;
