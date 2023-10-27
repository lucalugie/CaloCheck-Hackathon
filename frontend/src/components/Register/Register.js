import React, { useState, useEffect } from "react";
import Complete from "./Complete";
import Gender from "./Gender";
import Bmi from "./Bmi";
import { findDefaultInfo, kcal_total } from "../../Convert/defaltFunction";

function Register() {
  const [userData, setUserData] = useState({
    gender: "",
    age: 0,
    weight: 0,
    height: 0,
    bmi: 0,
    cal: 0,
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
    // console.log("Before findDefaultInfo:", userData.cal);
    // findDefaultInfo(userData.gender, ageAsNumber);
    setUserData({
      ...userData,
      age: ageAsNumber,
      weight: weightAsNumber,
      height: heightAsNumber,
      bmi: bmiAsNumber,
      // cal: kcal_total,
    });
    setCurrentStep("Complete");
    addProsonalInfo();
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
        // cal: userData.cal,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
         <Complete />}
      </div>
    </>
  );
}
export default Register;
