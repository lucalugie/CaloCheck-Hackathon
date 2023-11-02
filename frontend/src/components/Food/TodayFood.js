import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PieColor from "./Piedayly";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../store/barcodeSlice";
import { Table } from "@mui/material";
const Todayfood = ({ className }) => {
  const [num, setNum] = useState(1);
  const sku= useSelector((state) => state.barcode);
  const dispatch = useDispatch();
  const handleNumChange = (event) => {
    setNum(Number(event.target.value)); 
  };
  const [k, setK] = useState(80);

  const [found, setFound] = useState(false);
  const [foodData, setFoodData] = useState([])
  const [tableData, setTableData] = useState([
    { id: 1, name: 'คาร์โบไฮเดรต', value: k, progressClass: 'accent' },
    { id: 2, name: 'น้ำตาล', value: 35, progressClass: 'secondary' },
    { id: 3, name: 'โปรตีน', value: 50, progressClass: 'error' },
    { id: 4, name: 'ผัก', value: 10, progressClass: 'success' },
    { id: 5, name: 'ไขมัน', value: 60, progressClass: 'warning' },
    { id: 6, name: 'เกลือ', value: 20, progressClass: 'info' },
  ]);
   // ใช้ useEffect เพื่ออัปเดตค่า k จาก API หรือตามเหตุการณ์อื่น ๆ
   useEffect(() => {
    // ตัวอย่างการใช้ fetch เพื่อดึงค่าจาก API
    const fetchDataAndUpdateK = async () => {
      try {
        const response = await fetch(`http://localhost:3000/foodnutrition/barcode/?sku=${sku.sku}`);
        const data = await response.json();
        if(data){
          setFoodData(data);
          setFound(true)
        }
        else{
          console.log("no data")
          setFound(false)
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // เรียกใช้งาน fetchDataAndUpdateK เมื่อคอมโพเนนต์โหลดหรือตามเหตุการณ์ที่คุณต้องการ
    fetchDataAndUpdateK();
  }, [sku.sku]); // อย่าลืมใส่อาเรย์ที่เป็นขึ้นตอนเป็นว่างเพื่อให้มันทำงานเมื่อคอมโพเนนต์โหลดครั้งแรกเท่านั้น





  return (
    <>
    {
      found ?
      <div className={className}>
      <div className="back">
            <button class="btn btn-active btn-secondary" onClick={() =>dispatch(setStatus(false))}>⬅back</button>
          </div>
          <div className="Text">
            <h1>
              <b>{foodData[0]?.name}</b>
            </h1>
          </div>
          <div className="Nutritions text-accent">
            <h2>
              <b>Nutritions</b>
              </h2>
            <h1>
              <b>สารอาหาร</b>
            </h1>
          </div>
          <div className="data">
      
          <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text1">จำนวน</span>
                  <span className="label-text-alt">หน่วยตามที่บรรจุ</span>
                </label>
                <input
                 type="number"
                 min="1"
                placeholder="1"
                className="input input-bordered input-error w-full max-w-xs"
                  value={num}
                  onChange={handleNumChange}
                />
                <br/>
                <PieColor kcal={foodData[0]?.kcal} carb={foodData[0]?.per_carb} protein={foodData[0]?.per_protein} fat={foodData[0]?.per_fat} veg={foodData[0]?.per_veg} sugar={foodData[0]?.per_sugar} salt={foodData[0]?.per_salt} />
              </div>
              <div className="dayly">
            <h1>
              <b>เป้าหมายรายวัน</b>
            </h1>
            <br/>
            <h2>รวม</h2>
            <progress className="progress progress-success w-5rem" value="40" max="100"></progress>
            <h3>40%</h3>
          </div>
          <div className="daylylist">
          <div className="dayly grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 gap-y-6 sm:gap-y-10 w-5rem">
       
          {tableData.map((item) => (
        <div className="list" key={item.id}>
          <h2>{item.name}</h2>
          <progress className={`progress progress-${item.progressClass}`} value={item.value} max="100" />
          <h3>{item.value}%</h3>
        </div>

          ))}
         
      </div>
          </div>
          
          </div>
          <div className="cc">
          <div class="cancel">
            <button class="btn btn-error">Cancel</button>
          </div>
          <div class="confirm">
            <button class="btn btn-success">Confirm</button>
          </div>
          
          </div>
        
        </div>
     
      :
      <>
          {/* The button to open modal */}
         
      {/* Put this part before </body> tag */}

      <center>
          <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src="/logo/SORRY.png" alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">ขออภัย</h2>
            <p>หมายเลขสินค้านี้ยังไม่มีข้อมูลในระบบ โปรดอย่ากังวลไปทางเราจะรีบอัพเดตข้อมูลให้เร็วที่สุด</p>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() =>dispatch(setStatus(false))}>back</button>
            </div>
          </div>
        </div>
        </center>
    </>
}
</>
);}

export default styled(Todayfood)`
.back {
  font-size: calc(60% + 2vmin);
}
.Text h1 {
  font-size: calc(60% + 2vmin);
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
}
.Nutritions h2{
  font-size: calc(60% + 1vmin);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}
.Nutritions h1{
  font-size: calc(60% + 2vmin);
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.data {
  font-size: calc(60% + 2vmin);
  padding: 50px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dayly h1{
  font-size: calc(60% + 2vmin);
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dayly h2{
  font-size: calc(60% + 1vmin);
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dayly h3{
  font-size: calc(40% + 1vmin);
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.list{
  width: 100%;
}
.list h2{
  font-size: calc(60% + 1vmin);
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.confirm {
    height: 4rem;
    width: 5rem;
    margin: 1rem;
  }
  .cancel {
    height: 4rem;
    width: 5rem;
    margin: 1rem;
    
  }
  .cc{
    display: flex;
    justify-content: center;
  }
`;