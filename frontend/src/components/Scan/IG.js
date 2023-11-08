import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { setName, setUrl, setLoading } from "../../store/aiPageSlice";
import { useDispatch } from "react-redux";

function IG({ className }) {
  const [loadingx, setLoadingx] = useState(false);
  const [wrongcheck, setwrongcheck] = useState(false);
  const [blob, setBlob] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [showSelectedImage, setShowSelectedImage] = useState(false);
  const [nameig, setNameig] = useState("");
  const dispatch = useDispatch();


 useEffect(() => {
   console.log(nameig)
 }, [nameig]);

 var requestOptions = {
  method: 'get',
  maxBodyLength: Infinity,
  headers: {}
};
  
  const pull = () => {
    setLoadingx(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/ig/photostorys/${nameig}`, requestOptions)
       .then((response) => response.json())
       .then((result) => {
          const url = result.result[0].image_versions2.candidates[0].url
          fetch(`${process.env.REACT_APP_BASE_URL}/proxy-image`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              imageUrl: url
            })
          })
          .then((res) => res.blob())
          .then((blob) => {
            setBlob(blob);
            const objectURL = URL.createObjectURL(blob);
            setSelectedImage(objectURL);
            setShowSelectedImage(true);
            setLoadingx(false);
            setwrongcheck(false);
          })
          
          
       })
      .catch((error) => {
         console.log(error);
         setLoadingx(false);
         setwrongcheck(true);
         alert("ไม่พบ IG นี้ในระบบ")
       });
  }


const AIchecked = async () => {
    
    var formdata = new FormData();
    formdata.append("image_file",blob );
       var requestOptions = {
         method: "POST",
         body: formdata,
         redirect: "follow",
       };

   fetch(`${process.env.REACT_APP_SCAN_PHOTO}/detect`, requestOptions)
     .then((response) => response.json())
     .then((result) => {
       if (result.length > 0) {
         dispatch(setName(result[0][4]));
         dispatch(setUrl(selectedImage));
          dispatch(setLoading(false));
       } else {
         dispatch(setName("ข้อมูลอาหารชนิดนี้ยังไม่มีในระบบ"));
         dispatch(setUrl(""));
         dispatch(setLoading(false));
       }
     })
    .catch((error) => {
       console.log(error);
     });
}





  return (
    <div className={className}>
      <div className="wrap w-full h-1/2 mt-14">
            <h1 className="text-2xl font-bold text-center flex flex-col justify-center items-center">
              Welcome to IG Story Food Scanning
            </h1>
            <h2 className="text-xl text-primary text-center flex flex-col justify-center items-center">
              กรอกชื่อ IG ของคุณเพื่อดึงภาพจาก IG Story เเละเริ่ม AI Scanning
            </h2>
            <p className="text-l text-warning text-center flex flex-col justify-center items-cente">
             (ใช้ได้เฉพาะ IG Story ที่เป็นภาพเท่านั้น )
            </p>

            {/* bottom */}

            { loadingx ? 
            <>
              <center><input type="text" placeholder="Type here" className="input w-full max-w-xs m-10" disabled
            /></center>
            </>
          :
          <>
            <center><input type="text" placeholder="Type here" className="input w-full max-w-xs m-10" 
            onChange={
              (e) => {
                const nameig = e.target.value;
                setNameig(nameig);
              }
             }
            /></center>
          </>  
          }


            {/* show */}
            <div className="flex row justify-center items-center mb-4">
                {showSelectedImage && selectedImage ? (
                <div className="card w-80 border border-primary aspect-w-1 aspect-h-1">
                  <div className="card-body items-center text-center">
                    <h2 className="text-lg font-bold">Selected Image :</h2>
                  </div>
              <figure className="px-4 pb-4">
                <img crossOrigin="anonymous"
                  src={selectedImage}
                  alt="Selected"
                  className=" w-full max-h-44 object-contain rounded-xl"
                />
              </figure>
            </div>
          ) : (
              <>  
            {loadingx ? 
              <>
                <center><span className="loading loading-dots loading-lg  text-error"></span></center>
              </>
              :
              <>
            <div className="card w-80 border border-primary">
              <div className="card-body items-center text-center">
                <h2 className="text-lg font-bold items-center">
                  ภาพที่เลือก :
                </h2>
                <h2 className="text-lg font-bold items-center">None</h2>
              </div>
            </div>
              </>
               }
              </>
          

          )}
        </div>


            {showSelectedImage ? 
            <>
            <Link to="/ig-scan/confirm">         
            <div className="flex row justify-center items-center">
            <button className="btn btn-primary w-1/3 max-w-xs"
             onClick={() => AIchecked()}
             >
              เลือกรูปนี้
            </button>
            </div> 
            </Link>

            <div className="flex row justify-center items-center mt-4">
            <button className="btn btn-error w-1/3 max-w-xs"
            onClick={() =>setShowSelectedImage(false)}
            >
              แก้ไข
            </button>
            </div> 
            </>
            :
            <>
            {loadingx ? 
              <>
                <div className="flex row justify-center items-center">
                <button className="btn btn-primary btn-disabled w-1/3 max-w-xs">
                  กำลังดึงรูป
                </button>
                </div>
              </>
              :
              <>
                <div className="flex row justify-center items-center">
                <button className="btn btn-primary w-1/3 max-w-xs"
                 onClick={() => pull()}
                 >
                  ดึงรูป
                </button>
                </div> 
              </>
            }
             </>
            
            }
               
        </div>
      </div>
   
  );
}

export default styled(IG)`
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
