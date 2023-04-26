import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  dueDate: '',
};

const dueDateSlice = createSlice({
  name: 'dueDate',
  initialState,
  reducers: {
    setdueDate: (state, action) => {
      state.dueDate = action.payload;
    },
  },
});

export const {setdueDate} = dueDateSlice.actions;
export default dueDateSlice.reducer;
