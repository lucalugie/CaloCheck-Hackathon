import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import API from "../../constant/API";

export default function LineFunction() {
const [queryParameters] = useSearchParams()
  useEffect(() => {
    const code = queryParameters.get("code")
    if(code){
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ code })
    };
    fetch(API.api, requestOptions)
    
    .then(response => response.json())
    .then(data => {
        console.log("API",API.api)
    })
    }
  else{
    console.log("no code")
  }
  },[])

}