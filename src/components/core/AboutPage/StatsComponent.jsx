import React from "react";

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

function StatsComponent() {
  return (
    <section className="bg-richblack-800 -mx-[4.5%] h-[200px] mb-[10%]">
      <div className="flex gap-5 justify-center">
        <div className="flex gap-x-16 text-center w-[100%] justify-evenly  mt-[6%]">
          {Stats.map((data, index) => {
            return (
              <div key={index}>
                <h1 className="text-richblack-5 font-bold text-[30px] leading-[38px] ">{data.count}</h1>
                <h2 className="font-semibold text-[16px] leading-[24px] text-richblack-200">{data.label}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StatsComponent;
