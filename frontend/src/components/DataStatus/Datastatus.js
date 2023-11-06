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
  //pimadded
  const [previousData, setPreviousData] = useState(0);
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
  //pimadded not finish
  // if(Data.length>0)
  // {
  //   if(Data.length > 0)
  //     {
  //         Data.forEach((data) => {
  //           for (let i = 0; i < Data.length; i++)
  //           {
  //             setPreviousData(data.idfood);
  //             if(data.idfood === previousData)
  //             {
  //               console.log("same "+data.name);
  //               data.per_items = data.per_items + 1;
  //             }
  //             else
  //             {
  //               console.log("different "+data.name);
  //               return
  //             }
  //           }
  //         }
  //         )
  //       }
  //     }
  // Data.map((data) =>
  // {
  //   console.log("Datafood");
  //   console.log(data.idfood+" "+data.per_items);
  //   }
  // )

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
                <>
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
                      {/*pimadded*/} {/* lugie modify */}
                      {Data.map((data, index) => {
                        return (
                          <tr key={data.idfood}>
                            <td>{index + 1}</td>
                            <td>{data.name}</td>
                            <td>{data.per_items}</td>
                            <td>{data.kcal}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {/* lugie modify */}
                  <div className="mt-4 mb-40">
                    <PieAll />
                  </div>
                </>
              ) : (
                <div className="text-center font-bold">
                  ไม่มีรายการอาหารของวันนี้
                </div>
              )}
              <br />
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
