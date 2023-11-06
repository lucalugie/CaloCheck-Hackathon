import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../Convert/userController";
import ThemeChange from "./ThemeChange/ThemeChange";

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchUserDataAndDispatch = async () => {
    console.log("UserDataFetch");
    try {
      await fetchUserData(dispatch);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  //lugie modify
  const defaultUserImage =
    "https://i.pinimg.com/474x/89/d1/ee/89d1eedd44904286c8113a1f8603aa4c.jpg";
  const [userImage, setUserImage] = useState(defaultUserImage);
  useEffect(() => {
    fetchUserDataAndDispatch();
    setUserImage(user.pictureUrl || defaultUserImage);
  }, [user]);

  const cleartoken = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      //lugie modify
      setUserImage(defaultUserImage);
    } catch (error) {
      console.log("Err");
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 z-10">
        <div className="navbar-start z-10">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Homepage</Link>
              </li>
              <li>
                <Link to="/datastatus">Calendar</Link>
              </li>
              <li>
                <Link to="/ai-scan">AI Scan</Link>
              </li>
              {/* <li>
                <Link to="/ig-scan">IG-story Scan</Link>
              </li> */}
            </ul>
          </div>
          <Link to="/" className="logo" style={{ cursor: "pointer" }}>
            <Image src="../logo/logo.png" alt="caloCheck" />
          </Link>
        </div>

        <div className="navbar-end z-10">
          {/* <div className="dropdown dropdown-end">
            <ThemeChange />
          </div> */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={userImage} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <Link to="/welcome" onClick={() => cleartoken()}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

const Image = styled.img`
  max-width: 150px;
  max-height: 100%;
`;

export default Navbar;
