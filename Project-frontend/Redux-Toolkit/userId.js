import { createSlice } from "@reduxjs/toolkit";

const initialState={
user_id:'',
task_id:''
};

const idSlice=createSlice({

    name:'user_id',
    initialState,
    reducers:{
     setUserIdRedux:(state,action)=>{
        state.user_id=action.payload;
     },
     setTaskId:(state,action)=>{
        state.task_id=action.payload;
     }
    },
 
});

export  const {setUserIdRedux,setTaskId}=idSlice.actions;
export default idSlice.reducer;





