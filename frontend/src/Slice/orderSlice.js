import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import OrderService from "../Services/OrderService"
import { toast } from 'react-toastify'
import { updateProductStockQuantity } from "./productSlice";

const initialState = {
    orders: [],
    error: false,
    loading: false,
}

export const orderCreate = createAsyncThunk('order/orderCreate', async (order, thunkAPI) => {
    try {
       const createdOrder = await OrderService.createOrder(order);
       // Iterate through the cart items and update the stock quantity for each product
       console.log("Cartitem",order.cartItems)
       order.cartItems.forEach(cartItem => {
            console.log("Cartitem",cartItem.id,cartItem.stockQuantity,cartItem.quantity)
           thunkAPI.dispatch(updateProductStockQuantity({ productId: cartItem.id, newStockQuantity: cartItem.stockQuantity - cartItem.quantity }));
       });
       return createdOrder;
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
});

export const getOrders = createAsyncThunk('order/getOrders', async (_, thunkAPI) => {
    try {
       return await OrderService.getOrder()
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
});

export const removeOrder = createAsyncThunk('order/removeOrder', async (order, thunkAPI) => {
    try {
          
        return await OrderService.deleteOrder(order, thunkAPI)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
});

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(orderCreate.pending, (state) => {
            state.loading = true
        })
        .addCase(orderCreate.fulfilled, (state, action) => {
            state.loading = false
            toast.success('Successfully Created New Order!')
        })
        .addCase(orderCreate.rejected, (state, action) => {
            state.loading = false
            state.error = true
            toast.error('Fail! Please try again later!')
        })
        .addCase(getOrders.pending, (state) => {
            state.loading = true
        })
        .addCase(getOrders.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload
        })
        .addCase(getOrders.rejected, (state, action) => {
            state.loading = false
            state.error = true
        })  
        .addCase(removeOrder.pending, (state) => {
            state.loading = true
        })
        .addCase(removeOrder.fulfilled, (state, action) => {
            state.loading = false
            toast.success('Successfully Deleted The Order!')
        })
        .addCase(removeOrder.rejected, (state, action) => {
            state.loading = false
            state.error = true
            toast.error('Fail! Please try again later!')
        }) 
    }
});

export default orderSlice.reducer;
