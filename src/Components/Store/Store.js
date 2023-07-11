import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../Auth/LoginSlice'
// import AuthReducer  from './Components/Auth/LoginSlice.js'

const store =configureStore({
    reducer:{auth:AuthReducer}
})

export {store}