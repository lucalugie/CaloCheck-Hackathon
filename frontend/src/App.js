
import { Routes, Route, useNavigate } from "react-router-dom";
import Container from "./components/Container";
import Home from "./components/Home/Home";
import Welcome from "./components/Register/Welcome";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AI from "./components/Scan/AI";
import Settings from "./components/Register/Settings";
// import Barcode from "./components/Scan/Barcode";
import MyFood from "./components/MyFood";
import Pastfood from "./components/Food/Pastfood";
import TodayFood from "./components/Food/TodayFood";
import Addfood from "./components/Addfood/Addfood";
import Cookfood from "./components/Addfood/Cookfood";
import Buyfood from "./components/Addfood/Buyfood";
import Datastatus from "./components/DataStatus/Datastatus";
import ConfirmAI from "./components/Scan/ConfirmAI";
import IG from "./components/Scan/IG";
import NotFound from "./components/NotFound";

//Pim added
import Line from "./Page/Line/line";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {setType, setLineID, setDisplayName, setPictureUrl} from "./store/userSlice";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/users/`,{    
      method:"POST",
      credentials: 'include',
      headers:{
          "Content-Type": "application/json",
      },
      })
      .then(res => res.json())
      .then(data => {
          if(data.type === "login"){
            dispatch(setType(data.type))
          }else if(data.type === "register"){
            dispatch(setType(data.type))
            navigate("/line");
          }
      })
  },[])

  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/line" element={<Line />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/welcome" element={<Welcome />}></Route>
          <Route path="/ai-scan" element={<AI />}></Route>
          <Route path="/ig-scan" element={<IG />}></Route>
          <Route path="/ai-scan/confirm" element={<ConfirmAI />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/myfood" element={<MyFood />}></Route>
          <Route
            path="/myfood/Pastfood/:name/:kcal/:amount/:protein/:fat/:salt/:sugar/:veg/:carb"
            element={<Pastfood />}
          ></Route>
          <Route path="/myfood/Addfood" element={<Addfood />}></Route>

          <Route path="/myfood/Addfood/Cookfood" element={<Cookfood />}></Route>
          <Route path="/myfood/Addfood/Buyfood" element={<Buyfood />}></Route>
          <Route path="/datastatus" element={<Datastatus />}></Route>

          <Route path="/today" element={<TodayFood />}></Route>
          <Route path='*' element={<NotFound />}/>

          {/* <Route path="/" element={<Login />} />
          <Route path="/line" element={<Line />} /> */}
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
