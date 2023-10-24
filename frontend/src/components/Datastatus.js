import React, { useState} from "react";
import styled from "styled-components";
import PieAll from "./Pieall";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';


const Datastatus = ({ className }) => {
  const [tableData, setTableData] = useState([
    { id: 1, name: 'ข้าวผัด', amount: '1 x 1 จาน', kcal: 495 },
    { id: 2, name: 'ข้าวกุ้งทอด', amount: '1 x 1 จาน', kcal: 610 },
    { id: 3, name: 'ข้าวสวยหอมมะลิตราอีซี่โก', amount: '1 x 1 จาน', kcal: 300 },
  ]);

  return (
    <div className={className}>
      <div className="data">
        <div className="form-control w-full max-w-xs">
          <div className="overflow-x-auto">
            <div className="Text">
              <h1>
                <b>
                  <FontAwesomeIcon icon={faUtensils} style={{ marginRight: '2rem' }} /> รายการอาหาร
                </b>
                <br />
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
                {tableData.map((data) => (
                  <tr key={data.id}>
                    <th>{data.id}</th>
                    <td>{data.name}</td>
                    <td>{data.amount}</td>
                    <td>{data.kcal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <div>
              <PieAll/>
            </div>
          </div>
        </div>
      </div>
    </div>
  
);};
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