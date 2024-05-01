import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper";
export const STATUS=Object.freeze({
    IDLE:"idle",
    LOADING:"loading"
})
export const profile=createAsyncThunk("/user/profile-details",async()=>{
    let response=await axiosInstance.get("/user/profile-details");
    return response.data.data
})

const homeSlice=createSlice({
    name:"home",
    initialState:{
        data:[],
        status:STATUS.IDLE

    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(profile.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(profile.fulfilled,(state,{payload})=>{
            state.status=STATUS.IDLE;
            state.data=payload
        })
        .addCase(profile.rejected,(state)=>{
            state.status=STATUS.IDLE
        })


    }
})

export default homeSlice.reducer