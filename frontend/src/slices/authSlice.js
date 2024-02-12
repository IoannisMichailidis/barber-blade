import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null, // get userInfo from the local storage
    token: localStorage.getItem('token') || null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload)); // store the userInfo into local storage
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.clear();
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        removeToken: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    }
})

export const { setCredentials, logout, setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;