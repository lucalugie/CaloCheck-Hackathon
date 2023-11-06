import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUsersInfo } from "../../Convert/userController";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Settings({ className }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserDataAndDispatch = async () => {
    try {
      await fetchUserData(dispatch);
      setInfoData({
        name: user.displayName,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        bmi: user.bmi,
        image: user.pictureUrl,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateUserDataAndDispatch = async (infoData) => {
    try {
      await updateUsersInfo(infoData, dispatch);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserDataAndDispatch();
  }, [user]);

  // findDefaultInfo(data.gender, data.age);
  //   const updatedUserGoals = {
  //     goals_kcal: kcal_total,
  //     goals_g: grams_total,
  //     goals_protein: g_gramsProtein,
  //     goals_fat: g_gramsFat,
  //     goals_salt: g_gramsSodium,
  //     goals_sugar: g_gramsSugar,
  //     goals_veg: g_gramsVeg,
  //     goals_carb: g_gramsCarb,
  //   };
  // useEffect(() => {
  //   console.log("setAlldefaultValue");
  //   setAlldefaultValue(data);
  // }, [data]);

  const [formData, setFormData] = useState({
    age: 0,
    height: 0,
    weight: 0,
    gender: "",
    bmi: 0,
  });
  const [error, setError] = useState("");
  const [mode, setMode] = useState("display");

  const [infoData, setInfoData] = useState({
    name: "",
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    bmi: 0,
    image: "",
  });

  const isButtonDisabled =
    !infoData.age ||
    !infoData.height ||
    !infoData.weight ||
    !infoData.gender ||
    !infoData.bmi;

  const handleSaveClick = () => {
    if (isButtonDisabled) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      confirm();
    }
  };

  function setINFO() {
    const bmi = calculateBMI(formData.weight, formData.height);
    setInfoData((prevInfoData) => ({
      ...prevInfoData,
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
      gender: formData.gender,
      bmi: bmi,
    }));
    // console.log("formData", formData);
    console.log("infoData", infoData);
  }

  function confirm() {
    Swal.fire({
      title: "ยืนยันการแก้ไข",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ตกลง",
    }).then((result) => {
      if (result.isConfirmed) {
        updateUserDataAndDispatch(infoData);
        Swal.fire("แก้ไขเรียบร้อยแล้ว").then(() => {
          setMode("display");
          console.log("infoData", infoData);
        });

        // add_food(newFood).then(() => {
        //   Swal.fire("เพิ่มเรียบร้อยแล้ว").then(() => {

        //   });
        // });
      }
    });
  }

  const handleCancelClick = () => {
    setInfoData({
      name: user.displayName,
      age: user.age,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      bmi: user.bmi,
      image: user.pictureUrl,
    });
    setError("");
    setMode("display");
  };

  const handleEditClick = () => {
    setFormData({
      age: infoData.age,
      height: infoData.height,
      weight: infoData.weight,
      gender: infoData.gender,
      bmi: infoData.bmi,
    });
    setMode("edit");
  };

  const handleHome = () => {
    navigate("/");
  };

  function calculateBMI(weight, height) {
    weight = parseFloat(weight);
    height = parseFloat(height);
    const BMI = weight / ((height * height) / 10000);
    console.log(BMI);
    const BMItoNumber = Number(parseFloat(BMI).toFixed(2));
    console.log(BMItoNumber);
    return BMItoNumber;
  }

  // useEffect(() => {
  //   const bmi = calculateBMI(infoData.weight, infoData.height);
  //   setFormData({ ...formData, bmi: bmi });
  //   console.log("BMI", formData);
  // }, [infoData]);

  useEffect(() => {
    setINFO();
    console.log("BMI", infoData);
  }, [formData]);

  return (
    <div className={className}>
      <div className="wrap">
        <div className="myinfocard flex items-center justify-center">
          <div className="card w-96 h-full bg-base-100">
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
                    src={infoData.image}
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
                          <p className="attribute-details">อายุ</p>
                        </div>
                      </div>
                      <div className="h-20 flex flex-col items-center">
                        <div className="box pt-4">
                          <p className="attribute font-bold capitalize">
                            {infoData.gender}
                          </p>
                          <p className="attribute-details">เพศ</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-0">
                      <div className="h-20 flex flex-col items-center">
                        <div className="box pt-4">
                          <p className="attribute font-bold">
                            {infoData.weight}
                          </p>
                          <p className="attribute-details">น้ำหนัก(kg.)</p>
                        </div>
                      </div>
                      <div className="h-20 flex flex-col items-center">
                        <div className="box pt-4">
                          <p className="attribute font-bold">
                            {infoData.height}
                          </p>
                          <p className="attribute-details">ส่วนสูง(cm.)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bmi font-bold">BMI: {infoData.bmi}</div>

                <div className="flex flex-row justify-center items-center mt-4">
                  <button
                    className="btn btn-outline btn-primary w-1/2 mr-2"
                    onClick={handleHome}
                  >
                    Home
                  </button>

                  <button
                    className="btn btn-primary w-1/2 ml-2"
                    onClick={handleEditClick} // Switch to edit mode when clicking the button
                  >
                    Edit
                  </button>
                </div>
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
                      value={infoData.gender}
                      onChange={(e) => {
                        setFormData({ ...formData, gender: e.target.value });
                        // setInfoData({ ...infoData, gender: e.target.value });
                      }}
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
                      placeholder={infoData.age}
                      value={infoData.age}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, age: Number(newValue) });
                        // setInfoData({ ...infoData, age: Number(newValue) });
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
                      placeholder={infoData.height}
                      value={infoData.height}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, height: Number(newValue) });
                        // setInfoData({ ...infoData, height: Number(newValue) });
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
                      placeholder={infoData.weight}
                      value={infoData.weight}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, weight: Number(newValue) });
                        // setInfoData({ ...infoData, weight: Number(newValue) });
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
                <div className="flex flex-row justify-center items-center mt-4">
                  <button
                    className="btn btn-error mr-2 w-1/2"
                    onClick={handleCancelClick}
                  >
                    cancel
                  </button>

                  <button
                    className={`btn btn-success w-1/2 ml-2 ${
                      isButtonDisabled ? "disabled" : ""
                    }`}
                    disabled={isButtonDisabled}
                    onClick={() => handleSaveClick()}
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
