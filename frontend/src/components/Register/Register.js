import React, { useState, useEffect } from "react";
import Complete from "./Complete";
import Gender from "./Gender";
import Bmi from "./Bmi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


function Register() {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    gender: "",
    age: 0,
    weight: 0,
    height: 0,
    bmi: 0,
  });
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


  const [currentStep, setCurrentStep] = useState("Gender");

  const handleGenderSubmit = (gender) => {
    setUserData({ ...userData, gender });
    setCurrentStep("Bmi");
  };

  const handleBmiSubmit =  (age, weight, height) => {
    const ageAsNumber = parseInt(age, 10);
    const bmiAsNumber = parseFloat(calculateBMI(weight, height), 10);
    const weightAsNumber = parseInt(weight, 10);
    const heightAsNumber = parseInt(height, 10);
      setUserData({
      ...userData,
      age: ageAsNumber,
      weight: weightAsNumber,
      height: heightAsNumber,
      bmi: bmiAsNumber,
    });
    createdefaultNutrition();
    createdefaultValuedb();
  };

  const handleEditStep = (step) => {
    setCurrentStep(step);
  };

  function calculateBMI(weight, height) {
    weight = parseFloat(weight);
    height = parseFloat(height);
    const BMI = weight / ((height * height) / 10000);
    return parseFloat(BMI).toFixed(2);
  }
  

  const createdefaultValuedb = () => {
    console.log("Sending defaultValuedb:");
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/usersgoals/goalsdefault`,
        userGoals,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        setCurrentStep("Complete");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createdefaultNutrition = () => {
    console.log("createdefaultNutrition");
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
  };


  // function setAlldefaultValue(){
  //   findDefaultInfo(userData.gender, userData.age);
  //   const updatedUserGoals = {
  //     goals_kcal: kcal_total,
  //     goals_g: grams_total,
  //     goals_protein: g_gramsProtein,
  //     goals_fat: g_gramsFat,
  //     goals_salt: g_gramsSodium,
  //     goals_sugar: g_gramsSugar,
  //     goals_veg: g_gramsVeg,
  //     goals_carb: g_gramsCarb,
  //   };
  //   setUserGoals(updatedUserGoals);
  //   pushtobdGoals(updatedUserGoals);
  // }

  // const pushtobdGoals = (updatedUserGoals) => {
  //   console.log("Sending data to the server:", updatedUserGoals);
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_BASE_URL}/usersgoals/goalsdefault`,
  //       updatedUserGoals, 
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  return (
    <>
      <div>
        {currentStep === "Gender" && (
          <Gender data={userData.gender} onSubmit={handleGenderSubmit} />
        )}
        {currentStep === "Bmi" && userData.gender && (
          <Bmi
            dataage={userData.age}
            dataweight={userData.weight}
            dataheight={userData.height}
            onSubmit={handleBmiSubmit}
            onEdit={() => handleEditStep("Gender")}
          />
        )}
        {currentStep === "Complete" &&
          userData.gender &&
          userData.age &&
          userData.weight &&
          userData.height &&
          userData.bmi && <Complete gender={userData.gender} age={userData.age} weight={userData.weight} height={userData.height} bmi={userData.bmi} data={userData}/>}
      </div>
    </>
  );
}
export default Register;
