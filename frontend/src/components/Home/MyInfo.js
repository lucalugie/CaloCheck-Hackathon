import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

function Myinfo({ className }) {
  const user = useSelector((state) => state.user);

  const [infoData, setInfoData] = useState({
    name: "",
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    bmi: 0,
    image: "",
  });

  useEffect(() => {
    setInfoData({
      name: user.displayName,
      age: user.age,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      bmi: user.bmi,
      image: user.pictureUrl,
    });
  }, [user]);

  return (
    <div className={className}>
      <div className="myinfocard">
        <div className="card w-96 bg-base-100">
          <div className="card-body items-center text-center">
            <h3 className="card-titletwo text-accent font-bold">MY INFO</h3>
            <h2 className="card-title font-bold" style={{ lineHeight: "0" }}>
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
                      <p className="attribute font-bold">{infoData.weight}</p>
                      <p className="attribute-details">น้ำหนัก(kg.)</p>
                    </div>
                  </div>
                  <div className="h-20 flex flex-col items-center">
                    <div className="box pt-4">
                      <p className="attribute font-bold">{infoData.height}</p>
                      <p className="attribute-details">ส่วนสูง(cm.)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bmi font-bold">BMI: {infoData.bmi}</div>
            {/* bottom part */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default styled(Myinfo)`
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
  .myinfocard {
    display: flex;
    justify-content: center;
  }
`;
