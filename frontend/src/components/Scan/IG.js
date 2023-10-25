import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function IG({ className }) {
  const [selectedImage, setSelectedImage] = useState("");
  const [showSelectedImage, setShowSelectedImage] = useState(false);

  const handleImageSelection = (image) => {
    if (selectedImage === image) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }
  };

  return (
    <div className={className}>
      <div className="wrap w-full h-1/2 mt-14">
        <h1 className="text-2xl font-bold text-center flex flex-col justify-center items-center">
          Welcome to IG Story Food Scanning
        </h1>
        <h2 className="text-xl text-primary text-center flex flex-col justify-center items-center mb-4">
          Connect to your story and start AI Scanning.
        </h2>

        {/* bottom */}

        <div className="flex justify-center items-center">
          <div
            className={`grid-gallery h-64 max-w-sm flex-grow justify-center card bg-secondary rounded-box place-items-center m-4 cursor-pointer duration-100 ${
              selectedImage === "gallery" ? "selected" : ""
            }`}
            onClick={() => {
              handleImageSelection("gallery");
            }}
          >
            <div className="flex flex-col justify-center items-center">
            <FontAwesomeIcon icon={faCircleUser} className="font-bold text-7xl" />
              <h2 className="text-lg font-bold mt-2 text-center">
                from ig-story
              </h2>
            </div>
          </div>
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
                    Selected Image :
                  </h2>
                  <h2 className="text-lg font-bold items-center">None</h2>
                </div>
              </div>
            )}
          </div>

          {/* bottom */}
          {selectedImage ? (
            <Link to="/ai-scan/confirm">
              <div className="flex row justify-center items-center">
                <button className="btn btn-primary w-1/3 max-w-xs">
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
