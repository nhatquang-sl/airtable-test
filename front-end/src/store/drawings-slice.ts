import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { apiService } from './constants';
import { DrawingDto } from 'shared/models';

type DrawingsState = {
  getDrawingsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  records: DrawingDto[];
};

const initialState: DrawingsState = { getDrawingsStatus: 'idle', records: [] };

export const getDrawings = createAsyncThunk(`airtable/drawings`, async () => {
  try {
    const response = await apiService.get(`airtable/drawings`);
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
      .addCase(getDrawings.fulfilled, (state, action) => {
        state.getDrawingsStatus = 'succeeded';
        state.records = action.payload;
      })
      .addCase(getDrawings.pending, (state, action) => {
        state.getDrawingsStatus = 'loading';
      })
      .addCase(getDrawings.rejected, (state, action) => {
        state.getDrawingsStatus = 'failed';
      });
  },
});

export const {} = modelsSlice.actions;

export default modelsSlice.reducer;
