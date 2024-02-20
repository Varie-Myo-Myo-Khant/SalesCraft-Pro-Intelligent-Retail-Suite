import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "../Services/CustomerService";
import { toast } from "react-toastify"; 


const initialState = {
    customers: [], // Ensure categories array is initialized
    customer: '', 
    phoneNumber:'',
    loyaltyPoint:0,
    userId:'',
    error: false,
    loading: false,
    isEditing: false,
    editCustomerId:'',
};

export const customerCreate = createAsyncThunk('customer/customerCreate', async (customer, thunkAPI) => {
    try {
        const response = await customerService.customerCreate(customer);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getCustomers = createAsyncThunk('customer/getCustomers', async (_, thunkAPI) => {
    try {
        const response = await customerService.getCustomers();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateCustomer = createAsyncThunk('customer/updateCustomer', async (customer, thunkAPI) => {
    try {
       return await customerService.updateCustomer(customer)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})

//to delete
export const removeCustomer = createAsyncThunk('customer/removeCustomer', async (customer, thunkAPI) => {
    try {
       
        return await customerService.deleteCustomer(customer, thunkAPI)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})


export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        handleChange: (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        setEditCustomer: (state, action) => {
            return {...state, isEditing :true, ...action.payload}
        },
        clearValues: () => {
            return { ...initialState };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(customerCreate.pending, (state) => {
                state.loading = true;
            })
            .addCase(customerCreate.fulfilled, (state, action) => {
                state.loading = false;
                toast.success('Successfully Added New Customer!')
            })
            .addCase(customerCreate.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                toast.error('Fail! Please try again later!')
            })
            .addCase(getCustomers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.loading = false; 
                state.customers = action.payload; 
            })
            .addCase(getCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(updateCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.loading = false;
                toast.success('Updated the Customer!')
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                toast.error('Fail! Please try again later!')
            })
            .addCase(removeCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeCustomer.fulfilled, (state, action) => {
                state.loading = false;
                let removeCustomer = state.customers.filter(item => item.id !== action.payload.id)
                state.customers = removeCustomer
                toast.success('Successfully Deleted the Customers!')
            })
            .addCase(removeCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                toast.error('Fail! Please try again later!')
            })
    }
});

export const { handleChange,setEditCustomer, clearValues } = customerSlice.actions;
export default customerSlice.reducer;
