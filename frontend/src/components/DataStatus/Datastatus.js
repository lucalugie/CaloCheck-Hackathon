import React, { useState} from "react";
import styled from "styled-components";
import PieAll from "./Pieall";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";

const Datastatus = ({ className,day,month,year }) => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    setData([]);
    var requestOptions = {
      credentials: 'include',
    };
    
    fetch(`${process.env.REACT_APP_BASE_URL}/Calendars/foods?createdAt=${year}-${month}-${day}`, requestOptions)
      .then(response => response.json())
      .then(result => {
          if(result.length > 0){
            result.forEach(element => {
              getFood(element.idfood)
            });

          }
          else{
            console.log("no data")
          }
          
      })
  }, [`${year}-${month}-${day}`]);


  const getFood = (result) => {

    fetch(`${process.env.REACT_APP_BASE_URL}/foodnutrition/foods/?idfood=${result}`, 
    {
      method: 'GET',
      credentials: "include",      
    }
    )
      .then(response => response.json())
      .then(result => {
        setData((prevData) => {
          return [...prevData, ...result];
        });
      })
    }
  



  const [tableData, setTableData] = useState([
    { id: 1, name: 'ข้าวผัด', amount: '1 x 1 จาน', kcal: 495 },
    { id: 2, name: 'ข้าวกุ้งทอด', amount: '1 x 1 จาน', kcal: 610 },
    { id: 3, name: 'ข้าวสวยหอมมะลิตราอีซี่โก', amount: '1 x 1 จาน', kcal: 300 },
  ]);

  return (
    <>

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
       
                {/* row 1 */}
                {Data.length > 0 ? (
                   Data.map((data) => (
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
                    <tr key={data.idfood}>
                      <th>{data.idfood}</th>
                      <td>{data.name}</td>
                      <td>{data.per_items}</td>
                      <td>{data.kcal}</td>
                    </tr>
                    </tbody>
                    </table>
                  ))
                )
                :
                <th style={{ textAlign: 'center' }}>ไม่มีรายการอาหารของวันนี้</th>
               }
    
            <br />
            <div>
              <PieAll/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
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