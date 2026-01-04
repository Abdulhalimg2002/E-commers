import { createSlice } from "@reduxjs/toolkit";

interface cartD{
     isOpenD:boolean
    

}
const initialState:cartD={
    isOpenD:false,
     

}
const globalS=createSlice({
   name:"global",
   initialState,
   reducers:{
  
    openCart: (state) => {
      state.isOpenD = true;
    },
    closeCart: (state) => {
      state.isOpenD = false;
    },
   
   }
})
export const {closeCart,openCart}=globalS.actions

export default globalS.reducer