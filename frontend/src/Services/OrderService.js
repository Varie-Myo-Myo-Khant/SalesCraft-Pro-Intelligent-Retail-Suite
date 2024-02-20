import httpRequest from "./baseURL";
import authHeader from './AuthHeader'; 


    // get all order 
    const getOrder = async (token) => { // Pass the token as a parameter
        // localhost:8080/api/order/
        const response = await httpRequest.get("/order/", { headers: authHeader(token) }); // Include the authorization header
        return response.data;
    }

    // create new order
    const createOrder= async (order, token) =>{
        const response = await httpRequest.post("/order/", order, { headers: authHeader(token) }); 
        return response.data;
    }

    // delete product by id
    const deleteOrder=async(order,token)=> {  
        const response = await httpRequest.delete(`/order/${order._id}`,{ headers: authHeader(token) }); 
        return response.data;
    }


    const OrderService = {
    createOrder,
    getOrder,
    deleteOrder
}

export default OrderService;
