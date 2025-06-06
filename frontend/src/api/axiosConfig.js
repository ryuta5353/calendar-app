import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
    baseURL:API_BASE_URL,
    headers:{
    'Content-Type': "application/json",
    'Accept':'application/json',
    },
});

//各リクエストがサーバに送信される前に実行される
axiosInstance.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem("access_token");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },(error)=>{
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response && error.response.status === 401){
            console.error("認証エラー:トークンが無効または期限切れ");
            localStorage.removeItem("access_token");
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;

