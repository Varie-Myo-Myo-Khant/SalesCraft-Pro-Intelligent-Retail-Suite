import { configureStore } from '@reduxjs/toolkit'; 
import categoryReducer from './categorySlice';
import authReducer from './authSlice';  
import productReducer from './productSlice';
import cartReducer from './cartSlice'
import orderReducer from './orderSlice'
import customerReducer from './customerSlice';
import sessionReducer from './sessionSlice';
import profileReducer from './profileSlice';
import analysisReducer from './analysisSlice'
export const store = configureStore({
  reducer: {
    auth:authReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    customer:customerReducer,
    session:sessionReducer,
    profile:profileReducer,
    analysis:analysisReducer,
  },
});


