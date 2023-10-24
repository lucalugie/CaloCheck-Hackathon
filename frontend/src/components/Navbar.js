import styled from "styled-components";
import { Link } from "react-router-dom";

const profilepath =
  "https://pub-static.fotor.com/assets/projects/pages/28dfdd1b67984fd095e368b7c603b7e4/600w/fotor-8883abdca0284d13a2542f8810bf8156.jpg";

function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
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
              <Link to="/calendar">Calendar</Link>
              </li>
              <li>
              <Link to="/ai-scan">AI scan</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="logo" style={{ cursor: "pointer" }}>
            <Image src="../logo/logo.png" alt="caloCheck" />
          </Link>
        </div>

        <div className="navbar-end">

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profilepath} />
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
              <Link to="/welcome">Logout</Link>
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
