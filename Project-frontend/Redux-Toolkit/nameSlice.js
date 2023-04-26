import { createSlice } from "@reduxjs/toolkit";

const initialState={
name:''
};

const nameSlice=createSlice({

    name:'name',
    initialState,
    reducers:{
     setNameRedux:(state,action)=>{
        state.name=action.payload;
     },
    },
 
});

export  const {setNameRedux}=nameSlice.actions;
export default nameSlice.reducer;





