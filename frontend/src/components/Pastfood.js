import React from "react";
import styled from "styled-components";
import PieColor from "./Piedayly";

const Pastfood = ({ className }) => (
  <div className={className}>
    <div className="back">
      <button class="btn btn-active btn-secondary">⬅back</button>
    </div>
    <div className="Text">
      <h1>
        <b>ข้าวสวยหอมมะลิตราอีซี่โก</b>
      </h1>
    </div>
    <div className="Nutritions">
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
          />
          <br/>
          <PieColor />
        </div>
    </div>
  </div>
  
);

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
    color: #2baf2b;
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
