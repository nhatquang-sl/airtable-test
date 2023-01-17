import { configureStore } from '@reduxjs/toolkit';
import settingsSlice from './settings-slice';
import modelsSlice from './models-slice';
import drawingsSlice from './drawings-slice';
import servicesSlice from './services-slice';

const store = configureStore({
  reducer: {
    settings: settingsSlice,
    models: modelsSlice,
    drawings: drawingsSlice,
    services: servicesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
