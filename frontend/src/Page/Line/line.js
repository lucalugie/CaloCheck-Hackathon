 import LineFunction from "./lineFunction";
 import Register from "../../components/Register/Register";
 import Home from "../../components/Home/Home";

 function Line() {
    const {user, navigate} = LineFunction();

    return (
        <>
             {user.type === "register" ?
             <>
                <Register/>
             </>
             :
             <>

                <Home/>
             </>
             }
        </>
    )
 }
 export default Line;