import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faCamera } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import ConfirmAI from "./ConfirmAI";
import { setName, setUrl, setLoading } from "../../store/aiPageSlice";
import { useDispatch } from "react-redux";
function AI({ className }) {
  const inputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSelectedImage, setShowSelectedImage] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(inputRef.current.files);
  }, [inputRef]);

  const handleImageSelection = (image) => {
    if (selectedImage === image) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Read the selected image as a base64-encoded string
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setSelectedImage(base64Image);
        handleShowSlectedImage();
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      handleHideSelectedImage();
      console.log("img null");
    }
  };
  const handleShowSlectedImage = () => {
    setShowSelectedImage(true);
    console.log("show yes");
  };
  const handleHideSelectedImage = () => {
    setShowSelectedImage(false);
    console.log("show not");
  };

  //pimadded
  const AIchecked = () => {
    // console.log("use AI checked",selectedImage);
    dispatch(setLoading(true));
    var formdata = new FormData();
    formdata.append("image_file", inputRef.current.files[0]);
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
      });
  };

  return (
    <div className={className}>
      <div className="wrap w-full h-1/2 mt-14">
        <h1 className="text-2xl font-bold text-center flex flex-col justify-center items-center">
          Welcome to AI Food Scanning
        </h1>
        <h2 className="text-xl text-primary text-center flex flex-col justify-center items-center mb-4">
          อัพโหลดรูปภาพเพื่อเริ่มทำ AI Scanning.
        </h2>

        {/* bottom */}

        <div className="flex justify-center items-center">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="file-input"
            onChange={handleFileInputChange}
          />
          <label
            htmlFor="file-input"
            className={`grid-gallery h-64 max-w-sm flex-grow justify-center card bg-secondary rounded-box place-items-center m-4 cursor-pointer duration-100 
            ${selectedImage === "gallery" ? "selected" : ""}`}
            onClick={() => {
              handleImageSelection("gallery");
              console.log("Gallery image clicked");
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <FontAwesomeIcon icon={faImage} className="font-bold text-7xl" />
              <h2 className="text-lg font-bold mt-2 text-center">
                เลือกจากคลังรูปภาพ
              </h2>
            </div>
          </label>

          {/* camera */}
          <input
            type="file"
            accept="image/*"
            capture="camera"
            style={{ display: "none" }}
            id="camera-input"
            onChange={handleFileInputChange}
          />

          <label
            htmlFor="camera-input"
            className={`grid-camera h-64 max-w-sm flex-grow justify-center card bg-accent rounded-box place-items-center m-4 cursor-pointer duration-100 
            ${selectedImage === "camera" ? "selected" : ""}`}
            onClick={() => {
              handleImageSelection("camera");
              console.log("Camera image clicked");
            }}
          >
            <div className="flex flex-col justify-center items-center ">
              <FontAwesomeIcon icon={faCamera} className="font-bold text-7xl" />
              <h2 className="text-lg font-bold mt-2 text-center">
              เลือกจากกล้องถ่ายรูป
              </h2>
            </div>
          </label>
        </div>
        {/* show */}
        <div className="flex row justify-center items-center mb-4">
          {showSelectedImage && selectedImage ? (
            <div className="card w-80 border border-primary aspect-w-1 aspect-h-1">
              <div className="card-body items-center text-center">
                <h2 className="text-lg font-bold">Selected Image :</h2>
              </div>
              <figure className="px-4 pb-4">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className=" w-full max-h-44 object-contain rounded-xl"
                />
              </figure>
            </div>
          ) : (
            <div className="card w-80 border border-primary">
              <div className="card-body items-center text-center">
                <h2 className="text-lg font-bold items-center">
                  ภาพที่เลือก :
                </h2>
                <h2 className="text-lg font-bold items-center">None</h2>
              </div>
            </div>
          )}
        </div>

        {/* bottom */}
        {selectedImage ? (
          <Link to="/ai-scan/confirm" element={<ConfirmAI></ConfirmAI>}>
            <div className="flex row justify-center items-center">
              <button
                className="btn btn-primary w-1/3 max-w-xs"
                onClick={() => AIchecked()}
              >
                Start
              </button>
            </div>
          </Link>
        ) : (
          <div className="flex row justify-center items-center">
            <button className="btn btn-primary w-1/3 max-w-xs" disabled>
              Start
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default styled(AI)`
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

// flex flex-row justify-center items-center
