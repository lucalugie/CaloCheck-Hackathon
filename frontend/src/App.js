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
          {/* <Route path="/barcode" element={<Barcode />}></Route> */}
          {/* <Login /> */}
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
