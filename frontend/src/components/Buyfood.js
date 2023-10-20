import React from 'react'
import styled from "styled-components";


const Buyfood = ({ className }) => (
  <div className={className}>
     <div className="back">
      <button class="btn btn-active btn-secondary">⬅back</button>
    </div>
    <div className="Text">
      <h1>
        <b>เพิ่มรายการอาหาร</b>
      </h1>
    </div>
    <div className="DataAll">
      <div className="Data">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text1">ชื่ออาหาร</span>
            <span className="label-text-alt"></span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>

      <div className="Data">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text1">แคลลอรี่</span>
            <span className="label-text-alt">Kcal</span>
          </label>
          <input
            type="number"
            min="0"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            
          />
          
        </div>
      </div>

      <div className="Data">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text1">จำนวน</span>
            <span className="label-text-alt">จาน</span>
          </label>
          <input
            type="number"
            min="0"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            
          />
        </div>
      </div>
      <div className="Text">
        <h1>
          <b>โภชนาการโดยประมาณ</b>
        </h1>
      </div>
      <div className="Data">
        <select className="select select-primary w-full max-w-xs">
          <option disabled selected>
            คาร์โบไฮเดรต
          </option>
          <option>ข้าว</option>
          <option>ขนมปัง</option>
          <option>ขนมจีน</option>
          <option>เส้นใหญ่</option>
          <option>เส้นเล็ก</option>
          <option>เส้นบะหมี่</option>
          <option>เส้นพาสต้า</option>
        </select>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">จำนวน</span>
            <span className="label-text-alt">ช้อนโต๊ะ</span>
          </label>
          <input
            type="number"
            min="0"
            placeholder="Type here"
            class="input input-bordered input-primary w-full max-w-xs"
           
          />
        </div>
      </div>
      <div className="Data">
        <select className="select select-secondary w-full max-w-xs">
          <option disabled selected>
            โปรตีน
          </option>
          <option>ไข่ไก่</option>
          <option>ไข่เป็ด</option>
          <option>ไก่</option>
          <option>หมู</option>
          <option>เนื้อ</option>
          <option>เป็ด</option>
          <option>กุ้ง</option>
          <option>หอย</option>
          <option>ปู</option>
          <option>ปลา</option>
          <option>ปลาหมึก</option>
        </select>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">จำนวน</span>
            <span className="label-text-alt">ช้อนโต๊ะ</span>
          </label>
          <input
            type="number"
            min="0"
            placeholder="Type here"
            className="input input-bordered input-secondary w-full max-w-xs"
            
          />
        </div>
      </div>
      <div className="Data">
        <select className="select select-success w-full max-w-xs">
          <option disabled selected>
            ผัก
          </option>
          <option>สด</option>
          <option>สุก</option>
        </select>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">จำนวน</span>
            <span className="label-text-alt">ช้อนโต๊ะ</span>
          </label>
          <input
            type="number"
            min="0"
            placeholder="Type here"
            className="input input-bordered input-success w-full max-w-xs"
            
          />
        </div>
      </div>
      
    </div>
    <div class="confirm">
      <button class="btn btn-success">Confirm</button>
    </div>
  </div>
);


export default styled(Buyfood)`
 .back {
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 10px 20px;
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
  .DataAll {
    font-size: calc(60% + 2vmin);
    padding: 50px;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .Data {
    padding: 20px;
  }
  .label-text1 {
    font-size: calc(60% + 1vmin); /* กำหนดขนาดตัวหนังสือใน .label-text */
  }

  .input {
    font-size: calc(60% + 1vmin); /* กำหนดขนาดตัวหนังสือใน .input */
  }
  .confirm {
    display: flex;
    justify-content: center;
    height: 4rem;
  }
`;
