import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  name: 'theme slice',
};
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
});

export default themeSlice.reducer;
