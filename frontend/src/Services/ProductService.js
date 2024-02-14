import http from "./baseURL";
import authHeader from './AuthHeader'; 

    // get all product
 
    const getProduct = async (token) => { // Pass the token as a parameter
        // localhost:8080/api/category/
        const response = await httpRequest.get("/product/", { headers: authHeader(token) }); // Include the authorization header
        return response.data;
    }

    const getProductById = async(id,token) =>{
        const response = await httpRequest.get(`/product/${id}`, { headers: authHeader(token) }); // Include the authorization header
        return response.data;
    }

    // find product by name
    const findByProductName=async(productName,token)=> {
        const response = await httpRequest.get(`/product/${productName}`, { headers: authHeader(token) }); 
         return response.data;
    }

    // create new product
    const createProduct= async (product, token) =>{
        const response = await httpRequest.post("/product/", product, { headers: authHeader(token) }); 
        return response.data;
    }

    // delete product by id
    const deleteProduct=async(id,token)=> {
        const response = await httpRequest.delete(`/product/${id}`, { headers: authHeader(token) }); 
        return response.data;
    }

    // update the data
     const updateProduct=async(id,token)=> {
        const response = await httpRequest.put(`/product/${id}`, { headers: authHeader(token) }); 
        return response.data;
    }

    const productService = {
    createProduct,
    getProduct,
    getProductById,
    findByProductName,
    deleteProduct,
    updateProduct
}

export default productService;
