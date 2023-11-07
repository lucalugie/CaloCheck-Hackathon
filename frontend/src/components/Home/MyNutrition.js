import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useState} from "react";

function MyNutrition({ className }) {
  const goals = useSelector((state) => state.goals);
  const nutri = useSelector((state) => state.nutrition);

  const [goalsData, setGoalsData] = useState({
    goals_kcal: 0,
    goals_g: 0,
    goals_protein: 0,
    goals_fat: 0,
    goals_salt: 0,
    goals_sugar: 0,
    goals_veg: 0,
    goals_carb: 0,
  });

  const [nutritionData, setNutritionData] = useState({
    ach_kcal: 0,
    ach_g: 0,
    ach_protein: 0,
    ach_fat: 0,
    ach_salt: 0,
    ach_sugar: 0,
    ach_veg: 0,
    ach_carb: 0,
  });

  useEffect(() => {
    setGoalsData({
      goals_kcal: goals.goals_kcal,
      goals_g: goals.goals_g,
      goals_protein: goals.goals_protein,
      goals_fat: goals.goals_fat,
      goals_salt: goals.goals_salt,
      goals_sugar: goals.goals_sugar,
      goals_veg: goals.goals_veg,
      goals_carb: goals.goals_carb,
    });
  }, [goals]);

  useEffect(() => {
    setNutritionData({
      ach_kcal: nutri.ach_kcal,
      ach_g: nutri.ach_g,
      ach_protein: nutri.ach_protein,
      ach_fat: nutri.ach_fat,
      ach_salt: nutri.ach_salt,
      ach_sugar: nutri.ach_sugar,
      ach_veg: nutri.ach_veg,
      ach_carb: nutri.ach_carb,
    });
  }, [nutri]);




  function findPercentage(achieve, goals) {
    const percentage = (achieve / goals) * 100;
    return Math.round(percentage);
  }

  function findGoalKcalleft(achieve, goals) {
    const kcal_lef = goals - achieve;
    return Math.round(kcal_lef);
  }

  const leftPercent= findPercentage(nutritionData.ach_g, goalsData.goals_g);



  return (
    <div className={className}>
      <div className="nutritionWrap bg-primary flex flex-col pt-5">
        <div className="nutrition">
          <div className="progressWrapper left">
            <div className="progress-item">
              <p className="progress-label">โปรตีน</p>
              <progress
                className="progress progress-secondary w-60"
                value={findPercentage(
                  nutritionData.ach_protein,
                  goalsData.goals_protein
                )}
                max="100"
              ></progress>
              <p className="progress-number">
                {Math.round(nutritionData.ach_protein)}/{Math.round(goalsData.goals_protein)}
              </p>
            </div>
            <div className="progress-item">
              <p className="progress-label">ไขมัน</p>
              <progress
                className="progress progress-secondary w-56"
                value={findPercentage(
                  nutritionData.ach_fat,
                  goalsData.goals_fat
                )}
                max="100"
              ></progress>
              <p className="progress-number">
                {Math.round(nutritionData.ach_fat)}/{Math.round(goalsData.goals_fat)}
              </p>
            </div>
            <div className="progress-item">
              <p className="progress-label">เกลือ</p>
              <progress
                className="progress progress-secondary w-56"
                value={findPercentage(
                  nutritionData.ach_salt,
                  goalsData.goals_salt
                )}
                max="100"
              ></progress>
              <p className="progress-number">
              {Math.round(nutritionData.ach_salt)}/{Math.round(goalsData.goals_salt)}
              </p>
            </div>
          </div>

          <div className="radialWrapper">
            <div
              className="radial-progress bg-secondary text-primary-content border-4"
              style={{
                "--value": `${leftPercent}`,
              }}
            >
              <div className="details">
                <p>{findGoalKcalleft(nutritionData.ach_kcal, goalsData.goals_kcal)}</p>
                <p>kcal</p>
                <p className="pt-1">ที่เหลืออยู่</p>
              </div>
            </div>
          </div>

          <div className="progressWrapper right">
            <div className="progress-item">
              <p className="progress-label">ผัก</p>
              <progress
                className="progress progress-secondary w-56"
                value={findPercentage(
                  nutritionData.ach_veg,
                  goalsData.goals_veg
                )}
                max="100"
              ></progress>
              <p className="progress-number">
                {Math.round(nutritionData.ach_veg)}/{Math.round(goalsData.goals_veg)}
              </p>
            </div>
            <div className="progress-item">
              <p className="progress-label">คาร์โบไฮเดรต</p>
              <progress
                className="progress progress-secondary w-56"
                value={findPercentage(
                  nutritionData.ach_carb,
                  goalsData.goals_carb
                )}
                max="100"
              ></progress>
              <p className="progress-number">
                {Math.round(nutritionData.ach_carb)}/{Math.round(goalsData.goals_carb)}
              </p>
            </div>
            <div className="progress-item">
              <p className="progress-label">น้ำตาล</p>
              <progress
                className="progress progress-secondary w-56"
                value={findPercentage(
                  nutritionData.ach_sugar,
                  goalsData.goals_sugar
                )}
                max="100"
              ></progress>
              <p className="progress-number">
                {Math.round(nutritionData.ach_sugar)}/{Math.round(goalsData.goals_sugar)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default styled(MyNutrition)`
  .nutritionWrap {
    border-radius: 0 0 50% 50%;
    padding-bottom: 40px;
  }
  .nutrition {
    justify-content: center;
    display: flex;
    text-align: center;
    padding: 0 50px 0 50px;
  }
  .radial-progress {
    width: 150px;
    height: 150px;
    borderwidth: 8px;
    fontsize: 24px;
  }
  .radial-progress:after {
    content: none;
  }

  .details p {
    line-height: 1;
  }

  .details p:first-child {
    font-size: xx-large;
    font-weight: bold;
  }
  .radialWrapper {
    display: flex;
    align-items: center;
  }

  .radial-progress {
    position: relative;
  }

  .progressWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  progress {
    width: 60px;
  }
  .progress-label {
    line-height: 0;
    font-size: large;
  }
  .progress-number {
    line-height: 0.5;
    font-weight: bold;
  }
  .progress-item {
    margin: 20px;
  }

  .progressWrapper.left .progress-item:nth-child(1),
  .progressWrapper.left .progress-item:nth-child(3) {
    margin-left: 100px;
  }
  .progressWrapper.right .progress-item:nth-child(1),
  .progressWrapper.right .progress-item:nth-child(3) {
    margin-right: 100px;
  }

  @media (max-width: 768px) {
    .nutrition {
      flex-direction: row; /* Stack elements in a column for smaller screens */
    }

    .progressWrapper.left,
    .progressWrapper.right {
      flex-direction: column; /* Stack progress items in a column for smaller screens */
    }

    .progressWrapper.left .progress-item:nth-child(1),
    .progressWrapper.left .progress-item:nth-child(3) {
      margin-left: 80px;
    }
    .progressWrapper.right .progress-item:nth-child(1),
    .progressWrapper.right .progress-item:nth-child(3) {
      margin-right: 80px;
    }
    .progressWrapper.right .progress-item:nth-child(2) {
      margin-right: 35px;
    }

    .progress-item {
      margin: 20px; /* Reduce margin for smaller screens */
    }

    .radial-progress {
      width: 120px;
      height: 120px;
      font-size: medium;
    }
    .progress-label {
      line-height: 0;
      font-size: medium;
    }
  }
`;