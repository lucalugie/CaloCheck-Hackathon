import React from "react";
import styled from "styled-components";
import PieAll from "./Pieall";

const Datastatus = ({ className }) => (
  <div className={className}>
  <div className="data">
  <div className="form-control w-full max-w-xs">
  <div className="overflow-x-auto">
  <div className="Text">
      <h1>
        <b>🍽️รายการอาหาร</b>
        <br/>
      </h1>
    </div>
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>ชื่ออาหาร</th>
        <th>จำนวน</th>
        <th>Kcal</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>ข้าวผัด</td>
        <td>1 x 1 จาน </td>
        <td>495</td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>ข้าวกุ้งทอด</td>
        <td>1 x 1 จาน </td>
        <td>610</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>ข้าวสวยหอมมะลิตราอีซี่โก</td>
        <td>1 x 1 จาน</td>
        <td>300</td>
      </tr>
    </tbody>
  </table>
  <br/>
</div>
  <PieAll/>
  </div>
  </div>
  </div>
  
);
export default styled(Datastatus)`
.data {
  font-size: calc(60% + 2vmin);
  padding: 50px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
`;