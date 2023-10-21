import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Complete({ className }) {
  return (
    <div className={className}>
      <Link to="/bmi">
        <button className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center m-4">
          <FontAwesomeIcon icon={faArrowLeft} className="font-bold text-3xl" />
        </button>
      </Link>

      <div className="container flex flex-col justify-center">
        <div className="title flex flex-col justify-center items-center mt-20 text-center">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-7xl text-primary"
          />
          <h1 className="font-bold text-2xl mt-4">ALL DONE!</h1>
          <div className="text-center">
            <h2 className="text-xl ml-6 mr-6">
              ขอบคุณที่คุณไว้ใจให้เราเป็นส่วนหนึ่งในการช่วยดูแลคุณ
            </h2>
          </div>
          <h3 className="text-accent text-lg">
            เริ่มการบันทึกอาหารมื้อแรกของคุณได้เลย
          </h3>
        </div>
        <Link to="/">
          <div className="flex row justify-center items-center m-4">
            <button className="btn btn-primary w-1/3">Home</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default styled(Complete)`
  .container {

  }
`;
