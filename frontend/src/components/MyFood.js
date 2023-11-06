import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Searchmenu from "./Search/search";
import { useDispatch, useSelector } from "react-redux";
import TodayFood from "./Food/TodayFood";
import { setLoading } from "../store/setSearch";

const MyFood = ({ className }) => {
  const searchmenu = useSelector((state) => state.search.tableData);
  const [tableData, setTableData] = useState([]);
  //lugie add
  const loading = useSelector((state) => state.search.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    console.log("loading innital:", loading);
  }, []);

  useEffect(() => {
    setTableData(searchmenu);
  }, [searchmenu]);

  const { status } = useSelector((state) => state.barcode);

  return (
    <>
      {status ? (
        <>
          <TodayFood />
        </>
      ) : (
        <div className={className}>
          <div className="Myfood--box">
            <h3 className="card-titletwo text-base-100 font-bold">MY FOOD</h3>
            <h2 className="card-title font-bold" style={{ lineHeight: "0.5" }}>
              ค้นหารายการอาหาร
            </h2>
            <Searchmenu />
          </div>

          <div className="Myfood--list">
            <div className="Mybox--list w-11/12">
              {loading ? (
                <div className="wrap w-full h-1/2 mt-32">
                  <div className="flex flex-row justify-center items-center h-full">
                    <span className="loading loading-ball loading-xs text-success"></span>
                    <span className="loading loading-ball loading-sm text-primary"></span>
                    <span className="loading loading-ball loading-md text-accent"></span>
                    <span className="loading loading-ball loading-lg text-secondary"></span>
                  </div>
                </div>
              ) : (
                <>
                  {tableData.slice(0, 20).map((item) => (
                    <Link
                      className="m-4"
                      to={`/myfood/Pastfood/${item.idfood}/${item.name}/${item.kcal}/${item.per_items}/${item.per_protein}/${item.per_fat}/${item.per_salt}/${item.per_sugar}/${item.per_veg}/${item.per_carb}`}
                    >
                      <div
                        key={item.idfood}
                        tabIndex={0}
                        className="list collapse collapse-open border border-base-300 bg-base-200 margin-bottom-2 max-w-md"
                      >
                        <div className="collapse-title text-xl font-medium">
                          {item.name}
                        </div>
                        <div className="collapse-content">
                          <p>
                            {item.per_items} จาน - {item.kcal} Kcal
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </div>
            <div className="button">
              <div className="flex-grow"></div>
              <Link to="/myfood/Addfood">
                <button className="btn btn-primary font-bold w-12 h-12 p-2 flex justify-center items-center">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="font-bold text-3xl"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
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
    position: absolute;
    z-index: 1;
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
    margin-top: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .collapse {
    border: 1px solid #ef9fbc;
    background-color: transparent;
    width: 24rem;
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

  .collapse-title {
    padding-left: 30px;
    padding-bottom: 0;
    min-height: 0;
  }
  .collapse-content {
    padding-left: 30px;
  }
`;
