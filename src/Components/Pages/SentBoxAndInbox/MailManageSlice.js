import { createSlice, isAction } from "@reduxjs/toolkit";
import Sent from "./SentBox";

const MailManageSlice=createSlice({
    name:"mailbox",
    initialState:{
        Sent:[],
        Recieved:[],
        Inboxtotol:0,
    },
    reducers:{
        sentbox:(state,action)=>{
            state.Sent=[...action.payload]
            console.log(state.Sent)
        },
        inbox:(state,action)=>{
            state.Recieved=[...action.payload]
            console.log(state.Recieved)
            const filterinbox= state.Recieved.filter((item)=>item.read!==true);
            state.Inboxtotol=filterinbox.length;
        }
           
        }

})


export const  Mailactions = MailManageSlice.actions;
export default MailManageSlice.reducer;