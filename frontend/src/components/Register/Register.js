import React, { useState, useEffect } from "react";
import Complete from "./Complete";
import Gender from "./Gender";
import Bmi from "./Bmi";
import axios from "axios";

function Register() {
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

  const handleBmiSubmit = (age, weight, height) => {
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
    setCurrentStep("Complete");
    addProsonalInfo();
    createdefaultValuedb();
  };

  const handleEditStep = (step) => {
    setCurrentStep(step);
    console.log(currentStep);
  };

  function calculateBMI(weight, height) {
    weight = parseFloat(weight);
    height = parseFloat(height);
    const BMI = weight / ((height * height) / 10000);
    return parseFloat(BMI).toFixed(2);
  }

  useEffect(() => {
    console.log("Updated userData:", userData);
    addProsonalInfo();
  }, [userData]);

  const addProsonalInfo = () => {
    console.log("Sending data to the server:", userData);
    fetch(`${process.env.REACT_APP_BASE_URL}/users/PersonalInformations`, {
      method: "PUT", // เปลี่ยน method เป็น PUT
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        gender: userData.gender,
        age: userData.age,
        weight: userData.weight,
        height: userData.height,
        bmi: userData.bmi,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const createdefaultValuedb = () => {
    console.log("Sending defaultValuedb:", userGoals);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          userData.bmi &&
         <Complete data={userData}/>}
      </div>
    </>
  );
}
export default Register;
