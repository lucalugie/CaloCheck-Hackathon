import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PieColor from "./Piedayly";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { fetchFood } from "../FoodController/foodController";

const Showfood = ({ className }) => {
  //lugie modify****
  const { idfood } = useParams();

  const [nutrition, setNutrition] = useState({
    per_items: 0,
    name: "",
    kcal: 0,
    per_carb: 0,
    per_fat: 0,
    per_protein: 0,
    per_veg: 0,
    per_sugar: 0,
    per_salt: 0,
  });

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const response = await fetchFood(idfood);
        console.log("response", response);
        setNutrition(response);
        console.log("nutrition", nutrition);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchNutritionData();
  }, [idfood]);

  return (
    <div className={className}>
      <Link to="/datastatus">
        <button className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center m-4">
          <FontAwesomeIcon icon={faArrowLeft} className="font-bold text-3xl" />
        </button>
      </Link>
      <div className="Text text-2xl">
        <h1 className="">
          <b>{nutrition.name}</b>
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
            <span className="label-text1 text-lg">
              {nutrition.per_items} จาน
            </span>
          </label>
          <br />
          <PieColor
            kcal={nutrition.kcal}
            protein={nutrition.per_protein}
            fat={nutrition.per_fat}
            salt={nutrition.per_salt}
            sugar={nutrition.per_sugar}
            veg={nutrition.per_veg}
            carb={nutrition.per_carb}
          />
        </div>
      </div>
    </div>
  );
};

export default styled(Showfood)`
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
`;
