import axiosInstance from "./axiosConfig";

export const registerUser = async(userData) =>{
    try{
        const response = await axiosInstance.post("/register",userData);
        return response.data;

    }catch(error){
        throw error;
    }
}

export const loginUser = async(credentials)=>{
    try{
        const response = await axiosInstance.post("/login",credentials);
        return response.data;
    }catch(error){
        throw error;
    }
}