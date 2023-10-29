import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  kcal_total,
  grams_total,
  g_gramsVeg,
  g_gramsSodium,
  g_gramsCarb,
  g_gramsSugar,
  g_gramsFat,
  g_gramsProtein,
  findDefaultInfo,
} from "../../Convert/defaltFunction";

function Complete({ className, data }) {
  const [userGoals, setUserGoals] = useState({
    goals_kcal: 0,
    goals_g: 0,
    goals_protein: 0,
    goals_fat: 0,
    goals_salt: 0,
    goals_sugar: 0,
    goals_veg: 0,
    goals_carb: 0,
  });

  console.log("userGoals", userGoals);

  useEffect(() => {
    console.log("setAlldefaultValue");
    setAlldefaultValue(data);
  }, [data]);

  useEffect(() => {
    console.log("createdefaultNutrition");
    createdefaultNutrition();
  }, []);


  function setAlldefaultValue(data){
    findDefaultInfo(data.gender, data.age);
    const updatedUserGoals = {
      goals_kcal: kcal_total,
      goals_g: grams_total,
      goals_protein: g_gramsProtein,
      goals_fat: g_gramsFat,
      goals_salt: g_gramsSodium,
      goals_sugar: g_gramsSugar,
      goals_veg: g_gramsVeg,
      goals_carb: g_gramsCarb,
    };
    setUserGoals(updatedUserGoals);
    pushtobdGoals(updatedUserGoals);
  }

  const pushtobdGoals = (updatedUserGoals) => {
    console.log("Sending data to the server:", updatedUserGoals);
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/usersgoals/updategoals`,
        updatedUserGoals, 
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const createdefaultNutrition = () => {
    axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/usersnutrition`,
      {
        ach_kcal: 0,
        ach_g: 0,
        ach_protein: 0,
        ach_fat: 0,
        ach_salt: 0,
        ach_sugar: 0,
        ach_veg: 0,
        ach_carb: 0,
      }, 
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className={className}>
      <div className="wrap w-full h-1/2">
        <div className="title flex flex-col justify-center items-center text-center">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-7xl text-primary"
          />
          <h1 className="font-bold text-2xl mt-4">ALL DONE!</h1>
          <div className="text-center">
            <h2 className="text-xl ml-6 mr-6">
              ขอบคุณที่คุณไว้ใจให้เราเป็นส่วนหนึ่งในการช่วยดูแลคุณ
            </h2>
          </div>
          <h3 className="text-accent text-lg">
            เริ่มการบันทึกอาหารมื้อแรกของคุณได้เลย
          </h3>
        </div>
        <Link to="/">
          <div className="flex row justify-center items-center m-4">
            <button className="btn btn-primary w-1/3">Home</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default styled(Complete)`
  .wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
