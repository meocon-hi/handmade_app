import { createSlice } from "@reduxjs/toolkit";
import { incrementQuantity } from "./CartReducer";
export const productSlide = createSlice({
        name:"product",
        initialState:{
            product:[],
        },
        reducers:{
            getProducts:(state,action)=>{
                state.product.push({...action.payload});
            }, 
            incrementQty:(state,action)=>{
                const itemPresent = state.product.find((item)=>item.id===action.payload.id);
                itemPresent.quantity++;
            },
            decrementQty:(state,action) =>{
                const itemPresent = state.product.find((item)=>item.id===action.payload.id);
                if(itemPresent.quantity==1) {
                    itemPresent.quantity = 0;
                    const removeItem = state.product.filter((item)=> item.id !== action.payload.id);
                    state.cart = removeItem;
                }else{
                    itemPresent.quantity--;
                }
            }
        }

});
export const {getProducts,incrementQty,decrementQty}= productSlide.actions;
export default productSlide.reducer;