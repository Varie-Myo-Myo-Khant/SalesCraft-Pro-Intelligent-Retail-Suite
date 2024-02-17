import httpRequest from "./baseURL";
import authHeader from './AuthHeader'; 
import { deleteLocalStorageCart } from '../Services/localStorage'
import { clearCart } from '../Slice/cartSlice'

    // get all product 
    const getProduct = async (token) => { // Pass the token as a parameter
        // localhost:8080/api/category/
        const response = await httpRequest.get("/product/", { headers: authHeader(token) }); // Include the authorization header
        return response.data;
    }
    // get all product  by id
    const getProductById = async(id,token) =>{
        const response = await httpRequest.get(`/product/${id}`, { headers: authHeader(token) }); // Include the authorization header
        return response.data;
    }

    // find product by name
    const findByProductName=async(productName,token)=> {
        const response = await httpRequest.get(`/product/search?productName=${productName}`, { headers: authHeader(token) }); 
         return response.data;
    }

    // create new product
    const createProduct= async (product, token) =>{
        const response = await httpRequest.post("/product/", product, { headers: authHeader(token) }); 
        return response.data;
    }

    // delete product by id
    const deleteProduct=async(product,token,thunkAPI)=> {
        const response = await httpRequest.delete(`/product/${product.id}`,{ headers: authHeader(token) }); 
        //also remove from local storage and cart when the product is deleted.
        deleteLocalStorageCart()
        thunkAPI.dispatch(clearCart())
        return response.data;
    }

    // update the data
     const updateProduct=async(product,token)=> {
        const response = await httpRequest.put(`/product/${product.id}`,product, { headers: authHeader(token) }); 
        return response.data;
    }

    //filter product by category
    const categoryProductFilter=async(category,token)=>{ 
        const response= await httpRequest.get(`/product/category/${category}`, { headers: authHeader(token) })
        return response.data
    }

    const productService = {
    createProduct,
    getProduct,
    getProductById,
    findByProductName,
    deleteProduct,
    updateProduct,
    categoryProductFilter
}

export default productService;
