
import Login from "./components/Login/Login";
import Line from "./Page/Line/line";
import {BrowserRouter,Routes,Route} from "react-router-dom";
function App() {

  return (
    <>
    <BrowserRouter>
   <Routes>
     <Route path="/" element={<Login />} />
     <Route path="/line" element={<Line/>}  />
   </Routes>
    
    </BrowserRouter>

    </>
  );
}

export default App;
