import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { apiService } from './constants';
import { ModelDto } from 'shared/models';

type ModelsState = {
  getModelsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  records: ModelDto[];
};

const initialState: ModelsState = { getModelsStatus: 'idle', records: [] };

export const getModels = createAsyncThunk(`airtable/models`, async () => {
  try {
    const response = await apiService.get(`airtable/models`);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) return err.response;
  }
});

export const modelsSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    toggleModel: (state, action: PayloadAction<number[]>) => {
      let records = state.records;
      while (action.payload.length - 1) {
        const i = action.payload.shift() ?? 0;
        records = records[i].children;
      }
      records[action.payload[0]].open = !records[action.payload[0]].open;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getModels.fulfilled, (state, action) => {
        state.getModelsStatus = 'succeeded';
        state.records = action.payload;
      })
      .addCase(getModels.pending, (state, action) => {
        state.getModelsStatus = 'loading';
      })
      .addCase(getModels.rejected, (state, action) => {
        state.getModelsStatus = 'failed';
      });
  },
});

export const { toggleModel } = modelsSlice.actions;

export default modelsSlice.reducer;
