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
    updateUserData();
  }, [userData.age]);


  const updateUserData = () => {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/users/PersonalInformations`;
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        gender: userData.gender,
        age: userData.age,
        weight: userData.weight,
        height: userData.height,
        bmi: userData.bmi
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Update successful: ", data);
      })
      .catch((error) => {
        console.error("Error updating user data: ", error);
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
          userData.bmi && <Complete />}
      </div>
    </>
  );
}
export default Register;
