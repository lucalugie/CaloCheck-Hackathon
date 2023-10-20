import styled from "styled-components";

function MyNutrition({ className }) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <div className={className}>
      <div className="nutritionWrap bg-primary flex flex-col">
        <div className="nutriNavbar flex flex-row justify-between">
          <div className="m-4 ml-6 font-bold">Today</div>
          <div className="join border-transparent ">
            <button className="join-item btn bg-transparent border-transparent hover:bg-transparent hover:border-transparent">
              «
            </button>
            <button className="join-item btn font-bold bg-transparent border-transparent hover:bg-transparent hover:border-transparent">
              {formattedDate}
            </button>
            <button className="join-item btn bg-transparent border-transparent hover:bg-transparent hover:border-transparent">
              »
            </button>
          </div>
        </div>

        <div className="nutrition">
          <div className="progressWrapper left">
            <div className="progress-item">
              <p className="progress-label">โปรตีน</p>
              <progress
                className="progress progress-secondary w-60"
                value={0}
                max="100"
              ></progress>
              <p className="progress-number">0/70</p>
            </div>
            <div className="progress-item">
              <p className="progress-label">ไขมัน</p>
              <progress
                className="progress progress-secondary w-56"
                value="10"
                max="100"
              ></progress>
              <p className="progress-number">5/44</p>
            </div>
            <div className="progress-item">
              <p className="progress-label">เกลือ</p>
              <progress
                className="progress progress-secondary w-56"
                value="40"
                max="100"
              ></progress>
              <p className="progress-number">10/23</p>
            </div>
          </div>

          <div className="radialWrapper">
            <div
              className="radial-progress bg-secondary text-primary-content border-4"
              style={{
                "--value": 70,
              }}
            >
              <div className="details">
                <p>117</p>
                <p>ที่เหลืออยู่</p>
              </div>
            </div>
          </div>

          <div className="progressWrapper right">
            <div className="progress-item">
              <p className="progress-label">ผัก</p>
              <progress
                className="progress progress-secondary w-56"
                value="90"
                max="100"
              ></progress>
              <p className="progress-number">4/5</p>
            </div>
            <div className="progress-item">
              <p className="progress-label">คาร์โบไฮเดรต</p>
              <progress
                className="progress progress-secondary w-56"
                value="70"
                max="100"
              ></progress>
              <p className="progress-number">195/225</p>
            </div>
            <div className="progress-item">
              <p className="progress-label">น้ำตาล</p>
              <progress
                className="progress progress-secondary w-56"
                value="100"
                max="100"
              ></progress>
              <p className="progress-number">23/23</p>
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
