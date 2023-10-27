import styled from "styled-components";
import React, { useState, useEffect } from "react";


function Settings({ className }) {



  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    bmi: "",
  });
  const [error, setError] = useState("");
  const [mode, setMode] = useState("display");
  const profilepath =
    "https://pub-static.fotor.com/assets/projects/pages/28dfdd1b67984fd095e368b7c603b7e4/600w/fotor-8883abdca0284d13a2542f8810bf8156.jpg";

  const isButtonDisabled =
    !formData.age ||
    !formData.height ||
    !formData.weight ||
    !formData.gender ||
    !formData.bmi;

  const [infoData, setInfoData] = useState({
    name: "Premey",
    age: 27,
    gender: "female",
    height: 160,
    weight: 75,
    bmi: 29.3,
    image:
      "https://pub-static.fotor.com/assets/projects/pages/28dfdd1b67984fd095e368b7c603b7e4/600w/fotor-8883abdca0284d13a2542f8810bf8156.jpg",
  });

  const handleSaveClick = () => {
    if (isButtonDisabled) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      setMode("display");
      setInfoData({
        ...infoData,
        age: formData.age,
        height: formData.height,
        weight: formData.weight,
        gender: formData.gender,
        bmi: formData.bmi,
      });
    }
  };

  const handleCancelClick = () => {
    setError("");
    setMode("display");
  };

  const handleEditClick = () => {
    const BMI = calculateBMI(infoData.weight, infoData.height);
    setFormData({
      age: infoData.age,
      height: infoData.height,
      weight: infoData.weight,
      gender: infoData.gender,
      bmi: BMI,
    });

    setMode("edit");
  };

  function calculateBMI(weight, height) {
    weight = parseFloat(weight);
    height = parseFloat(height);
    const BMI = weight / ((height * height) / 10000);
    return parseFloat(BMI).toFixed(2);
  }

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, []); //formdata

  return (
    <div className={className}>
      <div className="wrap">
        <div className="myinfocard flex items-center justify-center">
          <div className="card w-96 h-full bg-base-100 border-2 border-primary m-2 drop-shadow-md">
            {mode === "display" && (
              <div className="card-body items-center text-center">
                <h3 className="card-titletwo text-accent font-bold">MY INFO</h3>
                <h2
                  className="card-title font-bold"
                  style={{ lineHeight: "0" }}
                >
                  ข้อมูลส่วนตัว
                </h2>

                <figure className="w-24 h-24 mt-2">
                  <img
                    src={profilepath}
                    alt="Profile Image"
                    className="rounded-full w-full h-full"
                  />
                </figure>
                <h3 className="card-titlethree font-bold uppercase">
                  {infoData.name}
                </h3>

                {/* bottom part */}
                <div className="flex flex-col w-full">
                  <div className="custom-rounded-box bg-secondary">
                    <div className="grid grid-cols-2 gap-0">
                      <div className="h-20 flex flex-col items-center">
                        <div className="box pt-4">
                          <p className="attribute font-bold">{infoData.age}</p>
                          <p className="attribute-details">Age</p>
                        </div>
                      </div>
                      <div className="h-20 flex flex-col items-center">
                        <div className="box pt-4">
                          <p className="attribute font-bold capitalize">
                            {infoData.gender}
                          </p>
                          <p className="attribute-details">Gender</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-0">
                      <div className="h-20 flex flex-col items-center">
                        <div className="box pt-4">
                          <p className="attribute font-bold">
                            {infoData.weight}
                          </p>
                          <p className="attribute-details">Weight(kg.)</p>
                        </div>
                      </div>
                      <div className="h-20 flex flex-col items-center">
                        <div className="box pt-4">
                          <p className="attribute font-bold">
                            {infoData.height}
                          </p>
                          <p className="attribute-details">Height(cm.)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bmi font-bold">BMI: {infoData.bmi}</div>

                <button
                  className="btn btn-primary w-1/2 max-w-xs mt-4"
                  onClick={handleEditClick} // Switch to edit mode when clicking the button
                >
                  Edit Info
                </button>
              </div>
            )}

            {/* editmode */}

            {mode === "edit" && (
              <div className="card-body items-center text-center">
                <h3 className="card-titletwo text-accent font-bold">
                  EDIT MY INFO
                </h3>
                <h2
                  className="card-title font-bold"
                  style={{ lineHeight: "0" }}
                >
                  แก้ไขข้อมูลส่วนตัว
                </h2>

                {/* form */}
                <div className="boxwrap-editmode m-2 p-4">
                  <div className="box flex flex-row justify-center items-center m-4">
                    <select
                      className="select select-secondary w-full max-w-xs text-center font-bold text-xl mt-4"
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    >
                      <option value="female">หญิง</option>
                      <option value="male">ชาย</option>
                    </select>
                  </div>
                  <div className="box flex flex-row justify-center items-center m-4">
                    <div className="pr-4 font-bold text-xl text-center">
                      อายุ
                    </div>
                    <input
                      type="text"
                      placeholder={formData.age}
                      value={formData.age}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({
                          ...formData,
                          age: newValue,
                        });
                      }}
                      className="input input-bordered input-secondary w-1/3  max-w-xs text-center"
                    />
                    <div className="pl-4 font-bold text-xl text-center">ปี</div>
                  </div>
                  <div className="box flex flex-row justify-center items-center m-4">
                    <div className="pr-4 font-bold text-xl text-center">
                      ส่วนสูง
                    </div>
                    <input
                      type="text"
                      placeholder={formData.height}
                      value={formData.height}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, height: newValue });
                      }}
                      className="input input-bordered input-secondary w-1/3 max-w-xs text-center"
                    />
                    <div className="pl-4 font-bold text-xl text-center text-center">
                      cm.
                    </div>
                  </div>
                  <div className="box flex flex-row justify-center items-center m-4">
                    <div className="pr-4 font-bold text-xl text-center">
                      น้ำหนัก
                    </div>
                    <input
                      type="text"
                      placeholder={formData.weight}
                      value={formData.weight}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, weight: newValue });
                      }}
                      className="input input-bordered input-secondary w-1/3 max-w-xs text-center"
                    />
                    <div className="pl-4 font-bold text-xl text-center">
                      kg.
                    </div>
                  </div>
                </div>
                {error && <div className="text-red-500">{error}</div>}

                {/* form */}
                <div className="flex flex-row">
                  <button
                    className="btn btn-error mr-2"
                    onClick={handleCancelClick}
                  >
                    cancel
                  </button>

                  <button
                    className={`btn btn-success w-1/2 ml-2 ${
                      isButtonDisabled ? "disabled" : ""
                    }`}
                    disabled={isButtonDisabled}
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default styled(Settings)`
  .custom-rounded-box {
    border-radius: 15px;
    overflow: hidden;
  }
  .attribute {
    font-size: x-large;
  }
  .attribute-details {
    line-height: 0;
    font-weight: bold;
  }
  .bmi {
    font-size: x-large;
  }
  .disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .myinfocard {
    margin-bottom: 100px;
  }
`;
