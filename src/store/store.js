import { configureStore } from "@reduxjs/toolkit";
import recordsSlice from "./recordsSlice"

export const store = configureStore({
    reducer : {
        records : recordsSlice,
    }
})
