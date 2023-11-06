import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
//lugie modify
import { useSelector } from "react-redux";

const pieParams = { height: 200, margin: { right: 5 } };

export default function PieAll() {
  //lugie modify
  const nutri = useSelector((state) => state.nutrition);

  function findPercentage(achieve, goals) {
    const percentage = (achieve / goals) * 100;
    return Math.round(percentage);
  }

  //lugie modify **********
  return (
    <Stack direction="row" width="100%" textAlign="center" spacing={2}>
      <Box flexGrow={1}>
        <>
          <div className="text-center font-bold">ภาพรวมรายวัน</div>
          <PieChart
            series={[
              {
                data: [
                  {
                    value: findPercentage(nutri.ach_carb, nutri.ach_g),
                    color: "#673ab7",
                  }, //carb
                  {
                    value: findPercentage(nutri.ach_protein, nutri.ach_g),
                    color: "#e51c23",
                  }, //protein
                  {
                    value: findPercentage(nutri.ach_fat, nutri.ach_g),
                    color: "#ffc107",
                  }, //fat
                  {
                    value: findPercentage(nutri.ach_veg, nutri.ach_g),
                    color: "#259b24",
                  }, //veg
                  {
                    value: findPercentage(nutri.ach_sugar, nutri.ach_g),
                    color: "#03a9f4",
                  }, //sugar
                  {
                    value: findPercentage(nutri.ach_salt, nutri.ach_g),
                    color: "#3f51b5",
                  }, //salt
                ],

                innerRadius: 20, //ช่องว่าง ตรงกลาง/ระหว่างส่วน วงใน
                outerRadius: 80, //ช่องว่าง ตรงกลาง/ระหว่างส่วน วงนอก
                paddingAngle: 2, //ส่วน เพิ่มหมุนขวา / หมุนซ้าย
                cornerRadius: 5, //มุมของวงกลม
                startAngle: -180, //ส่วน เพิ่มหมุนขวา / ลบหมุนซ้าย *ส่วนขวาอยู่ที่เดิม
                endAngle: 180, //ส่วน เพิ่มหมุนขวา / ลบหมุนซ้าย *ส่วนซ้ายอยู่ที่เดิม
                cx: 150, //ขยับแนวนอนทั้งรูป
                cy: 90, //ขยับแนวตั้งทั้งรูป
              },
            ]}
            {...pieParams}
          />
          <h3 className="card-title flex justify-center text-center leading-none">
            {nutri.ach_kcal}
          </h3>
          <h3 className="card-title flex justify-center text-center leading-none mb-4">
            Total Kcal
          </h3>
          <div className="badge badge bg-purple-600 text-white">
            คาร์โบไฮเดรต
          </div>
          <div className="badge badge bg-red-600 text-white">โปรตีน</div>
          <div className="badge badge bg-yellow-400 text-white">ไขมัน</div>
          <div className="badge badge bg-green-600 text-white">ผัก</div>
          <div className="badge badge bg-blue-400 text-white">น้ำตาล</div>
          <div className="badge badge bg-indigo-500 text-white">เกลือ</div>
        </>

        {/* <div className="text-center font-bold mt-4">ภาพรวมรายเดือน</div>
        <PieChart
          series={[
            {
              data: [
                { value: 10, color: "#ffc107" },
                { value: 15, color: "#e51c23" },
                { value: 50, color: "#259b24" },
              ],

              innerRadius: 60, //ช่องว่าง ตรงกลาง/ระหว่างส่วน วงใน
              outerRadius: 80, //ช่องว่าง ตรงกลาง/ระหว่างส่วน วงนอก
              paddingAngle: 2, //ส่วน เพิ่มหมุนขวา / หมุนซ้าย
              cornerRadius: 5, //มุมของวงกลม
              startAngle: -180, //ส่วน เพิ่มหมุนขวา / ลบหมุนซ้าย *ส่วนขวาอยู่ที่เดิม
              endAngle: 180, //ส่วน เพิ่มหมุนขวา / ลบหมุนซ้าย *ส่วนซ้ายอยู่ที่เดิม
              cx: 150, //ขยับแนวนอนทั้งรูป
              cy: 90, //ขยับแนวตั้งทั้งรูป
            },
          ]}
          {...pieParams}
        />
        <div className="badge badge bg-yellow-400 text-white">
          กินเกินโภชนาการ
        </div>
        <div className="badge badge bg-red-600 text-white">กินขาดโภชนาการ</div>
        <div className="badge badge bg-green-600 text-white">
          กินตรงตามโภชนาการ
        </div> */}
      </Box>
    </Stack>
  );
}
