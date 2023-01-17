import { configureStore } from '@reduxjs/toolkit';
import settingsSlice from './settings-slice';
import modelsSlice from './models-slice';

const store = configureStore({
  reducer: {
    settings: settingsSlice,
    models: modelsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
