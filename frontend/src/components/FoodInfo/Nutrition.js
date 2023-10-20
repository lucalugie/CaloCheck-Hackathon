import React from "react";
import DonutChart from "react-donut-chart";

function Nutrition() {
  return (
    <>
      <div> test</div>
      // things I would never do:
      <DonutChart
        data={[
          {
            label: "Give you up",
            value: 25,
          },
          {
            label: "",
            value: 25,
            isEmpty: true,
          },
          {
            label: "Cry",
            value: 50,
            isEmpty: true,
          },
        ]}
      />
      ;
    </>
  );
}

export default Nutrition;
