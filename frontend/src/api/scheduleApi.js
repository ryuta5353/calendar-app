export const fetchSchedules = async () => {
    const res = await fetch('http://localhost:8000/api/schedules');

    if (!res.ok) {
        throw new Error('Network response was not ok' + res.statusText);
    }

    return res.json();
};

export const createSchedule = async (newSchedule)=>{
    const res = await fetch('http://localhost:8000/api/schedules',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(newSchedule)
    });

    if(!res.ok){
        throw Error('スケジュールの追加に失敗')
    }
    return res.json();
}

export const deleteSchedule = async(id)=>{
    const res = await fetch(`http://localhost:8000/api/schedules/${id}`,{
        method:'DELETE'
    });
    if(!res.ok){
        throw Error('スケジュール削除に失敗しました');
    }
    return res.json();
}