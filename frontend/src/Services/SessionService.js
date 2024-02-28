import httpRequest from './baseURL'
import authHeader from './AuthHeader'; 

const sessionCreate = async (session, token) => {
    console.log('fromservice before create',session)
    // localhost:8080/api/session/ 
    const response = await httpRequest.post("/session/", session, { headers: authHeader(token) });
     console.log("service",response.data.id)
    return response.data.id;
}
 
const getSession = async (token) => {

    const response = await httpRequest.get("/session/", { headers: authHeader(token) });
    return response.data;
}

    // update the data
     const updateSession=async(sessionId,session,token)=> {
        console.log(sessionId)
        const response = await httpRequest.put(`/session/${sessionId}`,session, { headers: authHeader(token) }); 
        return response.data;
    }

    //delete the data
     const deleteSession=async(sessionId,token)=> {
        console.log(sessionId)
        const response = await httpRequest.delete(`/session/${sessionId}`, { headers: authHeader(token) }); 
        return response.data;
    }
   

const sessionService = {
    getSession,
    sessionCreate,
    updateSession,
    deleteSession
    
}

export default sessionService;
