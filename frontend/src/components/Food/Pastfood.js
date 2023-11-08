import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PieColor from "./Piedayly";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { findGramsTotal } from "../../Convert/convertAddFunction";
import {
  getUsersNutritons,
  updateUsersNutritons,
} from "../FoodController/updateNutritionController";
import Swal from "sweetalert2";
//lugie modify****
import { postUsersHistory } from "../FoodController/historyController";

const Pastfood = ({ className }) => {
  //lugie modify****
  const { idfood, name, kcal, protein, fat, salt, sugar, veg, carb } =
    useParams();
  const [quantity, setQuantity] = useState(1); // เพิ่มสถานะเก็บจำนวน
  const navigate = useNavigate();

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
  const [done, setDone] = useState(false);

  useEffect(() => {
    getUsersNutritons(setNutrition);
  }, []);

  useEffect(() => {
    handleConvert();
  }, [quantity]);

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
        if (quantity <= 0 || quantity > 50) {
          return Swal.fire({
            title: "Error!",
            text: "ไม่สามารถเพิ่มข้อมูลที่น้อยกว่า 1 จานหรือมากกว่า 50 จานได้",
            icon: "error",
            confirmButtonText: "รับทราบ",
          });
        }
        updateStateNutrition();

        //lugie modify****
        // console.log("params idfood", idfood);
        // const addedFoodId = idfood;
        // const history = {
        //   idfood: Number(addedFoodId),
        // };
        // console.log("addedFoodId:", addedFoodId);
        // console.log("history:", history);
        // postHistory(history).then(() => {
        //   Swal.fire("เพิ่มเรียบร้อยแล้ว").then(() => {
        //     backToHome();
        //   });
        // });
        handleAddToHistory();
      }
    });
  }

  //lugie modify****
  const handleAddToHistory = () => {
    const addedFoodId = idfood;
    const foodsToAdd = Array.from({ length: quantity }, () => ({
      idfood: Number(addedFoodId),
    }));
    Promise.all(foodsToAdd.map((food) => postHistory(food))).then(() => {
      Swal.fire("เพิ่มเรียบร้อยแล้ว").then(() => {
        backToHome();
      });
    });
  };

  function handleConvert() {
    const tkcal = kcal * quantity;
    const gprotein = protein * quantity;
    const gfat = fat * quantity;
    const gsalt = salt * quantity;
    const gsugar = sugar * quantity;
    const gveg = veg * quantity;
    const gcarb = carb * quantity;
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
    console.log("per items", quantity);
    console.log("handleConvert called");
    console.log("updateNutrition", updateNutrition);
  }

  function updateStateNutrition() {
    setNutrition((prevNu) => ({
      ...prevNu,
      ach_kcal: prevNu.ach_kcal + updateNutrition.ach_kcal,
      ach_g: prevNu.ach_g + updateNutrition.ach_g,
      ach_protein: prevNu.ach_protein + updateNutrition.ach_protein,
      ach_fat: prevNu.ach_fat + updateNutrition.ach_fat,
      ach_salt: prevNu.ach_salt + updateNutrition.ach_salt,
      ach_sugar: prevNu.ach_sugar + updateNutrition.ach_sugar,
      ach_veg: prevNu.ach_veg + updateNutrition.ach_veg,
      ach_carb: prevNu.ach_carb + updateNutrition.ach_carb,
    }));
    if (nutrition) {
      setDone(true);
    }
    console.log("nutrition after setstate", nutrition);
  }

  function backToHome() {
    navigate("/");
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

  return (
    <div className={className}>
      <Link to="/myfood">
        <button className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center m-4">
          <FontAwesomeIcon icon={faArrowLeft} className="font-bold text-3xl" />
        </button>
      </Link>
      <div className="Text text-2xl">
        <h1 className="">
          <b>{name}</b>
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
      <div className="num">
        <div className="form-control w-full max-w-xs">
          <label className="label mt-4">
            <span className="label-text1 text-lg">จำนวน</span>
            <span className="label-text-alt text-lg">หน่วยตามที่บรรจุ</span>
          </label>
          <input
            type="text"
            min="1"
            placeholder="1"
            className="input input-bordered input-error w-full max-w-xs"
            value={Number(quantity)}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^0-9]/g, "");
              setQuantity(Number(newValue));
            }}
          />
          <br />
          <PieColor
            kcal={kcal * quantity}
            protein={protein * quantity}
            fat={fat * quantity}
            salt={salt * quantity}
            sugar={sugar * quantity}
            veg={veg * quantity}
            carb={carb * quantity}
          />
        </div>
      </div>
      <div className="cc">
        <Link to="/myfood">
          <div className="cancel">
            <button className="btn btn-error">Cancel</button>
          </div>
        </Link>
        <div className="confirm">
          <button className="btn btn-success" onClick={() => confirmAdd()}>
            Confirm Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default styled(Pastfood)`
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
  .num {
    font-size: calc(60% + 2vmin);
    padding: 0px 50px 50px 50px;
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
