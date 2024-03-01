import httpRequest from './baseURL'
import authHeader from './AuthHeader'; // Import the function to generate the authorization header


   
    const getPromotionAnalysisData = async (token) => {
    // localhost:8080/api/report/promotion
    const response = await httpRequest.get("/report/promotion", { headers: authHeader(token) }); // Include the authorization header
    return response.data;
}

const analysisService = {
    getPromotionAnalysisData
}

export default analysisService;