import styled from "styled-components";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVenus,
  faMars,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function Gender({ className }) {
  
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <div className={className}>
      <button className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center m-4">
        <FontAwesomeIcon icon={faArrowLeft} className="font-bold text-3xl" />
      </button>

      <div className="title flex flex-col justify-center items-center mt-20">
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
      <div className="flex flex-row justify-center items-center">
        <div
          className={`card w-64 bg-secondary m-4 cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          }`}
          onClick={() => handleGenderSelection("female")}
        >
          <figure className="px-6 pt-6">
            <FontAwesomeIcon icon={faVenus} className="font-bold text-8xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="text font-bold text-lg">Female</h2>
          </div>
        </div>

        <div
          className={`card w-64 bg-accent m-4 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          }`}
          onClick={() => handleGenderSelection("male")}
        >
          <figure className="px-6 pt-6">
            <FontAwesomeIcon icon={faMars} className="font-bold text-8xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="text font-bold text-lg">Male</h2>
          </div>
        </div>
      </div>

      {/* bottom */}
      {selectedGender ? (
        <Link to="/bmi">
          <div className="flex row justify-center items-center">
            <button className="btn btn-primary w-1/3 max-w-xs">Next</button>
          </div>
        </Link>
      ) : (
        <div className="flex row justify-center items-center">
          <button className="btn btn-primary w-1/3 max-w-xs" disabled>
            Next
          </button>
        </div>
      )}
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
`;
