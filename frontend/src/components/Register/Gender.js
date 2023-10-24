import styled from "styled-components";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVenus,
  faMars,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function Gender({ className, data, onSubmit }) {
  const [selectedGender, setSelectedGender] = useState(data || "");

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
    console.log(gender);
  };

  const handleSubmit = (gender) => {
    onSubmit(gender);
    console.log(selectedGender);
  };


  return (
    <div className={className}>
      <Link to="/welcome">
       <button className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center m-4">
        <FontAwesomeIcon icon={faArrowLeft} className="font-bold text-3xl" />
      </button> 
      </Link>
      

      <div className="wrap w-full h-1/2">
        <div className="title flex flex-col justify-center items-center">
          <h1 className="font-bold text-2xl">For your best!</h1>
          <div className="text-center">
            <h2 className="text-xl text-center">
              เพื่อการคำนวณที่เหมาะสมต่อแคลอรี่และโภชนาการของคุณ
            </h2>
          </div>
          <h3 className="text-primary text-lg text-center">
            กรุณาบอกเราเกี่ยวกับตัวคุณสักนิด
          </h3>
        </div>

        {/* bottom */}
        <div className="flex justify-center items-center">
          <div
            className={`h-64 max-w-sm flex-grow card bg-secondary rounded-box place-items-center m-4 cursor-pointer justify-center items-center duration-100 ${
              selectedGender === "female" ? "selected" : ""
            }`}
            onClick={() => handleGenderSelection("female")}
          >
            <div className="flex flex-col justify-center items-center ">
              <FontAwesomeIcon icon={faVenus} className="font-bold text-8xl " />
              <h2 className="text-lg font-bold mt-2">Female</h2>
            </div>
          </div>

          <div
            className={`h-64 max-w-sm flex-grow card bg-accent rounded-box place-items-center m-4 cursor-pointer justify-center items-center duration-100 ${
              selectedGender === "male" ? "selected" : ""
            }`}
            onClick={() => handleGenderSelection("male")}
          >
            <div className="flex flex-col justify-center items-center ">
              <FontAwesomeIcon icon={faMars} className="font-bold text-8xl " />
              <h2 className="text-lg font-bold mt-2">Male</h2>
            </div>
          </div>
        </div>

        {/* bottom */}
        {selectedGender ? (
          <div className="flex row justify-center items-center">
            <button
              className="btn btn-primary w-1/3 max-w-xs"
              onClick={ () => handleSubmit(selectedGender)}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="flex row justify-center items-center">
            <button className="btn btn-primary w-1/3 max-w-xs" disabled>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default styled(Gender)`
  .selected {
    border: 3px solid #3490dc;
  }

  .disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

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
