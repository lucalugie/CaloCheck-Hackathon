import MyInfo from "./MyInfo";
import MyNutrition from "./MyNutrition";
import React, {useEffect, useState} from "react";
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
      setUserData({
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

  const fetchUserGoalsAndDispatch = async () => {
    console.log("UserGoalFetch");
    try {
      await fetchUserNutrition(dispatch);
      setUserGoals({
        goals_kcal: goals.goals_kcal,
        goals_g: goals.goals_g,
        goals_protein: goals.goals_protein,
        goals_fat: goals.goals_fat,
        goals_salt: goals.goals_salt,
        goals_sugar: goals.goals_sugar,
        goals_veg: goals.goals_veg,
        goals_carb: goals.goals_carb,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserNutritionAndDispatch = async () => {
    console.log("UserNutrition");
    try {
      await fetchUserGoals(dispatch);
      setUserNutrition({
        ach_kcal: nutri.ach_kcal,
        ach_g: nutri.ach_g,
        ach_protein: nutri.ach_protein,
        ach_fat: nutri.ach_fat,
        ach_salt: nutri.ach_salt,
        ach_sugar: nutri.ach_sugar,
        ach_veg: nutri.ach_veg,
        ach_carb: nutri.ach_carb,
      });
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

  const [userData, setUserData] = useState({
    name: "",
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    bmi: 0,
    image: "",
  });

  const [userGoals, setUserGoals] = useState({
    goals_kcal: 0,
    goals_g: 0,
    goals_protein: 0,
    goals_fat: 0,
    goals_salt: 0,
    goals_sugar: 0,
    goals_veg: 0,
    goals_carb: 0,
  });

  const [userNutrition, setUserNutrition] = useState({
    ach_kcal: 0,
    ach_g: 0,
    ach_protein: 0,
    ach_fat: 0,
    ach_salt: 0,
    ach_sugar: 0,
    ach_veg: 0,
    ach_carb: 0,
  });

  return (
    <div className={className}>
      <MyNutrition nutritionData={userNutrition} goalsData={userGoals}/>
      <MyInfo infoData={userData} />
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
