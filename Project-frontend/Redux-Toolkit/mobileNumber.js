import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mobileNumber:'',
};

const mobileNumberSlice=createSlice({

name:'mobileNumber',
initialState,
reducers:{
    setMobileNumber: (state,action)=>{
        state.mobileNumber=action.payload;
    },
},

});

export const { setMobileNumber } = mobileNumberSlice.actions;

export default mobileNumberSlice.reducer;