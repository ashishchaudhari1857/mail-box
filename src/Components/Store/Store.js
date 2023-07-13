import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../Auth/LoginSlice'
import MailReducer from '../Pages/SentBoxAndInbox/MailManageSlice'

const store =configureStore({
    reducer:{auth:AuthReducer ,mail:MailReducer}
})

export {store}