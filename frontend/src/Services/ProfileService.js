import httpRequest from './baseURL'
import authHeader from './AuthHeader'; // Import the function to generate the authorization header


     const updateProfile=async(userId,user,token)=> {
        const response = await httpRequest.put(`/user/${userId}`,user, { headers: authHeader(token) }); 
        return response.data;
    }

    // find category by name
    const getCurrentUserProfile=async(userId,token)=> {
         console.log("service",userId)
        const response = await httpRequest.get(`/user/${userId}`,{ headers: authHeader(token) }); 
         return response.data;
    }

const profileService = {
    updateProfile,
    getCurrentUserProfile
}

export default profileService;
