import styled from "styled-components";

function Myinfo({ className, infoData }) {
  return (
    <div className={className}>
      <div className="myinfocard">
        <div className="card w-96 bg-base-100">
          <div className="card-body items-center text-center">
            <h3 className="card-titletwo text-accent font-bold">MY INFO</h3>
            <h2 className="card-title font-bold" style={{ lineHeight: "0" }}>
              ข้อมูลส่วนตัว
            </h2>

            <figure className="w-24 h-24 mt-2">
              <img
                src={infoData.image}
                alt="Profile Image"
                className="rounded-full w-full h-full"
              />
            </figure>
            <h3 className="card-titlethree font-bold uppercase">
              {infoData.name}
            </h3>

            {/* bottom part */}
            <div className="flex flex-col w-full">
              <div className="custom-rounded-box bg-secondary">
                <div className="grid grid-cols-2 gap-0">
                  <div className="h-20 flex flex-col items-center">
                    <div className="box pt-4">
                      <p className="attribute font-bold">{infoData.age}</p>
                      <p className="attribute-details">Age</p>
                    </div>
                  </div>
                  <div className="h-20 flex flex-col items-center">
                    <div className="box pt-4">
                      <p className="attribute font-bold capitalize">{infoData.gender}</p>
                      <p className="attribute-details">Gender</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-0">
                  <div className="h-20 flex flex-col items-center">
                    <div className="box pt-4">
                      <p className="attribute font-bold">{infoData.weight}</p>
                      <p className="attribute-details">Weight(kg.)</p>
                    </div>
                  </div>
                  <div className="h-20 flex flex-col items-center">
                    <div className="box pt-4">
                      <p className="attribute font-bold">{infoData.height}</p>
                      <p className="attribute-details">Height(cm.)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bmi font-bold">BMI: {infoData.bmi}</div>
            {/* bottom part */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default styled(Myinfo)`
  .custom-rounded-box {
    border-radius: 15px;
    overflow: hidden;
  }
  .attribute {
    font-size: x-large;
  }
  .attribute-details {
    line-height: 0;
    font-weight: bold;
  }
  .bmi {
    font-size: x-large;
  }
  .myinfocard {
    display: flex;
    justify-content: center;
  }
`;
