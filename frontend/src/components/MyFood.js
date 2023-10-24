import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBarcode, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const MyFood = ({ className }) => {

  const [tableData, setTableData] = useState([
    { id: 1, name: "ข้าวผัด", amount: "1 x 1 จาน", kcal: 495 },
    { id: 2, name: "ข้าวกุ้งทอด", amount: "1 x 1 จาน", kcal: 610 },
    {
      id: 3,
      name: "ข้าวสวยหอมมะลิตราอีซี่โก",
      amount: "1 x 1 จาน",
      kcal: 300,
    },
  ]);

  return (
    <div className={className}>
      <div className="Myfood--box">
        <h1>
          <b>MyFood</b>
        </h1>
        <div className="Myfood--search">
          <div className="input-with-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="input-icon1" />
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-full max-w-xs"
            />
            <FontAwesomeIcon icon={faBarcode} className="input-icon" />
          </div>
        </div>
      </div>
      <div className="Myfood--list">
        {tableData.map((item) => (
          <Link to={`/myfood/Pastfood/${item.name}?kcal=${item.kcal}`}>
          <div
            key={item.id}
            tabIndex={0}
            className="list collapse collapse-open border border-base-300 bg-base-200 margin-bottom-2"
          >
            <div className="collapse-title text-xl font-medium">{item.name} </div>
            <div className="collapse-content">
              <p>
                {item.amount} - {item.kcal} Kcal
              </p>
              ดูข้อมูล
            </div>
           
          </div></Link>
        ))}
        <div className="button">
          <div className="flex-grow"></div>
          <Link to="/myfood/Addfood">
          <button className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center">
            <FontAwesomeIcon icon={faPlus} className="font-bold text-3xl" />
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default styled(MyFood)`
  .Myfood--box {
    background-color: #65c3c8;
    width: 100%;
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .Myfood--box h1 {
    font-size: calc(60% + 2vmin);
    color: black;
    margin: auto;
  }
  .Myfood--search {
    width: 100%;
    border-radius: 50%;
    max-width: 604px; /* ความกว้างของช่องค้นหาที่ไม่เปลี่ยนแปลง */
    margin: 1rem; /* ทำให้ช่องค้นหาอยู่กลางแนวแนวนอน */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .Myfood--list {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
  }
  .collapse {
  border: 1px solid #EF9FBC;
  background-color: transparent;
}
.button{
    position: fixed;
    bottom: 20px;
}
.input-with-icon {
  display: flex; /* ให้ข้อความและ icon อยู่ในบรรทัดเดียวกัน */
  align-items: center; /* จัดตำแหน่งให้ตรงกัน */
}

.input-icon {
  margin-left: 1rem; /* ปรับตำแหน่งของ icon ตามที่คุณต้องการ */
}
.input-icon1 {
  margin-right: 5px; /* ปรับตำแหน่งของ icon ตามที่คุณต้องการ */
}
.list{
  margin : 1rem;
  border-radius: 100px;
}
`;



