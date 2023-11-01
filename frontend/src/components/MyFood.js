import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Searchmenu from "./Search/search";
import { useSelector } from "react-redux";

const MyFood = ({ className }) => {
  const searchmenu = useSelector((state) => state.search.tableData);
  const [tableData, setTableData] = useState([]);

  console.log("tadatable", tableData);

  useEffect(() => {
    setTableData(searchmenu);
  }, [searchmenu]);

  return (
    <div className={className}>
      <div className="Myfood--box">
        <h1>
          <b>MyFood</b>
        </h1>
        <Searchmenu />
      </div>

      <div className="Myfood--list">
        <div className="Mybox--list">
          {tableData.map((item) => (
             //lugie modify****
            <Link
              className="m-4"
              to={`/myfood/Pastfood/${item.idfood}/${item.name}/${item.kcal}/${item.per_items}/${item.per_protein}/${item.per_fat}/${item.per_salt}/${item.per_sugar}/${item.per_veg}/${item.per_carb}`}
            >
              <div
                key={item.idfood}
                tabIndex={0}
                className="list collapse collapse-open border border-base-300 bg-base-200 margin-bottom-2 max-w-md "
              >
                <div className="collapse-title text-xl font-medium">
                  {item.name}{" "}
                </div>
                <div className="collapse-content">
                  <p>
                    {item.per_items} จาน - {item.kcal} Kcal
                  </p>
                </div>
              </div>
            </Link>
          ))}
          </div>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .Mybox--list {
    margin: 1rem;
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
