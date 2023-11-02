import { useState , Fragment} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import SearchList from "./SearchList";
const useViewModel = () =>{

        const [select,setSelect] = useState({day:0,month:0,year:0});
        const [studentCheckedList,setStudentCheckedList] = useState([]);
        const handleSubmit = (e) =>{
            e.preventDefault();
            const eventName = e.target[0].value;
            const link = e.target[1].value;
            console.log(eventName, link, studentCheckedList);
            setStudentCheckedList([]);
        }


        // Create a date object for the current month
        const currentMonth = new Date();
        const [month,setMonth] = useState(currentMonth.getMonth()+1);
        const [year,setYear] = useState(currentMonth.getFullYear());
        const [day,setDay] = useState(0);
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
                    <div key={day}  onClick={()=>click(day)} className="btn btn-ghost h-28 text-info">
                        {day}
                        <div className="hidden lg:block badge badge-info">
                            วันนี้
                        </div>
                    </div>
                );

            }else if(select.day === day && select.month === month && select.year === year){
                calendarDays.push(
                    <div key={day} className="btn btn-ghost h-28 text-warning">
                        {day}
                    </div>
                );
            }else{
        
                calendarDays.push(
                <Fragment key={day}>
                    <div onClick={()=>click(day)} className=" btn btn-ghost h-28">
                        {day}
                    </div>
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

            const click =(day)=>{
                setSelect({day:day,month:month,year:year});
                console.log("normal ",day, month, year)
                setDay(day);
            }

        return {monthName, day,month, year, calendarDays, setMonth,setYear};
}

export default useViewModel