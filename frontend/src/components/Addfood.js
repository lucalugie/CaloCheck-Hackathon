import React from 'react';
import styled from "styled-components";


const Addfood = ({ className }) => {
  return (
  <div className={className}>
     <div className="button">
      <button  class="btn btn-active btn-secondary">⬅back</button>
      </div>

      <div className="flex justify-center items-center h-screen">
  <div className="card w-96 bg-base-100 shadow-xl mx-4">
    <figure className="px-10 pt-10">
      <img src="../img/cooking.jpg" alt="Cooking" className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">ปรุงเอง</h2>
      <p>คุณปรุงอาหารด้วยตัวเอง ?</p>
      <div className="card-actions">
        <button className="btn btn-success">Cooking</button>
      </div>
    </div>
  </div>
  <div className="card w-96 bg-base-100 shadow-xl mx-4">
    <figure className="px-10 pt-10">
      <img src="../img/foodshop.jpg" alt="Foodshop" className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">ซื้อมา</h2>
      <p>คุณซื้ออาหารมาทาน ?</p>
      <div className="card-actions">
        <button className="btn btn-warning">Shopping</button>
      </div>
    </div>
  </div>
</div>
  </div>
);};

export default styled(Addfood)`
  .button {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
 font-size: calc(60% + 2vmin);
}
`;