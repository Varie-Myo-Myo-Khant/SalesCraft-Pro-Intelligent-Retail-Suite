import { configureStore } from '@reduxjs/toolkit'; 
import categoryReducer from './Slice/categorySlice';
import authReducer from './Slice/authSlice';
import userReducer from './Slice/userSlice';
// import productReducer from '../features/product/productSlice'
// import cartReducer from '../features/cart/cartSlice'
// import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    category: categoryReducer,
    user: userReducer
    // product: productReducer,
    // cart: cartReducer,
    // order: orderReducer
  },
});


