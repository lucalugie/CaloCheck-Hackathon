import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link  } from "react-router-dom";
function SendPhoto({ className }) {
    const {photo, blob} = useSelector((state) => state.photo);
    const [name,setName]=useState("")
    const buttonRef = useRef();
    const sendP = () => {
        const formdata =new FormData();
        formdata.append("image_file",blob);
        fetch(`${process.env.REACT_APP_BASE_URL}/photo/sendName/${name}`, {
            method: 'POST',
            body: formdata,
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === "Success"){
                buttonRef.current.disabled = true
                alert("ส่งข้อมูลสําเร็จ")
            }
        })
    }
  return (
    <>
        <div className={className}>
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-xl text-primary mt-20">
                ขอบคุณที่ร่วมให้ข้อมูลกับเรา กรุณากรอกชื่ออาหารของคุณ
                </h2>

                 {/* show */}
                <div className="flex row justify-center items-center mb-4">

                    <div className="card w-80 border border-primary aspect-w-1 aspect-h-1 m-5">
                  
                    <figure className="px-4 pb-4 p-5">
                        <img
                        src={photo}
                        alt="Selected"
                        className=" w-full max-h-44 object-contain rounded-xl"
                        />
                    </figure>
                    </div>
                    </div>
          


                <input type="text" placeholder="Type here" className="input w-full max-w-xs mb-5 "
                onChange={(e) => setName(e.target.value)}/>
                <button ref={buttonRef} className="btn btn-warning" onClick={() => sendP()}>Send</button>
                <h2 className="text-l text-primary mt-20">
                หากคุณต้องการเพิ่มรายการอาหารนี้ สามารถกดปุ่ม Add food
                </h2>
                <div className="w-full flex flex-row gap-10 justify-center items-center mt-2">
                    <Link to="/ai-scan">
                        <button className="btn btn-error">Back</button>
                      </Link>
                      <Link to="/myfood/Addfood">
                        <button className="btn btn-success">Add food</button>
                    </Link>
                </div>
            </div>
        </div>
    </>
    
   
  );
}

export default styled(SendPhoto)`
  .selected {
    border: 3px solid #3490dc;
  }

  .disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 50%;
  }
`;
