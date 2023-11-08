import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import Container from "./components/Container";
import Home from "./components/Home/Home";
import Welcome from "./components/Register/Welcome";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AI from "./components/Scan/AI";
import Settings from "./components/Register/Settings";
import MyFood from "./components/MyFood";
import Pastfood from "./components/Food/Pastfood";
import TodayFood from "./components/Food/TodayFood";
import Addfood from "./components/Addfood/Addfood";
import Cookfood from "./components/Addfood/Cookfood";
import Buyfood from "./components/Addfood/Buyfood";
import ConfirmAI from "./components/Scan/ConfirmAI";
import IG from "./components/Scan/IG";

import Showfood from "./components/Food/Showfood";
//Pim added
import SendPhoto from "./components/sendPhoto/sendPhoto";

import API from "./constant/API";
import liff from "@line/liff";

import Line from "./Page/Line/line";
import Calendar from "./components/Calendar/Calendar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "./store/aiPageSlice";
import {
  setType,
  setLineID,
  setDisplayName,
  setPictureUrl,
  setGender,
  setWeight,
  setHeight,
  setAge,
  setBmi,
} from "./store/userSlice";
import ConfirmIG from "./components/Scan/ConfirmIG";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lineBrowser, setLineBrowser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [queryParameters] = useSearchParams();
  const user = useSelector((state) => state.user);

  if (user.type == "") {
    liff
      .init({
        liffId: process.env.REACT_APP_LIFF_ID,
      })
      .then(() => {
        setLineBrowser(liff.isInClient());
        const token = liff.getAccessToken();
        console.log("token", token);
        if (token) {
          fetch(API.getTokenByLIFF, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              token,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.type == "login") {
                const { member } = data;
                dispatch(setType(data.type));
                dispatch(setLineID(member.userlineId));
                dispatch(setDisplayName(member.displayName));
                dispatch(setPictureUrl(member.pictureUrl));
                dispatch(setGender(member.gender));
                dispatch(setWeight(member.weight));
                dispatch(setHeight(member.height));
                dispatch(setBmi(member.bmi));
                dispatch(setAge(member.age));
                setLoading(false);
                if (localStorage.getItem("lineParameters") != null) {
                  navigate(localStorage.getItem("lineParameters"));
                  setTimeout(() => {
                    localStorage.removeItem("lineParameters");
                  }, 1000);
                } else {
                  navigate("/");
                }
              } else if (data.type == "register") {
                const { member } = data;
                dispatch(setType(data.type));
                dispatch(setLineID(member.userlineId));
                dispatch(setDisplayName(member.displayName));
                dispatch(setPictureUrl(member.pictureUrl));
                setLoading(false);
                navigate("/line");
              }
            });
        }
      });
  }

  useEffect(() => {
    if (queryParameters.get("liff.state") != null) {
      localStorage.setItem("lineParameters", queryParameters.get("liff.state"));
    }
    if (user.type == "" && loading) {
      setTimeout(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/users/`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.type == "login") {
              const { member } = data;
              dispatch(setType(data.type));
              dispatch(setLineID(member.userlineId));
              dispatch(setDisplayName(member.displayName));
              dispatch(setPictureUrl(member.pictureUrl));
              dispatch(setGender(member.gender));
              dispatch(setWeight(member.weight));
              dispatch(setHeight(member.height));
              dispatch(setBmi(member.bmi));
              dispatch(setAge(member.age));
              setLoading(false);
              if (localStorage.getItem("lineParameters") != null) {
                navigate(localStorage.getItem("lineParameters"));
                setTimeout(() => {
                  localStorage.removeItem("lineParameters");
                }, 1000);
              } else {
                navigate("/");
              }
            } else if (data.type == "register") {
              const { member } = data;
              dispatch(setType(data.type));
              dispatch(setLineID(member.userlineId));
              dispatch(setDisplayName(member.displayName));
              dispatch(setPictureUrl(member.pictureUrl));
              setLoading(false);
              navigate("/line");
            } else {
              setLoading(false);
              // navigate("/welcome");
            }
          });
      }, 500);
    }
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center items-center">
            <div className="absolute top-[40%] animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
            <img
              src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
              className="absolute top-[40%] rounded-full h-28 w-28"
            ></img>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <Container>
            <Routes>
              <Route path="/line" element={<Line />}></Route>
              <Route path="/welcome" element={<Welcome />}></Route>
              {/* lugie modify**** */}
              <Route
                path="/"
                element={
                  user.userlineId ? <Home /> : <Navigate to="/welcome" />
                }
              />
              <Route
                path="/ai-scan"
                element={user.userlineId ? <AI /> : <Navigate to="/welcome" />}
              />
              <Route
                path="/ig-scan"
                element={user.userlineId ? <IG /> : <Navigate to="/welcome" />}
              ></Route>
              <Route path="/ai-scan/confirm" element={<ConfirmAI />}></Route>
              <Route path="/ig-scan/confirm" element={<ConfirmIG />}></Route>
              <Route path="/sendName" element={<SendPhoto />}></Route>
              <Route
                path="/settings"
                element={
                  user.userlineId ? <Settings /> : <Navigate to="/welcome" />
                }
              ></Route>
              <Route
                path="/myfood"
                element={
                  user.userlineId ? <MyFood /> : <Navigate to="/welcome" />
                }
              ></Route>
              <Route
                path="/myfood/Pastfood/:idfood/:name/:kcal/:amount/:protein/:fat/:salt/:sugar/:veg/:carb"
                element={
                  user.userlineId ? <Pastfood /> : <Navigate to="/welcome" />
                }
              ></Route>
              <Route
                path="/myfood/Showfood/:idfood"
                element={
                  user.userlineId ? <Showfood /> : <Navigate to="/welcome" />
                }
              ></Route>
              <Route
                path="/myfood/Addfood"
                element={
                  user.userlineId ? <Addfood /> : <Navigate to="/welcome" />
                }
              ></Route>
              <Route
                path="/myfood/Addfood/Cookfood"
                element={
                  user.userlineId ? <Cookfood /> : <Navigate to="/welcome" />
                }
              ></Route>
              <Route
                path="/myfood/Addfood/Buyfood"
                element={
                  user.userlineId ? <Buyfood /> : <Navigate to="/welcome" />
                }
              ></Route>
              <Route
                path="/datastatus"
                element={
                  user.userlineId ? <Calendar /> : <Navigate to="/welcome" />
                }
              ></Route>
              <Route
                path="/today"
                element={
                  user.userlineId ? <TodayFood /> : <Navigate to="/welcome" />
                }
              ></Route>
            </Routes>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
