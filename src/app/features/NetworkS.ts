import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Network{
     isOnline:boolean
    

}
const initialState:Network={
    isOnline: true
}
const NetworkS=createSlice({
   name:"Network",
   initialState,
   reducers:{
  
    networkM:(state,actionP:PayloadAction<boolean>)=>{
        state.isOnline=actionP.payload
    }
   
   }
})

export const{networkM}=NetworkS.actions;
export default NetworkS.reducer