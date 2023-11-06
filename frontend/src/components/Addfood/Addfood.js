import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Addfood = ({ className }) => {
  return (
    <div className={className}>
      <Link to="/myfood">
        <button className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center m-4">
          <FontAwesomeIcon icon={faArrowLeft} className="font-bold text-3xl" />
        </button>
      </Link>

      <div className="cc">
        <div className="flex justify-center items-center mt-24 mb-24">
          <div className="card w-96 bg-base-100 shadow-xl mx-4">
            <figure className="px-5 pt-10">
              <img
                src="../img/cooking.jpg"
                alt="Cooking"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">ปรุงเอง</h2>
              <p>คุณปรุงอาหารทานเอง ?</p>
              <div className="card-actions">
                <Link to="/myfood/Addfood/Cookfood">
                  <button className="btn btn-primary">Cooking</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl mx-4">
            <figure className="px-5 pt-10">
              <img
                src="../img/foodshop.jpg"
                alt="Foodshop"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">ซื้อมา</h2>
              <p>คุณซื้ออาหารมาทาน ?</p>
              <div className="card-actions">
                <Link to="/myfood/Addfood/Buyfood">
                  <button className="btn btn-secondary">Shopping</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default styled(Addfood)`
  .button {
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 10px 20px;
    font-size: calc(60% + 2vmin);
  }
  .cc {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;
