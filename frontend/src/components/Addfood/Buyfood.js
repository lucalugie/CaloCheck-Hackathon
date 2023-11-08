import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { addFood } from "../FoodController/foodController";
import {
  getUsersNutritons,
  updateUsersNutritons,
} from "../FoodController/updateNutritionController";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  findGramsCarbFromAdd,
  findGramsProteinFromAdd,
  findGramsVegFromAdd,
  findGramsTotalShop,
} from "../../Convert/convertAddFunction";
//lugie modify****
import { postUsersHistory } from "../FoodController/historyController";

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
  const per_fat = 0;
  const per_sugar = 0;
  const per_salt = 0;

  ///luca function to update usersNutrition db
  const [nutrition, setNutrition] = useState({
    ach_kcal: 0,
    ach_g: 0,
    ach_protein: 0,
    ach_fat: 0,
    ach_salt: 0,
    ach_sugar: 0,
    ach_veg: 0,
    ach_carb: 0,
  });

  const [updateNutrition, setUpdateNutrition] = useState({
    ach_kcal: 0,
    ach_g: 0,
    ach_protein: 0,
    ach_veg: 0,
    ach_carb: 0,
  });

  const [done, setDone] = useState(false);

  function handleConvert() {
    console.log("handleConvert called");
    // find grams
    const gCarb = findGramsCarbFromAdd(carb, per_carb) * per_items;
    const gVeg = findGramsVegFromAdd(veg, per_veg) * per_items;
    const gPro = findGramsProteinFromAdd(per_protein) * per_items;
    //daily total
    const gtotal_ = findGramsTotalShop(gCarb, gPro, gVeg);
    console.log("gtotal_", gtotal_);
    const kaclToNumber = Number(kcal) * per_items;

    setUpdateNutrition((prevNu) => ({
      ...prevNu,
      ach_kcal: kaclToNumber,
      ach_g: gtotal_,
      ach_protein: gPro,
      ach_veg: gVeg,
      ach_carb: gCarb,
    }));

    console.log("kcaltotal_", kaclToNumber);
    console.log("per_items", per_items);
    console.log("updateNutrition.", updateNutrition);
  }

  function updateStateNutrition() {
    setNutrition((prevNu) => ({
      ...prevNu,
      ach_kcal: prevNu.ach_kcal + updateNutrition.ach_kcal,
      ach_g: prevNu.ach_g + updateNutrition.ach_g,
      ach_protein: prevNu.ach_protein + updateNutrition.ach_protein,
      ach_veg: prevNu.ach_veg + updateNutrition.ach_veg,
      ach_carb: prevNu.ach_carb + updateNutrition.ach_carb,
    }));
    if (nutrition) {
      setDone(true);
    }
    console.log("nutritionaftersetstate", nutrition);
  }

  useEffect(() => {
    handleConvert();
  }, [kcal, carb, per_carb, protein, per_protein, veg, per_veg, per_items]);

  useEffect(() => {
    getUsersNutritons(setNutrition);
  }, []);

  useEffect(() => {
    console.log("Nutrition has changed:", nutrition);
    if (done === true) {
      putToNutritionDB(nutrition);
      setDone(false);
    }
  }, [nutrition]);

  async function putToNutritionDB(theData) {
    try {
      console.log(theData);
      const nutrition_update = await updateUsersNutritons(theData);
      console.log("Success user nutrition update:", nutrition_update);
    } catch (error) {
      console.error("Failed to update", error);
    }
  }
  ///luca function to update userNutrion db

  // เมื่อมีการเปลี่ยนแปลงใน input รับค่าและอัปเดต namefood

  async function add_food(theData) {
    try {
      const addedFood = await addFood("foodnutrition", theData);
      console.log("Food added:", addedFood);
      //lugie modify****
      const addedFoodId = addedFood.idfood;
      const history = {
        idfood: addedFoodId,
      };
      console.log("Added Food ID:", addedFoodId);
      console.log("history:", history);
      postHistory(history);
    } catch (error) {
      console.error("Failed to add food:", error);
    }
  }

  //lugie modify****
  async function postHistory(idfood) {
    console.log("postHistory called:", idfood);
    try {
      const history = await postUsersHistory(idfood);
      console.log("history added:", history);
    } catch (error) {
      console.error("Failed to add history:", error);
    }
  }

  function backToMyfood() {
    navigate("/myfood");
  }

  function checkaddbuyfood() {
    Swal.fire({
      title: "เพิ่มอาหาร?",
      text: "เราเพิ่มข้อมูลในประวัติของคุณ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยันการเพิ่มข้อมูล",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        if (per_items === "0") {
          return Swal.fire({
            title: "Error!",
            text: "ไม่สามารถเพิ่มข้อมูลที่น้อยกว่า 0 จานได้",
            icon: "error",
            confirmButtonText: "รับทราบ",
          });
        }

        const newFood = {
          name,
          per_items,
          kcal,
          carb,
          per_carb,
          per_fat,
          protein,
          per_protein,
          veg,
          per_veg,
          per_sugar,
          per_salt,
        };

        if (
          !name ||
          !per_items ||
          !kcal ||
          carb === "" ||
          !per_carb ||
          protein === "" ||
          !per_protein ||
          veg === "" ||
          !per_veg
        ) {
          return Swal.fire({
            title: "Error!",
            text: "กรุณาใส่ข้อมูลให้ครบ",
            icon: "error",
            confirmButtonText: "รับทราบ",
          });
        }
        updateStateNutrition();
        add_food(newFood).then(() => {
          Swal.fire("เพิ่มเรียบร้อยแล้ว").then(() => {
            backToMyfood();
          });
        });
      }
    });
  }
  return (
    <div className={className}>
      <Link to="/myfood/Addfood">
        <button className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center m-4">
          <FontAwesomeIcon icon={faArrowLeft} className="font-bold text-3xl" />
        </button>
      </Link>
      <div className="Text text-center flex flex-col justify-center items-center">
        <h3 className="card-titletwo text-accent font-bold text-center">
          ADD FOOD
        </h3>
        <h2 className="card-title font-bold text-center leading-none">
          เพิ่มรายการอาหาร
        </h2>
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
              <span className="label-text1">แคลอรี่</span>
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
          <select
            className="select select-primary w-full max-w-xs"
            value={carb}
            onChange={(e) => setCarb(e.target.value)}
          >
            <option value="" disabled selected>
              คาร์โบไฮเดรต
            </option>
            <option value="whiterice">ข้าวสวย</option>
            <option value="stickyrice">ข้าวเหนียว</option>
            <option value="brownrice">ข้าวกล้อง</option>
            <option value="eggNoodles">เส้นบะหมี่เหลือง</option>
            <option value="chineseNoodles">ขนมจีน</option>
            <option value="widericeNoodles">เส้นใหญ่</option>
            <option value="riceNoodles">เส้นเล็ก</option>
            <option value="vermicelli">เส้นหมี่</option>
            <option value="glassNoodles">วุ้นเส้น</option>
            <option value="yam">มันเทศ</option>
            <option value="taro">เผือก</option>
            <option value="pasta">เส้นพาสต้า</option>
          </select>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">จำนวน</span>
              <span className="label-text-alt">ทัพพี</span>
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
          <select
            className="select select-secondary w-full max-w-xs"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
          >
            <option value="" disabled selected>
              โปรตีน
            </option>
            <option value="wegg">ไข่ไก่ (1 ฟอง)</option>
            <option value="sadine">ซาดีน</option>
            <option value="cbreast">อกไก่</option>
            <option value="redpork">หมู</option>
            <option value="meat">เนื้อ</option>
            <option value="sausage">ไส้กรอก</option>
            <option value="bacon">เบค่อน</option>
            <option value="psausage">หมูยอ</option>
            <option value="tofu">เต้าหู้แข็ง/อ่อน</option>
            <option value="shrimp">กุ้ง</option>
            <option value="soymilk">นมถั่วเหลือง</option>
            <option value="mackerel">ปลาทู</option>
            <option value="fish">ปลา</option>
            <option value="meatballs">ลูกชิ้นหมู/ไก่</option>
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
          <select
            className="select select-success w-full max-w-xs"
            value={veg}
            onChange={(e) => setVeg(e.target.value)}
          >
            <option value="" disabled selected>
              ผัก
            </option>
            <option value="rawveg">ผักสด</option>
            <option value="cookveg">ผักสุก</option>
          </select>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">จำนวน</span>
              <span className="label-text-alt">ทัพพี</span>
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

      <div className="confirm mt-16 mb-32">
        <button className="btn btn-success" onClick={checkaddbuyfood}>
          add food
        </button>
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
    margin-top: 2rem;
  }
  .DataAll {
    font-size: calc(60% + 2vmin);
    padding-top: 25px;
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
