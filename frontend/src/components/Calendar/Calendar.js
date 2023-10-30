import useViewModel from './useViewModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretRight, faCaretLeft} from '@fortawesome/free-solid-svg-icons';
import Datastatus from '../DataStatus/Datastatus';
const Calendar = () => {
    const {month, day,year, calendarDays,setMonth,setYear} = useViewModel();

    return (
        <>
        <div className="container mx-auto p-4">
            <div className="flex flex-row justify-center items-center mb-4 gap-5"> {/* Center header */}
                <FontAwesomeIcon onClick={() => setMonth(Number(month)-1)} icon={faCaretLeft} className='text-primary btn btn-ghost'/>
                <select onChange={(e) => setMonth(Number(e.target.value))} name="month" className="select select-ghost max-w-xs" value={month}>
                    <option value={1}>มกราคม</option>
                    <option value={2}>กุมภาพันธ์</option>
                    <option value={3}>มีนาคม</option>
                    <option value={4}>เมษายน</option>
                    <option value={5}>พฤษภาคม</option>
                    <option value={6}>มิถุนายน</option>
                    <option value={7}>กรกฎาคม</option>
                    <option value={8}>สิงหาคม</option>
                    <option value={9}>กันยายน</option>
                    <option value={10}>ตุลาคม</option>
                    <option value={11}>พฤศจิกายน</option>
                    <option value={12}>ธันวาคม</option>
                </select>
                <input onChange={(e) => setYear(Number(e.target.value))} type="number" placeholder="year" value={year} className="input input-ghost w-24"/>
                <FontAwesomeIcon onClick={() => setMonth((Number(month)+1))} icon={faCaretRight} className='text-primary btn btn-ghost'/>
            </div>
            <div className="grid grid-cols-7 gap-2 font-th2">
                {/* Days of the week */}
                <div className="text-center font-semibold text-xs sm:text-">อาทิตย์</div>
                <div className="text-center font-semibold text-xs sm:text-">จันทร์</div>
                <div className="text-center font-semibold text-xs sm:text-">อังคาร</div>
                <div className="text-center font-semibold text-xs sm:text-">พุธ</div>
                <div className="text-center font-semibold text-xs sm:text-">พฤหัสบดี</div>
                <div className="text-center font-semibold text-xs sm:text-">ศุกร์</div>
                <div className="text-center font-semibold text-xs sm:text-">เสาร์</div>

                {/* Calendar days */}
                {calendarDays}
            </div>
        </div>
        <Datastatus day={day} month={month} year={year}/>
        </>
       
    );
}

export default Calendar;