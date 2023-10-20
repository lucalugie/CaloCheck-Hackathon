import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home/Home";
import Nutrition from "./components/FoodInfo/Nutrition";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/nu" element={<Nutrition />}></Route>
        {/* <Login /> */}
      </Routes>
    </>
  );
}

export default App;
