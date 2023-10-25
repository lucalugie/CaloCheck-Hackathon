import React, { useState, useEffect } from "react";
import Complete from "./Complete";
import Gender from "./Gender";
import Bmi from "./Bmi";

function Register() {
  const [userData, setUserData] = useState({
    gender: "",
    age: "",
    weight: "",
    height: "",
    bmi: "",
  });

  const [currentStep, setCurrentStep] = useState("Gender");

  const handleGenderSubmit = (gender) => {
    setUserData({ ...userData, gender });
    setCurrentStep("Bmi");
  };

  const handleBmiSubmit = (age, weight, height) => {
    const bmi = calculateBMI(weight, height);
    setUserData({ ...userData, age, weight, height, bmi });
    setCurrentStep("Complete");
    // submit the data to the database.
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
  }, [userData]);

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
          userData.bmi && <Complete />}
      </div>
    </>
  );
}
export default Register;
