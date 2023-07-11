import { createSlice } from "@reduxjs/toolkit";


const AuthSlice =createSlice({
    name:"authslice",
    initialState:{
        token:localStorage.getItem("token"),
        isLogged:localStorage.getItem("token")?true:false,
        userid:localStorage.getItem("id")
      
    },
    reducers:{
      login:(state,action)=>{
        const { token ,id}=action.payload;
         localStorage.setItem("token",token)
         localStorage.setItem("ID",id)
         state.token=token;
         state.userid=id;
         state.isLogged=true;
      },
      logout:(state,action)=>{
        localStorage.removeItem("token")
        localStorage.removeItem("ID")
        state.token=null;
        state.userid=null;
        state.isLogged=false;
     }
    }
})



export const Authactions = AuthSlice.actions;
export default AuthSlice.reducer;