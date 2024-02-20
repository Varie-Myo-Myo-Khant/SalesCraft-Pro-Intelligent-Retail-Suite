import httpRequest from './baseURL'
import authHeader from './AuthHeader'; 

const customerCreate = async (customer, token) => {
    // localhost:8080/api/customer/  
    const response = await httpRequest.post("/customer/", customer, { headers: authHeader(token) });
    return response.data;
}
 
const getCustomers = async (token) => {

    const response = await httpRequest.get("/customer/", { headers: authHeader(token) });
    return response.data;
}

// delete customer by id
    const deleteCustomer=async(customer,token)=> {
        const response = await httpRequest.delete(`/customer/${customer.id}`,{ headers: authHeader(token) }); 
        return response.data;
    }

    // update the data
     const updateCustomer=async(customer,token)=> {
        const response = await httpRequest.put(`/customer/${customer.id}`,customer, { headers: authHeader(token) }); 
        return response.data;
    }

   

const customerService = {
    getCustomers,
    deleteCustomer,
    updateCustomer,
    customerCreate
    
}

export default customerService;
