import { useState , Fragment} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import SearchList from "@Component/Calendar/SearchList";
const useViewModel = () =>{
    
        const [studentCheckedList,setStudentCheckedList] = useState([]);
        const handleSubmit = (e) =>{
            e.preventDefault();
            const eventName = e.target[0].value;
            const link = e.target[1].value;
            console.log(eventName, link, studentCheckedList);
            setStudentCheckedList([]);
        }

        const [nameList,setNameList] = useState(["yung","preme","whoru","peter","mark"]);
        // Create a date object for the current month
        const currentMonth = new Date();
        const [month,setMonth] = useState(currentMonth.getMonth()+1);
        const [year,setYear] = useState(currentMonth.getFullYear());

        if(month === 13){
            setMonth(1);
            setYear(year+1);
        }
        if(month === 0){
            setMonth(12);
            setYear(year-1);
        }

        const currentDate = new Date(`${year}-${month}-01`);

        // Initialize an array to hold the calendar days
        const calendarDays = [];
    
        // Calculate the first day of the month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
        // Calculate the number of blank cells before the first day
        const numBlankCells = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, ...
    
        // Loop to generate calendar days
        for (let i = 0; i < numBlankCells; i++) {
            calendarDays.push(
                <div key={`blank-${i}`} className="text-center text-gray-400">
                    {/* Empty cell */}
                </div>
            );
        }
    
        while (currentDate.getMonth() === month-1) { // Month is zero-indexed
            const day = currentDate.getDate();
            if(day === currentMonth.getDate() && month ===  currentMonth.getMonth()+1 && year === currentMonth.getFullYear()){
                calendarDays.push(
                    <div key={day} className="btn btn-ghost h-28 text-info">
                        {day}
                        <div className="hidden lg:block badge badge-info">
                            วันนี้
                        </div>
                    </div>
                );

            }else if(day === 25){
                calendarDays.push(
                    <div onClick={() => console.log("special ",day, month, year)} key={day} className="btn btn-ghost h-28 text-warning">
                        {day}
                        <div className="hidden lg:block badge badge-warning">
                            เรียน
                        </div>
                    </div>
                );
            }else{
                calendarDays.push(
                <Fragment key={day}>
                    <div onClick={()=>document.getElementById(`${day}${month}${year}`).showModal()}  className="btn btn-ghost h-28">
                        {day}
                    </div>
                    <dialog id={`${day}${month}${year}`} className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                            <button onClick={() => setStudentCheckedList([])}className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg">{day}/{month}/{year}</h3>
                            <div className="py-4">
                                <form className="form-control gap-2" onSubmit={(e) => handleSubmit(e)}>
                                    <label className="input-group">
                                        <span className="basis-1/4">เหตุการณ์</span>
                                        <input name="event" required autoComplete="off" type="text" placeholder="ชื่อเหตุการณ์" className="input input-bordered flex-1" />
                                    </label>
                                    <label className="input-group">
                                        <span className="basis-1/4">ช่องทาง</span>
                                        <input name="link" required autoComplete="off" type="text" placeholder="เช่น zoom" className="input input-bordered flex-1" />
                                    </label>
                                    <label className="input-group">
                                        <span className="basis-1/4 flex justify-center items-center"><FontAwesomeIcon icon={faSearch} /></span>
                                        <input name="username" autoComplete="off" type="text" placeholder="ชื่อนักเรียน" className="input input-bordered flex-1" />
                                    </label>
                                    <div className="form-control">
                                        {/* Checked List */}
                                        {studentCheckedList.map(e=>{
                                            return <SearchList username={e} setStudentCheckedList={setStudentCheckedList} checked={true} studentCheckedList={studentCheckedList} key={e} />
                                        })}

                                        {/* Search List */}
                                        {nameList.filter(e=>!studentCheckedList.includes(e)).map(e=>{
                                            return <SearchList username={e} setStudentCheckedList={setStudentCheckedList} checked={false} studentCheckedList={studentCheckedList} key={e} />
                                        })}
                                    </div>
                                    <input type="submit" className="btn btn-primary" value={"บันทึก"}/>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </Fragment>
                );
            }
    
            // Move to the next day
            currentDate.setDate(day + 1);     
        }

        let monthName;
            switch(month-1) {
                case 0: monthName = "มกราคม"; break;
                case 1: monthName = "กุมภาพันธ์"; break;
                case 2: monthName = "มีนาคม"; break;
                case 3: monthName = "เมษายน"; break;
                case 4: monthName = "พฤษภาคม"; break;
                case 5: monthName = "มิถุนายน"; break;
                case 6: monthName = "กรกฎาคม"; break;
                case 7: monthName = "สิงหาคม"; break;
                case 8: monthName = "กันยายน"; break;
                case 9: monthName = "ตุลาคม"; break;
                case 10: monthName = "พฤศจิกายน"; break;
                case 11: monthName = "ธันวาคม"; break;
                default: break;
            }
        return {monthName, month, year, calendarDays, setMonth, setNameList,setYear};
}

export default useViewModel