import { json, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import API from "../../constant/API";

export default function LineFunction() {
const [queryParameters] = useSearchParams()

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
        console.log(data)
      })
    }

  },[])

}