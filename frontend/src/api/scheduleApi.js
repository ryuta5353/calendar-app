import axiosInstance from "./axiosConfig";

export const fetchSchedules = async()=>{
    try{
        const response = await axiosInstance.get("/schedules");
        return response.data;
    }catch(error){
        console.error("スケジュールの取得に失敗しました:",error);
        throw error;
    }
}

export const createSchedule = async(newSchedule)=>{
    try{
        const response = await axiosInstance.post("/schedules",newSchedule);
        return response.data;
    }catch(error){
        console.error("スケジュールの追加に失敗しました:",error);
        throw error;
    }
}

export const deleteSchedule = async(id)=>{
    try{
        const reponse = await axiosInstance.delete(`/schedules/${id}`);
        return reponse.data;
    }catch(error){
        console.error("スケジュール削除に失敗しました",error);
        throw error;
    }
};