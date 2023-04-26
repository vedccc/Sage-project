import { configureStore } from '@reduxjs/toolkit';
import mobileNumberReducer from '../Redux-Toolkit/mobileNumber';
import nameSliceReducer from '../Redux-Toolkit/nameSlice';
import idSliceReducer from './userId';
import dueDateSliceReducer from './dueDate';

const store = configureStore({
  reducer: {
    mobileNumber: mobileNumberReducer,
    name:nameSliceReducer,
    user_id:idSliceReducer,
    dueDate:dueDateSliceReducer,
  },
});

export default store;