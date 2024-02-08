// Manipulate global frond-end state

import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('booking') ? JSON.parse(localStorage.getItem('booking')) : {barber: {}, dateTime: {}, custInfo: {}};  // I use localstorage to make sure that the state is kept intact when the user comes back after leaves the website

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        saveBarber: (state, action) => {
            state.barber = action.payload;
            localStorage.setItem('booking', JSON.stringify({...state, barber: action.payload}));
        },
        saveDateTime: (state, action) => {
            state.dateTime = action.payload;
            localStorage.setItem('booking', JSON.stringify({...state, dateTime: action.payload}));
        },
        saveCustInfo: (state, action) => {
            state.custInfo = action.payload;
            localStorage.setItem('booking', JSON.stringify({...state, custInfo: action.payload}));
        },
        resetBooking: (state) => initialState
    }
})

// Export Actions
export const {
    saveBarber,
    saveDateTime,
    saveCustInfo,
    resetBooking
} = bookingSlice.actions;

export default bookingSlice.reducer;