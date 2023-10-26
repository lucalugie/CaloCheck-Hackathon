import MyInfo from "./MyInfo";
import MyNutrition from "./MyNutrition";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";



function Home({ className }) {
  const infoDemoData = {
    name: "Premey",
    age: 27,
    gender: "female",
    height: 160,
    weight: 75,
    bmi: 29.3,
    image:
      "https://pub-static.fotor.com/assets/projects/pages/28dfdd1b67984fd095e368b7c603b7e4/600w/fotor-8883abdca0284d13a2542f8810bf8156.jpg",
  };

  const nutritionDemoData = {
    goals: 392,
    achieve: 275,
    left: 117,
    exceed: 0,
    goals_protein: 70,
    goals_fat: 44,
    goals_salt: 23,
    goals_sugar: 25,
    goals_veg: 5,
    goals_carb: 225,
    ach_protein: 0,
    ach_fat: 5,
    ach_salt: 10,
    ach_sugar: 23,
    ach_veg: 4,
    ach_carb: 195,
  };




  return (
    <div className={className}>
      <MyNutrition nutritionData={nutritionDemoData} />
      <MyInfo infoData={infoDemoData} />
      <ButtonContainer>
        <Link to="/myfood">
          <button className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center">
            <FontAwesomeIcon icon={faPlus} className="font-bold text-3xl" />
          </button>
        </Link>
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

export default styled(Home)``;
