import MyInfo from "./MyInfo";
import MyNutrition from "./MyNutrition";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  fetchUserGoals,
  fetchUserNutrition,
} from "../../Convert/userController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Home({ className }) {
  const user = useSelector((state) => state.user);
  const goals = useSelector((state) => state.goals);
  const nutri = useSelector((state) => state.nutrition);
  const dispatch = useDispatch();

  const fetchUserDataAndDispatch = async () => {
    console.log("UserDataFetch");
    try {
      await fetchUserData(dispatch);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserGoalsAndDispatch = async () => {
    console.log("UserGoalFetch");
    try {
      await fetchUserGoals(dispatch);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserNutritionAndDispatch = async () => {
    console.log("UserNutrition");
    try {
      await fetchUserNutrition(dispatch);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserDataAndDispatch();
  }, [user]);

  useEffect(() => {
    fetchUserGoalsAndDispatch();
  }, [goals]);

  useEffect(() => {
    fetchUserNutritionAndDispatch();

  }, [nutri]);




  return (
    <div className={className}>
      <MyNutrition />
      <MyInfo />
      <ButtonContainer>
        <div className="button">
          <Link to="/myfood">
            <button className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center">
              <FontAwesomeIcon icon={faPlus} className="font-bold text-3xl" />
            </button>
          </Link>
        </div>
      </ButtonContainer>
    </div>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  margin-bottom: 3rem;
`;

export default styled(Home)`
  .button {
    position: fixed;
    bottom: 60px;
  }
`;
