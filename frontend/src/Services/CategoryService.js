import httpRequest from './baseURL'
import authHeader from './AuthHeader'; // Import the function to generate the authorization header

const categoryCreate = async (category, token) => { // Pass the token as a parameter
    // localhost:8080/api/category/
    const response = await httpRequest.post("/category/", category, { headers: authHeader(token) }); // Include the authorization header
    console.log(response)
    return response.data;
}

const getCategories = async (token) => { // Pass the token as a parameter
    // localhost:8080/api/category/
    const response = await httpRequest.get("/category/", { headers: authHeader(token) }); // Include the authorization header
    return response.data;
}

const categoryService = {
    categoryCreate,
    getCategories
}

export default categoryService;
