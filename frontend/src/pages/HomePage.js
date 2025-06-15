import React from 'react';
import ScheduleList from '../components/ScheduleList';
import { useQuery } from '@tanstack/react-query';
import { fetchSchedules } from '../api/scheduleApi'; // APIからスケジュールを取得する関数をインポート
import Calendar from '../components/Calendar';
import {useNavigate} from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate();

    const {data:schedules,isLoading,error,refetch}=useQuery({
        queryKey:['schedules'],
        queryFn:fetchSchedules,
        onError:(err)=>{
            console.error("スケジュールの取得エラー:",err);
            if(err.response&&err.response.status === 401){
                alert("セッションの有効期限が切れました。再度ログインしてください");
                localStorage.removeItem("access_token");
                navigate("/login");
            }
        }
    });
    console.log("🔥 JSX変更が反映されまし!");

    
    if (isLoading) return <p>Loading...</p>
    if(error) return <p>スケジュールの表示中にエラーが発生しました。:{error.message}</p>
    return (
        <div>
            <Calendar schedules={schedules}/>
            <ScheduleList schedules={schedules} refetchSchedules={refetch} />
            
        </div>
    );
};

export default HomePage;
