import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

import type { IProduct } from "../../../interface";
import { additeamS } from "../../../Utils/funcation";
interface Cartstate{
    iteam:IProduct[]
}
const initialState:Cartstate={
iteam:[]
}
const CartS=createSlice({
   name:"cart",
   initialState,
   reducers:{
    addToCart:(state,actionP:PayloadAction<IProduct>)=>{
        state.iteam=additeamS(state.iteam,actionP.payload)
    },
   
    Removeall:(state)=>{
        state.iteam=[];
    },
    increaseQty: (state, action: PayloadAction<number>) => {
  const item = state.iteam.find(i => i.id === action.payload);
  if (item) {
    item.qty += 1;
  }
},

decreaseQty: (state, action: PayloadAction<number>) => {
  const item = state.iteam.find(i => i.id === action.payload);

  if (!item) return;

  if (item.qty > 1) {
    item.qty -= 1;
  } else {
    state.iteam = state.iteam.filter(i => i.id !== action.payload);
  }
},
   }
})
export const {addToCart,Removeall,increaseQty,decreaseQty}=CartS.actions

export default CartS.reducer