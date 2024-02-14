import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import categoryService from '../Services/CategoryService'
import { toast } from 'react-toastify'
import authHeader from '../Services/AuthHeader'; // Import the authHeader function

// for initial state as null
const initialState = {
    categories: [],
    category: '',
    image: '',
    error: false,
    loading: false,
}

// generation of action to create category
export const categoryCreate = createAsyncThunk('category/categoryCreate', async (category, thunkAPI) => {
    try {
        // Get the authorization header using the authHeader function
        const headers = authHeader();
        console.log(headers)
        // Call the service function with the authorization header
        const response = await categoryService.categoryCreate(category, headers);
        console.log(response.data)
        // Return response data
        return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

// generation of action to get category
export const getCategories = createAsyncThunk('category/getCategories', async (_, thunkAPI) => {
    try {
        // Get the authorization header using the authHeader function
        const headers = authHeader();

        // Call the service function with the authorization header
        const response = await categoryService.getCategories(headers);

        // Return response data
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

// creating redux slice with initial state, reducers and extra reducers
export const categorySlice = createSlice({
    name: 'category', // slice name
    initialState,
    reducers: { // to update state based on action
        handleChange: (state, { payload: { name, value } }) => { // updates state based on payload
            state[name] = value
        },
        clearValues: () => { // return initial state
            return {
                ...initialState,
            }
        }
    },
    // handles actions dispatched by async thunks.
    extraReducers: (builder) => {
        builder
            .addCase(categoryCreate.pending, (state) => {
                state.loading = true
            })
            .addCase(categoryCreate.fulfilled, (state, action) => {
                state.loading = false
                toast.success('category added')
            })
            .addCase(categoryCreate.rejected, (state, action) => {
                state.loading = false
                state.error = true
                toast.error('category error')
            })
            .addCase(getCategories.pending, (state) => {
                state.loading = true
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false
                state.categories = action.payload
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false
                state.error = true
            })
    }
})

export const { handleChange, clearValues } = categorySlice.actions;
export default categorySlice.reducer
