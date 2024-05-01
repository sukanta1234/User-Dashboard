import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import homeSlice from "./homeSlice";
import productSlice from "./productSlice";

export const store=configureStore({
    reducer:{
        auth:authSlice,
        home:homeSlice,
        product:productSlice
    }
})