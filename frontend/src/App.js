import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Container from "./components/Container";
import Home from "./components/Home/Home";
// import Gender from "./components/Register/Gender";
// import Bmi from "./components/Register/Bmi";
// import Complete from "./components/Register/Complete";
import Welcome from "./components/Register/Welcome";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AI from "./components/Scan/AI";
import Settings from "./components/Register/Settings";
// import Barcode from "./components/Scan/Barcode";
import MyFood from "./components/MyFood";
import Pastfood from "./components/Food/Pastfood"
import TodayFood from "./components/Food/TodayFood"; 
import Addfood from "./components/Addfood/Addfood";
import Cookfood from "./components/Addfood/Cookfood";
import Buyfood from "./components/Addfood/Buyfood";
import Datastatus from "./components/DataStatus/Datastatus";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/gender" element={<Gender />}></Route>
          <Route path="/bmi" element={<Bmi />}></Route>
          <Route path="/complete" element={<Complete />}></Route> */}
          <Route path="/welcome" element={<Welcome />}></Route>
          <Route path="/ai-scan" element={<AI />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/myfood" element={<MyFood />}></Route>
          <Route path="/myfood/Pastfood/:name/:kcal" element={<Pastfood />}></Route>
          <Route path="/myfood/Addfood" element={<Addfood />}></Route>
          <Route path="/myfood/Addfood/Cookfood" element={<Cookfood />}></Route>
          <Route path="/myfood/Addfood/Buyfood" element={<Buyfood/>}></Route>
          <Route path="/datastatus" element={<Datastatus/>}></Route>


          {/* /myfood/Addfood/Buyfood */}
          {/* <Route path="/barcode" element={<Barcode />}></Route> */}
          {/* <Login /> */}
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
