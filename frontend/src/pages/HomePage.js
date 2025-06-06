import React from 'react';
import ScheduleList from '../components/ScheduleList';
import { useQuery } from '@tanstack/react-query';
import { fetchSchedules } from '../api/scheduleApi'; // APIからスケジュールを取得する関数をインポート
import Calendar from '../components/Calendar';
const HomePage = () => {
    const {data:schedules,isLoading,error}=useQuery({
        queryKey:['schedules'],
        queryFn:fetchSchedules,
    });
    console.log("🔥 JSX変更が反映されまし!");

    
    if (isLoading) return <p>Loading...</p>
    if(error) return <p>エラーが発生しました。:{error.message}</p>
    return (
        <div>
            <Calendar schedules={schedules}/>
            <ScheduleList schedules={schedules} />
            
        </div>
    );
};

export default HomePage;
