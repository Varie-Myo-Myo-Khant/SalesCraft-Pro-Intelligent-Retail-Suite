import httpRequest from './baseURL'
import authHeader from './AuthHeader'; // Import the function to generate the authorization header

const categoryCreate = async (category, token) => { // Pass the token as a parameter
    // localhost:8080/api/category/  
    const response = await httpRequest.post("/category/", category, { headers: authHeader(token) }); // Include the authorization header
    return response.data;
}
 
const getCategories = async (token) => {
    // localhost:8080/api/category/ 
    const response = await httpRequest.get("/category/", { headers: authHeader(token) }); // Include the authorization header
    return response.data;
}

// delete category by id
    const deleteCategory=async(category,token)=> {
        const response = await httpRequest.delete(`/category/${category.id}`,{ headers: authHeader(token) }); 
        return response.data;
    }

    // update the data
     const updateCategory=async(categoryId,category,token)=> {
        const response = await httpRequest.put(`/category/${categoryId}`,category, { headers: authHeader(token) }); 
        return response.data;
    }

    // find category by name
    const findByCategoryName=async(category,token)=> {
        const response = await httpRequest.get(`/category/search?category=${category}`,{ headers: authHeader(token) }); 
         return response.data;
    }

const categoryService = {
    categoryCreate,
    getCategories,
    deleteCategory,
    updateCategory,
    findByCategoryName
}

export default categoryService;
