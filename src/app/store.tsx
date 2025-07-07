// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { stackApi } from '../services/stackApi';

export const store = configureStore({
  reducer: {
    [stackApi.reducerPath]: stackApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stackApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
