import type { IProduct } from "../interface";

export const additeamS=(iteam:IProduct[],product:IProduct)=>{
    const exist=iteam.find(iteam=>iteam.id===product.id);
    if(exist){
         

        return iteam.map(i=>i.id===product.id?{...i,qty:(i.qty??0)+1}:i);

    }
        
    return[...iteam,{...product,qty:1}]

}