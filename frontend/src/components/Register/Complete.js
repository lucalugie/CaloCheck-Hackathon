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
//Add
import API from "../../constant/API";
import { useDispatch } from "react-redux";
import { setType, setAge, setGender, setWeight, setHeight, setBmi } from "../../store/userSlice";


// function Complete({ className, data }) {
  // const [userGoals, setUserGoals] = useState({
  //   goals_kcal: 0,
  //   goals_g: 0,
  //   goals_protein: 0,
  //   goals_fat: 0,
  //   goals_salt: 0,
  //   goals_sugar: 0,
  //   goals_veg: 0,
  //   goals_carb: 0,
  // });

function Complete({ className, gender, age, weight, height, bmi,data }) {
  const dispatch = useDispatch();
  const updateUserData = () => {
    fetch(API.updateUser, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        gender: gender,
        age: age,
        weight: weight,
        height: height,
        bmi: bmi
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setBmi(data.member.bmi));
        dispatch(setHeight(data.member.height));
        dispatch(setWeight(data.member.weight));
        dispatch(setGender(data.member.gender));
        dispatch(setAge(data.member.age));
      })
      .catch((error) => {
        console.error("Error updating user data");
      });
  };

  useEffect(() => {
   updateUserData(); 
  },[])


    //-----------------
    useEffect(() => {
      console.log("setAlldefaultValue");
      setAlldefaultValue(data);
    }, [data]);

    function setAlldefaultValue(data) {
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
      // setUserGoals(updatedUserGoals);
      const pushtobdGoals = () => {
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
      };
      pushtobdGoals();
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
        <Link onClick={() => dispatch(setType("login"))} to="/">
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
