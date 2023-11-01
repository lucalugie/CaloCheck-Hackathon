import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Bmi({ className, dataage, dataheight, dataweight, onSubmit, onEdit }) {
  const [age, setAge] = useState(dataage || 0);
  const [height, setHeight] = useState(dataheight || '');
  const [weight, setWeight] = useState(dataweight || '');
  const [error, setError] = useState("");

  const isButtonDisabled = !age || !height || !weight;

  const handleNextClick = (newage, newweight, newheight) => {
    if (isButtonDisabled) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      handleSubmit(newage, newweight, newheight);
    }
  };

  const handleSubmit = (newage, newweight, newheight) => {
    onSubmit(newage, newweight, newheight);
  };
  return (
    <div className={className}>
      <button
        className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center m-4"
        onClick={onEdit}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="font-bold text-3xl" />
      </button>

      <div className="wrap w-full h-1/2">
        <div className="title flex flex-col justify-center items-center">
          <h1 className="font-bold text-2xl">For your best!</h1>
          <div className="text-center">
            <h2 className="text-xl">
              เพื่อการคำนวณที่เหมาะสมต่อแคลอรี่และโภชนาการของคุณ
            </h2>
          </div>
          <h3 className="text-primary text-lg text-center">
            กรุณาบอกเราเกี่ยวกับตัวคุณสักนิด
          </h3>
        </div>

        {/* form */}
        <div className="boxwrap flex flex-col justify-center items-center m-5">
          <div className="box flex flex-row justify-center items-center ">
            <div className="pr-4 font-bold text-xl text-center">อายุ</div>
            <input
              type="text"
              placeholder="0"
              value={age}
              onChange={(e) => {
                const newValue = e.target.value.replace(/[^0-9]/g, "");
                setAge(newValue);
              }}
              className="input input-bordered input-secondary w-1/4 max-w-xs text-center"
            />
            <div className="pl-4 font-bold text-xl text-center">ปี</div>
          </div>
          <div className="box flex flex-row justify-center items-center ">
            <div className="pr-4 font-bold text-xl text-center">ส่วนสูง</div>
            <input
              type="number"
              placeholder="0"
              value={height}
              onChange={(e) => {
                const newValue = e.target.value.replace(/[^0-9]/g, "");
                setHeight(newValue);
              }}
              className="input input-bordered input-secondary w-1/4 max-w-xs text-center"
            />
            <div className="pl-4 font-bold text-xl text-center text-center">
              cm.
            </div>
          </div>
          <div className="box flex flex-row justify-center items-center">
            <div className="pr-4 font-bold text-xl text-center">น้ำหนัก</div>
            <input
              type="number"
              placeholder="0"
              value={weight}
              onChange={(e) => {
                const newValue = e.target.value.replace(/[^0-9]/g, "");
                setWeight(newValue);
              }}
              className="input input-bordered input-secondary w-1/4 max-w-xs text-center"
            />
            <div className="pl-4 font-bold text-xl text-center">kg.</div>
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}

        {/* form */}
        <div className="flex row justify-center items-center">
          <button
            className={`btn btn-success w-1/3 ${
              isButtonDisabled ? "disabled" : ""
            }`}
            disabled={isButtonDisabled}
            onClick={() => handleNextClick(age, weight, height)}
          >
            complete
          </button>
        </div>
      </div>
    </div>
  );
}

export default styled(Bmi)`
  .box {
    margin: 10px;
  }

  .disabled {
    cursor: not-allowed;
    opacity: 0.6;
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
