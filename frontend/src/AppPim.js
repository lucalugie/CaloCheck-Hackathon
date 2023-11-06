
import Login from "./components/Login/Login";
import Line from "./Page/Line/line";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
function App() {

  const dispatch = useDispatch();

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
          console.log("cookie success",data)
          
      
      })
  },[])

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