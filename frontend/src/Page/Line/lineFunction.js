import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../constant/API";
import { useDispatch, useSelector } from "react-redux";
import {setType, setLineID, setDisplayName, setPictureUrl, setGender, setWeight, setHeight, setBmi} from "../../store/userSlice";
export default function LineFunction() {
const [queryParameters] = useSearchParams()
const dispatch = useDispatch();
const navigate = useNavigate();
const user = useSelector((state) => state.user);


  useEffect(() => {
    const code = queryParameters.get("code")
    if(code){
      fetch(API.api,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          code
        })
      }).then(res => res.json())
      .then(data => {
        if(data.type === "register"){
          const {member} = data;
          dispatch(setType(data.type));
          dispatch(setLineID(member.userlineId));
          dispatch(setDisplayName(member.displayName));
          dispatch(setPictureUrl(member.pictureUrl));
        }else if(data.type === "login"){
          const {member} = data;
          dispatch(setType(data.type));
          dispatch(setLineID(member.userlineId));
          dispatch(setDisplayName(member.displayName));
          dispatch(setPictureUrl(member.pictureUrl));
        }else{
          navigate("/");
        }
      })
    }
  },[])



return {user, navigate}

}