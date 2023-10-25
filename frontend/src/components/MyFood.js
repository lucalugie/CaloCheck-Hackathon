import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const MyFood = ({ className }) => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "ข้าวผัด",
      amount: "1 x 1 จาน",
      kcal: 495,
      protein: 70,
      fat: 44,
      salt: 23,
      sugar: 25,
      veg: 5,
      carb: 225,
    },
    {
      id: 2,
      name: "ข้าวกุ้งทอด",
      amount: "1 x 1 จาน",
      kcal: 610,
      protein: 70,
      fat: 44,
      salt: 23,
      sugar: 25,
      veg: 5,
      carb: 250,
    },
    {
      id: 3,
      name: "ข้าวสวยหอมมะลิตราอีซี่โก",
      amount: "1 x 1 จาน",
      kcal: 300,
      protein: 70,
      fat: 44,
      salt: 23,
      sugar: 25,
      veg: 5,
      carb: 100,
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
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-accent ml-2">
              <FontAwesomeIcon icon={faBarcode} className="input-icon" />
            </button>
          </div>
        </div>
      </div>
      <div className="Myfood--list">
        {tableData.map((item) => (
          <Link className="m-4"
            to={`/myfood/Pastfood/${item.name}/${item.kcal}/${item.amount}/${item.protein}/${item.fat}/${item.salt}/${item.sugar}/${item.veg}/${item.carb}`}
          >
            <div
              key={item.id}
              tabIndex={0}
              className="list collapse collapse-open border border-base-300 bg-base-200 margin-bottom-2"
              style={{ minWidth: "16rem" }}
            >
              <div className="collapse-title text-xl font-medium">
                {item.name}{" "}
              </div>
              <div className="collapse-content">
                <p>
                  {item.amount} - {item.kcal} Kcal
                </p>
              </div>
            </div>
          </Link>
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
    border: 1px solid #ef9fbc;
    background-color: transparent;
  }
  .button {
    position: fixed;
    bottom: 40px;
  }
  .input-with-icon {
    display: flex; /* ให้ข้อความและ icon อยู่ในบรรทัดเดียวกัน */
    align-items: center; /* จัดตำแหน่งให้ตรงกัน */
  }

  .list {
    border-radius: 100px;
  }
`;
