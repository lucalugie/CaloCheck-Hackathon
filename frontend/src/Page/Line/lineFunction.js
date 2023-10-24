import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import API from "../../constant/API";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from "../../store/userSlice";
export default function LineFunction() {
const [queryParameters] = useSearchParams()
const dispatch = useDispatch();
  useEffect(() => {
    const code = queryParameters.get("code")
    if(code){
      fetch(API.api,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code
        })
      }).then(res => res.json())
      .then(data => {
    dispatch(setUser(data));
      })
    }

  },[])

}