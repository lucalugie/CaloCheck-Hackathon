import React, { useState } from "react";
import styled from "styled-components";
import PieAll from "./Pieall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
//lugie modify
import { fetchUserNutritionByDate } from "../../Convert/userController";
import { useDispatch } from "react-redux";

const Datastatus = ({ className, day, month, year }) => {
  const [Data, setData] = useState([]);
  //lugie modify
  const dispatch = useDispatch();

  useEffect(() => {
    setData([]);
    var requestOptions = {
      credentials: "include",
    };

    fetch(
      `${process.env.REACT_APP_BASE_URL}/Calendars/foods?createdAt=${year}-${month}-${day}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.length > 0) {
          result.forEach((element) => {
            getFood(element.idfood);
          });
        } else {
          console.log("no data");
        }
      });
  }, [`${year}-${month}-${day}`]);

  const getFood = (result) => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}/foodnutrition/foods/?idfood=${result}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setData((prevData) => {
          return [...prevData, ...result];
        });
      });
  };

  // lugie modify
  const fetchUserNutrition = async (year, month, day) => {
    console.log("UserNutrition");
    try {
      await fetchUserNutritionByDate(dispatch, year, month, day);
    } catch (error) {
      console.error("Error fetching NutritionByDate:", error);
    }
  };
  useEffect(() => {
    fetchUserNutrition(year, month, day);
  }, [year, month, day]);

  return (
    <>
      <div className={className}>
        <div className="data">
          <div className="form-control w-full max-w-xs">
            <div className="overflow-x-auto">
              <div className="Text text-center flex flex-col justify-center items-center mb-6">
                <h3 className="card-titletwo text-accent font-bold text-center">
                  FOOD LISTS
                </h3>
                <h2 className="card-title font-bold text-center leading-none">
                  <FontAwesomeIcon
                    icon={faUtensils}
                    style={{ marginRight: "0.25rem" }}
                  />
                  รายการอาหาร
                </h2>
              </div>

              {/* row 1 */}
              {Data.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>ชื่ออาหาร</th>
                      <th>จำนวน</th>
                      <th>Kcal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Data.map((data) => (
                      <tr key={data.idfood}>
                        <th>{data.idfood}</th>
                        <td>{data.name}</td>
                        <td>{data.per_items}</td>
                        <td>{data.kcal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center font-bold">
                  ไม่มีรายการอาหารของวันนี้
                </div>
              )}
              <br />
              {/* lugie modify */}
              <div className="mt-4 mb-40">
                <PieAll />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default styled(Datastatus)`
  .data {
    font-size: calc(60% + 2vmin);
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .Text h1 {
    font-size: calc(60% + 2vmin);
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
  }
`;
