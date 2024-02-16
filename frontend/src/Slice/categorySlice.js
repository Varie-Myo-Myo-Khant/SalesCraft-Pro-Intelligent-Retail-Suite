import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from '../Services/CategoryService'; 
import { toast } from "react-toastify"; 


const initialState = {
    categories: [], // Ensure categories array is initialized
    filterCategory:[],
    category: '',
    categoryImage: '',
    userId:'',
    error: false,
    loading: false,
    isEditing: false,
    editCategoryId:'',
};

export const categoryCreate = createAsyncThunk('category/categoryCreate', async (category, thunkAPI) => {
    try {
        const response = await categoryService.categoryCreate(category);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getCategories = createAsyncThunk('category/getCategories', async (_, thunkAPI) => {
    try {
        const response = await categoryService.getCategories();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const editCategory = createAsyncThunk('category/editCategory', async (category, thunkAPI) => {
    try {
       return await categoryService.updateCategory(category)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})

//to delete
export const removeCategory = createAsyncThunk('category/removeCategory', async (category, thunkAPI) => {
    try {
       
        return await categoryService.deleteCategory(category, thunkAPI)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})

//to filter category with name
export const searchByCategoryName = createAsyncThunk('product/searchByCategoryName', async (category, thunkAPI) => {
    try { 
       return await categoryService.findByCategoryName(category)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        handleChange: (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        setEditCategory: (state, action) => {
            return {...state, isEditing :true, ...action.payload}
        },
        clearValues: () => {
            return { ...initialState };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(categoryCreate.pending, (state) => {
                state.loading = true;
            })
            .addCase(categoryCreate.fulfilled, (state, action) => {
                state.loading = false;
                toast.success('Successfully Added New Category!')
            })
            .addCase(categoryCreate.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                toast.error('Fail! Please try again later!')
            })
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false; 
                state.categories = action.payload; 
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(editCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                state.loading = false;
                toast.success('Updated the Category!')
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                toast.error('Fail! Please try again later!')
            })
            .addCase(searchByCategoryName.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchByCategoryName.fulfilled, (state, action) => {
                state.loading = false; 
                state.filterCategory = action.payload; 
            })
            .addCase(searchByCategoryName.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(removeCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.loading = false;
                let removeCategory = state.categories.filter(item => item.id !== action.payload.id)
                state.categories = removeCategory
                toast.success('Successfully Deleted the Category!')
            })
            .addCase(removeCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                toast.error('Fail! Please try again later!')
            })
    }
});

export const { handleChange,setEditCategory, clearValues } = categorySlice.actions;
export default categorySlice.reducer;
