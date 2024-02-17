import { configureStore } from '@reduxjs/toolkit'; 
import categoryReducer from './categorySlice';
import authReducer from './authSlice';  
import productReducer from './productSlice';
import cartReducer from './cartSlice'
import orderReducer from './orderSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer
  },
});


