import React, { useState } from "react";

import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students");
  // console.log("INSTRUCTOR", courses);

  const getRandomColors = (numColors) => {
    const colors = [];
    for (let index = 0; index < numColors; index++) {
      const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;

      colors.push(color);
    }
    return colors;
  };

  //Create data for chart displaying student info

  const chartDataForStudents = {
    labels: courses?.map((course) => course.courseTitle),
    datasets: [
      {
        data: courses?.map((course) => course.totalStudentEnrolled),
        backgroundColor: getRandomColors(courses?.length),
      },
    ],
  };

  const chartDataForIncome = {
    labels: courses?.map((course) => course.courseTitle),
    datasets: [
      {
        data: courses?.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandomColors(courses?.length),
      },
    ],
  };

  //Options
  const options = {};

  return (
    <div className="w-[60%] bg-richblack-700 p-2 rounded flex flex-col gap-2 ">
      <h1 className="text-[24px] leading-[24px] font-semibold">Visulaise</h1>
      <div className="mt-2 flex gap-2 mx-2">
        <button onClick={() => setCurrChart("students")} className="bg-[#000] text-richblack-5 hover:bg-richblack-5 hover:text-richblack-900 transition-all duration-200 px-2 py-1 rounded-md">Student</button>
        <button onClick={() => setCurrChart("income")} className="bg-[#fff] text-richblack-900 hover:bg-richblack-900 hover:text-richblack-5 transition-all duration-200 px-2 py-1 rounded-md">Income</button>
      </div>
      <div className="w-[95%]">
        <Pie
          data={
            currChart === "students" ? chartDataForStudents : chartDataForIncome
          }
          options={options}
        />
      </div>
    </div>
  );
}

export default InstructorChart;
