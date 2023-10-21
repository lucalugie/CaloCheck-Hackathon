import React from "react";
import styled from "styled-components";
import PieColor from "./Piedayly";

const Todayfood = ({ className }) => (
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
    <div className="data">

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
        <div className="dayly">
      <h1>
        <b>เป้าหมายรายวัน</b>
      </h1>
      <br/>
      <h2>รวม</h2>
      <progress className="progress progress-success w-5rem" value="40" max="100"></progress>
      <h3>40%</h3>
    </div>
    <div className="daylylist">
    <div className="dayly grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 gap-y-6 sm:gap-y-10 w-5rem">
  <div className="list">
    <h2>คาร์โบไฮเดรต</h2>
    <progress className="progress progress-accent    " value="80" max="100" ></progress>
    <h3>40%</h3>
  </div>
  <div className="list">
    <h2>น้ำตาล</h2>
    <progress className="progress progress-secondary  " value="35" max="100"></progress>
    <h3>35%</h3>
  </div>
  <div className="list">
    <h2>โปรตีน</h2>
    <progress className="progress progress-error  " value="50" max="100"></progress>
    <h3>50%</h3>
  </div>
  <div className="list">
    <h2>ผัก</h2>
    <progress className="progress progress-success " value="10" max="100"></progress>
    <h3>10%</h3>
  </div>
  <div className="list">
    <h2>ไขมัน</h2>
    <progress className="progress progress-warning " value="60" max="100"></progress>
    <h3>60%</h3>
  </div>
  <div className="list">
    <h2>เกลือ</h2>
    <progress className="progress progress-info  " value="20" max="100"></progress>
    <h3>20%</h3>
  </div>
</div>
    </div>
    
    </div>
    <div className="cc">
    <div class="cancel">
      <button class="btn btn-error">Cancel</button>
    </div>
    <div class="confirm">
      <button class="btn btn-success">Confirm</button>
    </div>
    
    </div>
  
  </div>
  
);

export default styled(Todayfood)`
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
.data {
  font-size: calc(60% + 2vmin);
  padding: 50px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dayly h1{
  font-size: calc(60% + 2vmin);
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dayly h2{
  font-size: calc(60% + 1vmin);
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dayly h3{
  font-size: calc(40% + 1vmin);
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.list{
  min-width: 10rem;
  width: 100%;
}
.list h2{
  font-size: calc(60% + 1vmin);
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.confirm {
    height: 4rem;
    width: 5rem;
    margin: 1rem;
  }
  .cancel {
    height: 4rem;
    width: 5rem;
    margin: 1rem;
    
  }
  .cc{
    display: flex;
    justify-content: center;
  }
`;
