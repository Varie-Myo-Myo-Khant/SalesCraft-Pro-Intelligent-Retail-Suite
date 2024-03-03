import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import productService from "../Services/ProductService";
import { toast } from 'react-toastify'

const initialState = {
    products: [],
    filterProduct: [],
    productName: '',
    productImage: '',
    productPrice: '',
    stockQuantity: '',
    category: '',
    userId:'', 
    error: false,
    loading: false,
    isEditing: false,
    editProductId: '',
}


//To create new product
export const productCreate = createAsyncThunk('product/productCreate', async (product, thunkAPI) => {
    try {
      
       return await productService.createProduct(product)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})

//To retrieve all product
export const getProducts = createAsyncThunk('product/getProducts', async (_, thunkAPI) => {
    try { 
       return await productService.getProduct()
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})

//to edit products
export const editProduct = createAsyncThunk('product/editProduct', async ({editProductId,product}, thunkAPI) => {
    try {
   
       return await productService.updateProduct(editProductId,product)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})

//to filter product with category
export const categoryProductFilter = createAsyncThunk('product/categoryProductFilter', async (category, thunkAPI) => {
    try {
       
       return await productService.categoryProductFilter(category)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})
//to filter product with name
export const searchByProductName = createAsyncThunk('product/searchByProductName', async (productName, thunkAPI) => {
    try { 
       return await productService.findByProductName(productName)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})

//to delete product
export const removeProduct = createAsyncThunk('product/removeProduct', async (product, thunkAPI) => {
    try {
       
        return await productService.deleteProduct(product, thunkAPI)
    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data)
    }
})


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
     handleChange: (state, { payload: { name, value } }) => {
        state[name] = value
        },
        setEditProduct: (state, action) => {
            return {...state, isEditing :true, ...action.payload}
        },
        clearValues: () => {
            return {
                ...initialState,
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(productCreate.pending, (state) => {
            state.loading = true
        })
        .addCase(productCreate.fulfilled, (state, action) => {
            state.loading = false
            toast.success('Successfully Added New Product!')
        })
        .addCase(productCreate.rejected, (state, action) => {
            state.loading = false
            state.error = true
            toast.error('Fail! Please try again later!')
        })
        .addCase(getProducts.pending, (state) => {
            state.loading = true
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.loading = false
            state.error = true
        })
        .addCase(editProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(editProduct.fulfilled, (state, action) => { 
            state.loading = false;
            // const updatedProduct = action.payload;
            // // Update the product in the state
            // state.products = state.products.map(product =>
            //     product.id === updatedProduct.id ? updatedProduct : product
            // );
            toast.success('Product stock quantity updated successfully!');
        })
        .addCase(editProduct.rejected, (state, action) => {
            state.loading = false
            state.error = true
            toast.error('Fail! Please try again later!')
        }) 
        .addCase(categoryProductFilter.pending, (state) => {
            state.loading = true
        })
        .addCase(categoryProductFilter.fulfilled, (state, action) => {
            state.loading = false
            state.filterProduct = action.payload
        })
        .addCase(categoryProductFilter.rejected, (state, action) => {
            state.loading = false
            state.error = true
        }) 
         .addCase(searchByProductName.pending, (state) => {
            state.loading = true
        })
        .addCase(searchByProductName.fulfilled, (state, action) => {
            state.loading = false
            state.filterProduct = action.payload
        })
        .addCase(searchByProductName.rejected, (state, action) => {
            state.loading = false
            state.error = true
        }) 
        .addCase(removeProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(removeProduct.fulfilled, (state, action) => {
            state.loading = false
            // update products state
            let removeProduct = state.products.filter(item => item.id !== action.payload.id)
            state.products = removeProduct
            toast.success('Sucessfully Deleted the Product!')
            
        })
        .addCase(removeProduct.rejected, (state, action) => {
            state.loading = false
            state.error = true
            toast.error('Fail! Please try again later!')
        }) 
        // .addCase(updateProductStockQuantity.pending, (state) => {
        //     state.loading = true
        // })
        // .addCase(updateProductStockQuantity.fulfilled, (state, action) => {
        //     state.loading = false;
        //     const updatedProduct = action.payload;
        //     // Update the product in the state
        //     state.products = state.products.map(product =>
        //         product.id === updatedProduct.id ? updatedProduct : product
        //     );
        //     toast.success('Product stock quantity updated successfully!');
            
        // })
        // .addCase(updateProductStockQuantity.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = true;
        //     toast.error('Failed to update product stock quantity. Please try again later.');
        // }) 
    }
})

export const { handleChange, setEditProduct, clearValues } = productSlice.actions;
export default productSlice.reducer