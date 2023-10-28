import styled from "styled-components";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { addFood } from "../FoodController/foodController";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Buyfood = ({ className }) => {

  const navigate = useNavigate();
  // กำหนดค่าเริ่มต้นของ namefood เป็น ""
  const [name, setName] = useState("");
  const [per_items, setPer_items] = useState("");
  const [kcal, setKcal] = useState("");
  const [carb, setCarb] = useState("");
  const [per_carb, setPer_carb] = useState("");
  const [protein, setProtein] = useState("");
  const [per_protein, setPer_protein] = useState("");
  const [veg, setVeg] = useState("");
  const [per_veg, setPer_veg] = useState("");

  // เมื่อมีการเปลี่ยนแปลงใน input รับค่าและอัปเดต namefood
  
  async function add_food(theData) {
 
    try {
      const addedFood = await addFood('Foodnutrition', theData);
      console.log('Food added:', addedFood);
    } catch (error) {
      console.error('Failed to add food:', error);
    }
  }
  
  function backToMyfood() {
    navigate('/myfood');
  }


  function checkaddbuyfood(){
    Swal.fire({
        title: 'เพิ่มอาหาร?',
        text: "เราเพิ่มข้อมูลในประวัติของคุณ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยันการเพิ่มข้อมูล',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
            const newFood = {
                name,
                per_items,
                kcal,
                carb,
                per_carb,
                protein,
                per_protein,
                veg,
                per_veg
              };
          
              if (
                  !name ||
                  !per_items ||
                  !kcal ||
                  carb === '' ||
                  !per_carb ||
                  protein === '' ||
                  !per_protein ||
                  veg === '' ||
                  !per_veg 
                  
                ) {
         
                  return(Swal.fire({
                      title: 'Error!',
                      text: 'กรุณาใส่ข้อมูลให้ครบ',
                      icon: 'error',
                      confirmButtonText: 'รับทราบ'
                    })); 
                }
                add_food(newFood)
            backToMyfood();
          Swal.fire(
            'เพิ่มเรียบร้อยแล้ว'
          )
        }
      })
  }
  return (
    <div className={className}>
      <Link to="/myfood/Addfood">
        <button className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center m-4">
          <FontAwesomeIcon icon={faArrowLeft} className="font-bold text-3xl" />
        </button>
      </Link>

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
              value={name} // ใช้ค่าจาก namefood เป็นค่าเริ่มต้นของ input
              onChange={(e) => setName(e.target.value)} // เรียกใช้ฟังก์ชัน handleNamefoodChange เมื่อมีการเปลี่ยนแปลงใน input
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
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={kcal}
              onChange={(e) => {
                let newValue = e.target.value;

                if (newValue.split(".").length > 2) {
                  newValue = newValue.substring(0, newValue.lastIndexOf("."));
                }
                newValue = newValue.replace(/[^0-9.]/g, "");
                setKcal(newValue);
              }}
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
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={per_items}
              onChange={(e) => {
                const newValue = e.target.value.replace(/[^0-9]/g, "");
                setPer_items(newValue);
              }}
            />
          </div>
        </div>
        <div className="Text">
          <h1>
            <b>โภชนาการโดยประมาณ</b>
          </h1>
        </div>
        <div className="Data">
          <select className="select select-primary w-full max-w-xs" value={carb} onChange={(e) => setCarb(e.target.value)}>
            <option value="" disabled selected>
              คาร์โบไฮเดรต
            </option>
            <option  value="ข้าว">ข้าว</option>
            <option value="ขนมปัง">ขนมปัง</option>
            <option value="ขนมจีน">ขนมจีน</option>
            <option value="เส้นใหญ่">เส้นใหญ่</option>
            <option value="เส้นเล็ก">เส้นเล็ก</option>
            <option value="เส้นบะหมี่">เส้นบะหมี่</option>
            <option value="เส้นพาสต้า">เส้นพาสต้า</option>
          </select>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">จำนวน</span>
              <span className="label-text-alt">ช้อนโต๊ะ</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-primary w-full max-w-xs"
              value={per_carb}
              onChange={(e) => {
                let newValue = e.target.value;

                if (newValue.split(".").length > 2) {
                  newValue = newValue.substring(0, newValue.lastIndexOf("."));
                }
                newValue = newValue.replace(/[^0-9.]/g, "");
                setPer_carb(newValue);
              }}
            />
          </div>
        </div>
        <div className="Data">
          <select className="select select-secondary w-full max-w-xs" value={protein} onChange={(e) => setProtein(e.target.value)}>
            <option  value="" disabled selected>
              โปรตีน
            </option>
            <option value="ไข่ไก่">ไข่ไก่</option>
            <option value="ไข่เป็ด">ไข่เป็ด</option>
            <option value="ไก่">ไก่</option>
            <option value="หมู">หมู</option>
            <option value="เนื้อ">เนื้อ</option>
            <option value="เป็ด">เป็ด</option>
            <option value="กุ้ง">กุ้ง</option>
            <option value="หอย">หอย</option>
            <option value="ปู">ปู</option>
            <option value="ปลา">ปลา</option>
            <option value="ปลาหมึก">ปลาหมึก</option>
          </select>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">จำนวน</span>
              <span className="label-text-alt">ช้อนโต๊ะ</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-secondary w-full max-w-xs"
              value={per_protein}
              onChange={(e) => {
                let newValue = e.target.value;

                if (newValue.split(".").length > 2) {
                  newValue = newValue.substring(0, newValue.lastIndexOf("."));
                }
                newValue = newValue.replace(/[^0-9.]/g, "");
                setPer_protein(newValue);
              }}
            />
          </div>
        </div>
        <div className="Data">
          <select className="select select-success w-full max-w-xs" value={veg} onChange={(e) => setVeg(e.target.value)}>
            <option  value="" disabled selected>
              ผัก
            </option>
            <option  value="สด">สด</option>
            <option value="สุก">สุก</option>
          </select>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">จำนวน</span>
              <span className="label-text-alt">ช้อนโต๊ะ</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-success w-full max-w-xs"
              value={per_veg}
              onChange={(e) => {
                let newValue = e.target.value;

                if (newValue.split(".").length > 2) {
                  newValue = newValue.substring(0, newValue.lastIndexOf("."));
                }
                newValue = newValue.replace(/[^0-9.]/g, "");
                setPer_veg(newValue);
              }}
            />
          </div>
        </div>
      </div>

      <div className="confirm">
          <button className="btn btn-success" onClick={checkaddbuyfood}>Confirm</button>
      </div>
    </div>
  );
};

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
