import Footer from "../Footer";
import Navbar from "../Navbar";
import MyInfo from "./MyInfo";
import MyNutrition from "./MyNutrition";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Home({ className }) {
  return (
    <div className={className}>
      <Navbar />
      <MyNutrition />
      <MyInfo />
      <ButtonContainer>
        <button className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center">
          <FontAwesomeIcon icon={faPlus} className="font-bold text-3xl" />
        </button>
      </ButtonContainer>
      <Footer />
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
