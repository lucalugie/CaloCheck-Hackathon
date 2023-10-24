
import Login from "./components/Login/Login";
import Line from "./Page/Line/line";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Provider } from "react-redux";
import store from './store/store'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from "./store/userSlice";
function App() {

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
    <Provider store={store}>
    <BrowserRouter>
   <Routes>
     <Route path="/" element={<Login />} />
     <Route path="/line" element={<Line/>}  />
   </Routes>
    
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;