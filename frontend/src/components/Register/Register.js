import React, { useState, useEffect } from "react";
import Complete from "./Complete";
import Gender from "./Gender";
import Bmi from "./Bmi";
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
     setCurrentStep("Complete");
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
          userData.bmi && <Complete gender={userData.gender} age={userData.age} weight={userData.weight} height={userData.height} bmi={userData.bmi}/>}
      </div>
    </>
  );
}
export default Register;
