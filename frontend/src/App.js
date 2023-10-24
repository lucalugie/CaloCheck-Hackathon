import { Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
import MyFood from "./components/MyFood";
// import Addfood from "./components/Addfood";
// import Cookfood from "./components/Cookfood";
// import Buyfood from "./components/Buyfood";
import Pastfood from "./components/Pastfood";
// import TodayFood from "./components/TodayFood";
// import Datastatus from "./components/Datastatus";
function App() {
  return (
    <>
    <Routes>
    <Route path="/Pastfood/:name/:kcal" element={<Pastfood />} />
    <Route path="/" element={<MyFood />} />
    </Routes>
    </>
  );
}

export default App;
