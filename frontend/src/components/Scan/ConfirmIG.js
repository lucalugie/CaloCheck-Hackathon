import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";

function ConfirmIG({ className, url, nameOFFood }) {
  const aiPage = useSelector((state) => state.aiPage);
  console.log("aiPage", aiPage.name);

  //lugie modify
  const [food, setFood] = useState({});
  const fetchFood = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/foodnutrition/findfood/${id}`
      );
      console.log("Get food data complete");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const showDetails = async () => {
    try {
      if (aiPage.name === "ผัดกระเพรา") {
        console.log(aiPage.name);
        const food = await fetchFood(2067);
        setFood(food);
        console.log("Success food:", food);
      } else if (aiPage.name === "ไข่เจียว") {
        console.log(aiPage.name);
        const food = await fetchFood(2068);
        setFood(food);
        console.log("Success food:", food);
      }
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  };

  useEffect(() => {
    console.log("called");
    showDetails();
  }, [aiPage]);

  return (
    <>
      {aiPage.loading ? (
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
      ) : (
        <div className={className}>
          <div className="wrap w-full h-1/2">
            <div className="card w-96 bg-base-100 ">
              <figure className="px-10 pt-10">
                <img src={aiPage.url || "/logo/SORRY.png"} alt="Food" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{aiPage.name}</h2>
                <div className="card-actions">
                  {aiPage.url === "" ? (
                    <>
                       <p>ช่วยบอกชื่อของอาหารได้ไหม กดปุ่มสีเขียวเลย!</p>
                        <div className="w-full flex flex-row gap-10 justify-center items-center">
                          <Link to="/ai-scan">
                            <button className="btn btn-error">try again</button>
                          </Link>
                          <Link to="/sendName">
                            <button className="btn btn-success">Send Name</button>
                          </Link>
                        </div>  
                    </>
                  ) : (
                    <>
                      <Link to="/ig-scan">
                        <button className="btn btn-error">try again</button>
                      </Link>

                      <Link
                        to={`/myfood/Pastfood/${food.idfood}/${food.name}/${food.kcal}/${food.per_items}/${food.per_protein}/${food.per_fat}/${food.per_salt}/${food.per_sugar}/${food.per_veg}/${food.per_carb}`}
                      >
                        <button className="btn btn-success">details</button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default styled(ConfirmIG)`
  .wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-items: center;
  }
`;
