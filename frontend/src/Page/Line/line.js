 import LineFunction from "./lineFunction";
 import {  useSelector } from "react-redux";

 function Line() {

    const LineCode = LineFunction();
    const users = useSelector((state) => state.user.user);
    return (
        <>
            
            <p>{LineCode}</p>
            <p>{users.displayName}</p>
             
        </>
    )
 }
 export default Line;