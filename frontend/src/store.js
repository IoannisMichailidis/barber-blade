import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authSliceReducer from './slices/authSlice';
import bookingSliceReducer from './slices/bookingSlice';

// Create Store
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        booking: bookingSliceReducer,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;

