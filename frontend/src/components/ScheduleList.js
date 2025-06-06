import React,{useState} from 'react';
import "./ScheduleList.css";
import { deleteSchedule } from '../api/scheduleApi';
import { FaTrash } from 'react-icons/fa';
import Modal from './Modal';
import AddSchedulePage from '../pages/AddSchedulePage';

const ScheduleList = ({ schedules }) => {
    const [scheduleList, setScheduleList] = useState(schedules);
    const [isModalOpen, setIsModalOpen] = useState(false); // モーダル表示用の状態
    
    const handleDelete = async(id) => {
      try {
        await deleteSchedule(id);
        setScheduleList(scheduleList.filter(schedule => schedule.id !== id));
      } catch(error) {
        console.error("削除に失敗しました", error);
      }
    };
    
    // モーダルを開く関数
    const openModal = () => {
      setIsModalOpen(true);
    };
    
    // モーダルを閉じる関数
    const closeModal = () => {
      setIsModalOpen(false);
    };
    
    // スケジュールが追加されたときのコールバック
    const onScheduleAdded = (newSchedule) => {
      setScheduleList([...scheduleList, newSchedule]);
      closeModal();
    };
  
    if (!scheduleList || scheduleList.length === 0) {
      return (
        <div className="schedule-list">
          <p>スケジュールがありません</p>
          <button className="new-schedule" onClick={openModal}>+ 新規予定</button>
          
          {/* スケジュール追加用モーダル */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <AddSchedulePage onSuccess={onScheduleAdded} onClose={closeModal} />
          </Modal>
        </div>
      );
    }
  
    return (
      <div className="schedule-list">
        <div className="schedule-list-header">
          <h2>スケジュール一覧</h2>
          <button className="new-schedule" onClick={openModal}>+ 新規予定</button>
        </div>
        
        {/* スケジュール追加用モーダル */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <AddSchedulePage onSuccess={onScheduleAdded} onClose={closeModal} />
        </Modal>
        
        <div className="schedules">
          {scheduleList.map((schedule) => {
            const startDate = new Date(schedule.start_datetime);
            const endDate = new Date(schedule.end_datetime);
            
            const startMonth = startDate.getMonth() + 1;
            const endMonth = endDate.getMonth() + 1;
            
            const startDay = startDate.getDate();
            const endDay = endDate.getDate();
            
            function getTime(date) {
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              let time = `${hours}:${minutes}`;
              return time;
            }
            const startTime = getTime(startDate);
            const endTime = getTime(endDate);
            
            return (
              <div className="schedule-item" key={schedule.id}>
                <div className="schedule-date">
                  {startMonth}月{startDay}日
                </div>
                <div className="schedule-center">
                  <p className="schedule-title">{schedule.title}</p>
                  <p>{startTime} ~ {endTime}</p>
                </div>
                <div className="schedule-buttons">
                  <FaTrash className="delete-button" onClick={() => handleDelete(schedule.id)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default ScheduleList;