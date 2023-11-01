import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";
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
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }, [prefix]);
  
    const handlePrefixChange = (event) => {
        console.log(event.target.value);
        setPrefix(event.target.value);
    };

    return (
        <>
            <div className="Myfood--search ">
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-full max-w-xs search-component "
              value={prefix}
              onChange={handlePrefixChange}
            />
            <button className="btn btn-accent ml-2 " >
              <FontAwesomeIcon icon={faBarcode} className="input-icon" />
            </button>
          </div>
        </div>
        </>
        );
}


export default styled(Searchmenu)`
  

`;

