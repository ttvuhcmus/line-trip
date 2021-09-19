import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {},
});

// Action
export const authAction = authSlice.actions;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
