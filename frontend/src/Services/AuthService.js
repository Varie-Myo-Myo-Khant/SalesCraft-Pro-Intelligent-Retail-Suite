import httpRequest from './baseURL'

//http://localhost:8080/api/auth/signup

const register = async (user) => {
    const response = await httpRequest.post("/auth/signup", user)
    return response.data
}
//http://localhost:8080/api/auth/signin
const login = async (user) => {
    const response = await httpRequest.post("/auth/signin", user)
    return response.data
}
const logout = async () => {
    const response = await httpRequest.post("/auth/logout")
    return response.data
}
const authService = {
    register,
    login ,
    logout
}
export default authService