import React,{useState} from 'react';
import "./AddSchedulePage.css"
import { createSchedule } from '../api/scheduleApi';

const AddSchedulePage =({onSuccess,onClose})=>{
    const [title,setTitle] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');



    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const newSchedule =await createSchedule({
                title:title,
                start_datetime:startDateTime,
                end_datetime:endDateTime
            });
            if(onSuccess){
                onSuccess(newSchedule);
            }

            setTitle("");
            setStartDateTime("");
            setEndDateTime("");

            if(onClose){
                onClose();
            }

        }catch(error){
            console.error("error",error.message);
        }
    }

    return (
        <div className="add-schedule-form">
            <h2>スケジュール追加</h2>
            
            <form onSubmit={handleSubmit}>
                
                <div className="form-group">
                    <label>タイトル:</label>
                        <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" required/>
                </div>
                
                <div className="form-group">
                    <label>開始日付:</label>
                        <input type="datetime-local" value={startDateTime} onChange={(e)=>setStartDateTime(e.target.value)} required/>
                </div>
                
                <div className="form-group">
                    <label>終了日付:</label>
                        <input type="datetime-local" value={endDateTime} onChange={(e)=>setEndDateTime(e.target.value)}/>
                </div>
                
                <div className="form-actions">
                    <button type="submit" className="submit-button">
                        追加
                    </button>
                    {onClose &&(
                        <button type="button" className="cancel-button" onClick={onClose}>キャンセル</button>
                    )}
                </div>
            </form>
        </div>
        
    );
};

export default AddSchedulePage;