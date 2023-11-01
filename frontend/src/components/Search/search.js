import styled from "styled-components";
import Barcode from "../Barcode/barcode";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {setLoading, setTableData} from "../../store/setSearch";
function Searchmenu() {
    const dispatch = useDispatch();
    const menu = useSelector((state) => state.search.tableData);
    const [prefix, setPrefix] = useState("");


    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`${process.env.REACT_APP_BASE_URL}/foodnutrition/search?name=${prefix}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                dispatch(setTableData(result));
            })
            .catch(error => console.log('error', error));
    }, [prefix]);
  
    const handlePrefixChange = (event) => {
        setPrefix(event.target.value);
    };

    return (
        <>
            <div className="Myfood--search">
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-full max-w-xs search-component"
              value={prefix}
              onChange={handlePrefixChange}
            />
            <Barcode />
          </div>
        </div>
        </>
        );
}


export default styled(Searchmenu)`
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

  .input-with-icon {
    display: flex; /* ให้ข้อความและ icon อยู่ในบรรทัดเดียวกัน */
    align-items: center; /* จัดตำแหน่งให้ตรงกัน */
  }

`;