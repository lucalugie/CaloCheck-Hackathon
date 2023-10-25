import React, { useState } from "react";
import styled from "styled-components";
import PieColor from "./Piedayly";
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const Pastfood = ({ className }) => {
  const { name, kcal, protein, fat, salt, sugar, veg, carb } = useParams();
  const [quantity, setQuantity] = useState(1); // เพิ่มสถานะเก็บจำนวน

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };
  return (
  <div className={className}>
     <Link to="/myfood">
        <button className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center m-4">
          <FontAwesomeIcon icon={faArrowLeft} className="font-bold text-3xl" />
        </button>
      </Link>
    <div className="Text">
      <h1>
        <b>{name}</b>
        {carb}
      </h1>
    </div>
    <div className="Nutritions text-accent">
      <h2>
        <b>Nutritions</b>
        </h2>
      <h1>
        <b>สารอาหาร</b>
      </h1>
    </div>
    <div className="num">

    <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text1">จำนวน</span>
            <span className="label-text-alt">หน่วยตามที่บรรจุ</span>
          </label>
          <input
           type="number"
           min="1"
            placeholder="1"
            className="input input-bordered input-error w-full max-w-xs"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <br/>
          <PieColor kcal={kcal* quantity}
  protein={protein* quantity}
  fat={fat* quantity}
  salt={salt* quantity}
  sugar={sugar* quantity}
  veg={veg* quantity}
  carb={carb* quantity}/>
        </div>
    </div>
  </div>
  
);};

export default styled(Pastfood)`
  .back {
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 10px 20px;
    font-size: calc(60% + 2vmin);
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
  .Nutritions h2{
    font-size: calc(60% + 1vmin);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }
  .Nutritions h1{
    font-size: calc(60% + 2vmin);
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .num {
    font-size: calc(60% + 2vmin);
    padding: 50px;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
