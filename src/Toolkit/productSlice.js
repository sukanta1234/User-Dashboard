import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper";
import { toast } from "react-toastify";
export const STATUS=Object.freeze({
    IDLE:"idle",
    LOADING:"loading"
})
export const createApi=createAsyncThunk("/product/create",async(data)=>{
    let response=await axiosInstance.post("/product/create",data);
    return response.data
})
export const productApi=createAsyncThunk("/product/list",async()=>{
    let response=await axiosInstance.post("/product/list");
    // console.log(response.data.data,"product APi");
    return response.data.data
})
export const deleteApi=createAsyncThunk("/api/product/remove",async(id)=>{
    let response=await  axiosInstance.post(`/product/remove`,id)
    return response.data
})
export const updateApi=createAsyncThunk("/product/update",async(data)=>{
    let response=await axiosInstance.post("/product/update",data)
    return response.data
})
export const detailsApi=createAsyncThunk("/product/detail",async(id)=>{
    let response=await axiosInstance.get(`/product/detail/${id}`)
    return response.data.data
})
const productSlice=createSlice({
    name:"product",
    initialState:{
        pdata:[],
        sdata:[],
        status:STATUS.IDLE

    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(createApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(createApi.fulfilled,(state,{payload})=>{
            state.status=STATUS.IDLE;
            if (payload.status===200) {
                toast.success(payload.message)
                
            }
            if (payload.status===201) {
                toast.error(payload.message)
                
            }
        })
        .addCase(createApi.rejected,(state)=>{
            state.status=STATUS.IDLE
        })
        .addCase(productApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(productApi.fulfilled,(state,{payload})=>{
            state.status=STATUS.IDLE;
           state.pdata=payload
        })
        .addCase(productApi.rejected,(state)=>{
            state.status=STATUS.IDLE
        })
        
        .addCase(deleteApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(deleteApi.fulfilled,(state,{payload})=>{
            state.status=STATUS.IDLE;
            if (payload.status===200) {
                toast.success(payload.message)
                
            }
            if (payload.status===201) {
                toast.error(payload.message)
                
            }
        })
        .addCase(deleteApi.rejected,(state)=>{
            state.status=STATUS.IDLE
        })


        .addCase(updateApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(updateApi.fulfilled,(state,{payload})=>{
            state.status=STATUS.IDLE;
            if (payload.status===200) {
                toast.success(payload.message)
                
            }
            if (payload.status===201) {
                toast.error(payload.message)
                
            }
        })
        .addCase(updateApi.rejected,(state)=>{
            state.status=STATUS.IDLE
        })


        .addCase(detailsApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(detailsApi.fulfilled,(state,{payload})=>{
            state.status=STATUS.IDLE;
            state.sdata=payload
        })
        .addCase(detailsApi.rejected,(state)=>{
            state.status=STATUS.IDLE
        })

    }
})

export default productSlice.reducer