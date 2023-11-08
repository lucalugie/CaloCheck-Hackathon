import React, { useState } from "react";
import styled from "styled-components";
import PieAll from "./Pieall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
//lugie modify
import { fetchUserNutritionByDate } from "../../Convert/userController";
import { useDispatch } from "react-redux";
import { AspectRatio } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Datastatus = ({ className, day, month, year }) => {
  //pimadded
  const [Data, setData] = useState([]);

  //lugie modify
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData([]);
    var requestOptions = {
      credentials: "include",
    };
    setLoading(true);

    fetch(
      `${process.env.REACT_APP_BASE_URL}/Calendars/foods?createdAt=${year}-${month}-${day}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.length > 0) {
          getFood(result);
          setLoading(false);
        } else {
          console.log("no data");
          setLoading(false);
        }
      });
  }, [`${year}-${month}-${day}`]);

  const getFood = async (arr) => {
    let temp = [];
    await Promise.all(
      arr.map(async (item) => {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/foodnutrition/foods/?idfood=${item.idfood}`,
          {
            credentials: "include",
          }
        );
        const result = await response.json();
        temp.push(result[0]);
      })
    );
    setData(prepareData(temp));
  };

  //pimadded

  function prepareData(_) {
    const countData = [];
    const newData = [];

    for (const item of _) {
      const foundItem = countData.find((entry) => entry.idfood === item.idfood);
      if (foundItem) {
        foundItem.count++;
      } else {
        countData.push({
          idfood: item.idfood,
          skuu: item.sku,
          name: item.name,
          count: 1,
          kcal: item.kcal,
        });
      }
    }

    countData.forEach((entry) => {
      newData.push({
        idfood: entry.idfood,
        skuu: entry.skuu,
        name: entry.name,
        per_items: entry.count,
        kcal: entry.kcal * entry.count,
      });
    });

    return newData;
  }

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

  const handleRowClick = (data) => {
    console.log(`Row clicked: ${data.name}`);
    navigate(`/myfood/Showfood/${data.idfood}`);
  };

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

              {loading ? (
                <>
                  <div className="wrap w-full h-1/2 mt-32">
                    <div className="flex flex-row justify-center items-center h-full">
                      <span className="loading loading-ball loading-xs text-success"></span>
                      <span className="loading loading-ball loading-sm text-primary"></span>
                      <span className="loading loading-ball loading-md text-accent"></span>
                      <span className="loading loading-ball loading-lg text-secondary"></span>
                    </div>
                  </div>
                </>
              ) : Data.length > 0 ? (
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
                      {Data.map((data, index) => {
                        return (
                          <tr
                            key={data.index}
                            onClick={() => handleRowClick(data)}
                            className="cursor-pointer"
                          >
                            <td>{index + 1}</td>
                            <td>{data.name}</td>
                            <td>{data.per_items}</td>
                            <td>{data.kcal}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
