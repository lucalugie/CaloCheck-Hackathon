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
  });

  const [currentStep, setCurrentStep] = useState("Gender");

  const handleGenderSubmit = (gender) => {
    setUserData({ ...userData, gender });
    setCurrentStep("Bmi");
  };

  const handleBmiSubmit = (age, weight, height) => {
    setUserData({ ...userData, age, weight, height });
    console.log(currentStep);
    setCurrentStep("Complete");
    // submit the data to the database.
  };

  const handleEditStep = (step) => {
    setCurrentStep(step);
    console.log(currentStep);
  };

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
        {currentStep === "Complete" &&userData.gender &&
          userData.age &&
          userData.weight &&
          userData.height && <Complete />}
      </div>
    </>
  );
}
export default Register;
