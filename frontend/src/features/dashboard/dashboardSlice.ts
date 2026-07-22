import {
createSlice,
createAsyncThunk
} from "@reduxjs/toolkit";

import {DashboardState} from "./dashboardTypes";

import {getDashboardAPI} from "./dashboardAPI";

const initialState:DashboardState={

    dashboard:null,

    loading:false,

    error:null

};

export const getDashboard=createAsyncThunk(

"dashboard/get",

async(_,{rejectWithValue})=>{

try{

return await getDashboardAPI();

}

catch(error:any){

return rejectWithValue(
error.response.data.message
)

}

}

);

const dashboardSlice=createSlice({

name:"dashboard",

initialState,

reducers:{},

extraReducers:(builder)=>{

builder

.addCase(getDashboard.pending,(state)=>{

state.loading=true;

})

.addCase(getDashboard.fulfilled,(state,action)=>{

state.loading=false;

state.dashboard=action.payload.data;

})

.addCase(getDashboard.rejected,(state,action:any)=>{

state.loading=false;

state.error=action.payload;

})

}

});

export default dashboardSlice.reducer;