import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PieColor from "./Piedayly";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, setLoading } from "../../store/barcodeSlice";
import { Table } from "@mui/material";
//lugie modify
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postUsersHistory } from "../FoodController/historyController";
import { findGramsTotal } from "../../Convert/convertAddFunction";
import {
  getUsersNutritons,
  updateUsersNutritons,
} from "../FoodController/updateNutritionController";
import {
  fetchUserGoals,
  fetchUserNutrition,
} from "../../Convert/userController";

const Todayfood = ({ className }) => {
  const [num, setNum] = useState(1);
  const sku = useSelector((state) => state.barcode);
  const dispatch = useDispatch();
  const [k, setK] = useState(80);
  const [found, setFound] = useState(false);
  const [foodData, setFoodData] = useState([]);

  //lugie modify
  const navigate = useNavigate();
  const goals = useSelector((state) => state.goals);
  const nutri = useSelector((state) => state.nutrition);

  // ใช้ useEffect เพื่ออัปเดตค่า k จาก API หรือตามเหตุการณ์อื่น ๆ
  useEffect(() => {
    // ตัวอย่างการใช้ fetch เพื่อดึงค่าจาก API
    const fetchDataAndUpdateK = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/foodnutrition/barcode/?sku=${sku.sku}`
        );
        const data = await response.json();
       
        if (data.length > 0) {
          setFoodData(data);
          setFound(true); 
          dispatch(setLoading(false));
        } else {
          console.log("no data");
          setFound(false); 
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // เรียกใช้งาน fetchDataAndUpdateK เมื่อคอมโพเนนต์โหลดหรือตามเหตุการณ์ที่คุณต้องการ
    fetchDataAndUpdateK();
  }, [sku.sku]); // อย่าลืมใส่อาเรย์ที่เป็นขึ้นตอนเป็นว่างเพื่อให้มันทำงานเมื่อคอมโพเนนต์โหลดครั้งแรกเท่านั้น

  //lugie modify****
  function confirmAdd() {
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
        if (num === 0) {
          return Swal.fire({
            title: "Error!",
            text: "ไม่สามารถเพิ่มข้อมูล 0 จานได้",
            icon: "error",
            confirmButtonText: "รับทราบ",
          });
        }
        console.log("1");
        const update = updateStateNutrition();
        putToNutritionDB(update);
        console.log("2");
        handleAddToHistory();
      }
    });
  }

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
    ach_fat: 0,
    ach_salt: 0,
    ach_sugar: 0,
    ach_veg: 0,
    ach_carb: 0,
  });
  // const [done, setDone] = useState(false);

  useEffect(() => {
    getUsersNutritons(setNutrition);
    fetchUserNutrition(dispatch);
    fetchUserGoals(dispatch);
  }, []);

  // useEffect(() => {
  //   console.log("useEffect nutrition, done", nutrition, done)
  //   if (done === true) {
  //     console.log("Nutrition has changed:", nutrition);
  //     putToNutritionDB(nutrition);
  //     setDone(false);
  //   }
  // }, [nutrition, done]);

  useEffect(() => {
    handleConvert();
  }, [num, foodData]);

  async function putToNutritionDB(theData) {
    console.log("putToNutritionDB called", putToNutritionDB);
    try {
      console.log(theData);
      const nutrition_update = await updateUsersNutritons(theData);
      console.log("Success user nutrition update:", nutrition_update);
    } catch (error) {
      console.error("Failed to update", error);
    }
  }

  const handleAddToHistory = () => {
    const addedFoodId = foodData[0]?.idfood;
    const foodsToAdd = Array.from({ length: num }, () => ({
      idfood: Number(addedFoodId),
    }));
    Promise.all(foodsToAdd.map((food) => postHistory(food))).then(() => {
      Swal.fire("เพิ่มเรียบร้อยแล้ว").then(() => {
        backToHome();
      });
    });
  };

  function handleConvert() {
    if (foodData.length > 0) {
      const tkcal = foodData[0].kcal * num;
      const gprotein = foodData[0].per_protein * num;
      const gfat = foodData[0].per_fat * num;
      const gsalt = foodData[0].per_salt * num;
      const gsugar = foodData[0].per_sugar * num;
      const gveg = foodData[0].per_veg * num;
      const gcarb = foodData[0].per_carb * num;
      const gtotal = findGramsTotal(gcarb, gsugar, gfat, gprotein, gveg, gsalt);

      setUpdateNutrition({
        ach_kcal: tkcal,
        ach_g: gtotal,
        ach_protein: gprotein,
        ach_fat: gfat,
        ach_salt: gsalt,
        ach_sugar: gsugar,
        ach_veg: gveg,
        ach_carb: gcarb,
      });
    }
    console.log("per items", num);
    console.log("handleConvert called");
    console.log("updateNutrition", updateNutrition);
  }

  function updateStateNutrition() {
    const updatedNutrition = {
      ach_kcal: nutrition.ach_kcal + updateNutrition.ach_kcal,
      ach_g: nutrition.ach_g + updateNutrition.ach_g,
      ach_protein: nutrition.ach_protein + updateNutrition.ach_protein,
      ach_fat: nutrition.ach_fat + updateNutrition.ach_fat,
      ach_salt: nutrition.ach_salt + updateNutrition.ach_salt,
      ach_sugar: nutrition.ach_sugar + updateNutrition.ach_sugar,
      ach_veg: nutrition.ach_veg + updateNutrition.ach_veg,
      ach_carb: nutrition.ach_carb + updateNutrition.ach_carb,
    };

    // setDone(true);
    console.log("testt", updatedNutrition);
    console.log("nutrition after setstate", nutrition);
    return updatedNutrition;
  }

  function backToHome() {
    console.log("3");
    dispatch(setStatus(false));
    dispatch(setLoading(true));
    navigate("/");
  }

  async function postHistory(idfood) {
    console.log("postHistory called:", idfood);
    try {
      const history = await postUsersHistory(idfood);
      console.log("history added:", history);
    } catch (error) {
      console.error("Failed to add history:", error);
    }
  }

  function findPercentage(achieve, goals) {
    const percentage = (achieve / goals) * 100;
    return Math.round(percentage);
  }



  return (
    <>
      {sku.loading ? (
        <>
          <div className="wrap w-full h-1/2 mt-32">
            <div className="flex flex-row justify-center items-center h-full">
              <span className="loading loading-ball loading-xs text-success"></span>
              <span className="loading loading-ball loading-sm text-primary"></span>
              <span className="loading loading-ball loading-md text-accent"></span>
              <span className="loading loading-ball loading-lg text-secondary"></span>
            </div>
          </div>
        </>
      ) : (
        <>
          {found ? (
            <div className={className}>
              <div className="back">
                {/* lugie modify */}
                <button
                  className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center m-4"
                  onClick={() => {
                    dispatch(setStatus(false));
                    backToHome();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="font-bold text-3xl"
                  />
                </button>
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
                    type="text"
                    min="1"
                    placeholder="1"
                    className="input input-bordered input-error w-full max-w-xs"
                    value={Number(num)}
                    //lugie modify
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/[^0-9]/g, "");
                      setNum(Number(newValue));
                    }}
                  />
                  <br />
                  <PieColor
                    kcal={foodData[0]?.kcal}
                    carb={foodData[0]?.per_carb}
                    protein={foodData[0]?.per_protein}
                    fat={foodData[0]?.per_fat}
                    veg={foodData[0]?.per_veg}
                    sugar={foodData[0]?.per_sugar}
                    salt={foodData[0]?.per_salt}
                  />
                </div>
                {/* lugie modify */}
                <div className="dayly">
                  <h1>
                    <b>เป้าหมายรายวัน</b>
                  </h1>
                  <br />
                  <h2>รวม</h2>
                  <progress
                    className="progress progress-success w-5rem"
                    value={findPercentage(nutri.ach_g, goals.goals_g)}
                    max="100"
                  ></progress>
                  <h3>{findPercentage(nutri.ach_g, goals.goals_g)}%</h3>
                </div>
                <div className="daylylist">
                  <div className="dayly grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 gap-y-6 sm:gap-y-10 w-5rem">
                    <div className="list">
                      <h2>คาร์โบไฮเดรต</h2>
                      <progress
                        className={`progress progress-accent`}
                        value={findPercentage(nutri.ach_carb, goals.goals_carb)}
                        max="100"
                      />
                      <h3>
                        {findPercentage(nutri.ach_carb, goals.goals_carb)}%
                      </h3>
                    </div>
                    <div className="list">
                      <h2>น้ำตาล</h2>
                      <progress
                        className={`progress progress-secondary`}
                        value={findPercentage(
                          nutri.ach_sugar,
                          goals.goals_sugar
                        )}
                        max="100"
                      />
                      <h3>
                        {findPercentage(nutri.ach_sugar, goals.goals_sugar)}%
                      </h3>
                    </div>
                    <div className="list">
                      <h2>โปรตีน</h2>
                      <progress
                        className={`progress progress-error`}
                        value={findPercentage(
                          nutri.ach_protein,
                          goals.goals_protein
                        )}
                        max="100"
                      />
                      <h3>
                        {findPercentage(nutri.ach_protein, goals.goals_protein)}
                        %
                      </h3>
                    </div>
                    <div className="list">
                      <h2>ผัก</h2>
                      <progress
                        className={`progress progress-success`}
                        value={findPercentage(nutri.ach_veg, goals.goals_veg)}
                        max="100"
                      />
                      <h3>{findPercentage(nutri.ach_veg, goals.goals_veg)}%</h3>
                    </div>
                    <div className="list">
                      <h2>ไขมัน</h2>
                      <progress
                        className={`progress progress-warning`}
                        value={findPercentage(nutri.ach_fat, goals.goals_fat)}
                        max="100"
                      />
                      <h3>{findPercentage(nutri.ach_fat, goals.goals_fat)}%</h3>
                    </div>
                    <div className="list">
                      <h2>เกลือ</h2>
                      <progress
                        className={`progress progress-info`}
                        value={findPercentage(nutri.ach_salt, goals.goals_salt)}
                        max="100"
                      />
                      <h3>
                        {findPercentage(nutri.ach_salt, goals.goals_salt)}%
                      </h3>
                    </div>
                    {/* lugie modify */}
                  </div>
                </div>
              </div>

              {/* //lugie modify */}
              <div className="cc">
                <div
                  className="cancel"
                  onClick={() => {
                    backToHome();
                  }}
                >
                  <button className="btn btn-error">Cancel</button>
                </div>

                <div className="confirm">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      confirmAdd();
                    }}
                  >
                    Confirm Add
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* The button to open modal */}
              {/* Put this part before </body> tag */}

              <center>
                <div className="card w-96 bg-base-100 shadow-xl">
                  <figure className="px-10 pt-10">
                    <img
                      src="/logo/SORRY.png"
                      alt="Shoes"
                      className="rounded-xl"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">ขออภัย</h2>
                    <p>
                      หมายเลขสินค้านี้ยังไม่มีข้อมูลในระบบ
                      โปรดอย่ากังวลไปทางเราจะรีบอัพเดตข้อมูลให้เร็วที่สุด
                    </p>
                    <div className="card-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          dispatch(setStatus(false));
                          dispatch(setLoading(true));
                        }}
                      >
                        back
                      </button>
                    </div>
                  </div>
                </div>
              </center>
            </>
          )}
        </>
      )}
    </>
  );
};

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
  .Nutritions h2 {
    font-size: calc(60% + 1vmin);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }
  .Nutritions h1 {
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
  .dayly h1 {
    font-size: calc(60% + 2vmin);
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .dayly h2 {
    font-size: calc(60% + 1vmin);
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .dayly h3 {
    font-size: calc(40% + 1vmin);
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .list {
    width: 100%;
  }
  .list h2 {
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
  .cc {
    display: flex;
    justify-content: center;
  }
`;
