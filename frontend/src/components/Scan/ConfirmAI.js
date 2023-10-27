import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {useSelector} from "react-redux";
function ConfirmAI({ className,url,nameOFFood }) {
  const aiPage = useSelector((state) => state.aiPage);
  console.log("aiPage",aiPage.name);
  const demo = {
    image:
      "https://christieathome.com/wp-content/uploads/2022/06/Egg-Fried-Rice-3.jpg",
    name: "ข้าวผัดไข่",
  };

  const [data, setData] = useState("");

  useEffect(() => {
    setData(demo);
  }, []);

  return (
    <>   
    { aiPage.loading  ?
            <>
            Load
            </>
            :
              <div className={className}>
                    <div className="wrap w-full h-1/2">
                      <div className="card w-96 bg-base-100 border-2 border-primary shadow-xl">
                        <figure className="px-10 pt-10">
                          <img src={aiPage.url} alt="Food" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                          <h2 className="card-title">{aiPage.name}</h2>

                          <div className="card-actions">
                            <Link to="/myfood">
                              <button className="btn btn-error ">cancel</button>
                            </Link>
                            <Link to="/myfood">
                              <button className="btn btn-success ">confrim</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            }
    </>
  );
}

export default styled(ConfirmAI)`
  .wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-items: center;
  }
`;
