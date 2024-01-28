import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import Frame37 from "../assest/images/Frame 37 (1).svg";
import Frame46 from "../assest/images/Frame 46.svg";
import Frame47 from "../assest/images/Frame 47.svg";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import Qoute from "../components/core/AboutPage/Quote";
import FoundingStory from "../assest/images/HTML_source_code_example 1.svg";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

function About() {
  return (
    <div>
      {/* Section 1 */}
      <section className="bg-[#161D29] h-screen w-full relative flex flex-col items-center">
          <div className="flex flex-col gap-[38px] w-[60%] mt-[7%]">
            <p className=" text-white opacity-50 text-center">About us</p>
            <h1 className="text-[36px] text-richblack-5 text-center font-semibold leading-[44px] ">
              Driving Innovation in Online Education for a{" "}
              <HighlightText text={"Brighter Future"} />
            </h1>
            <p className="text-[#838894] text-md leading-[24px] text-center ">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>
          <div className="flex gap-x-3 mx-auto absolute top-[70%]">
            <img src={Frame37} alt="" />
            <img src={Frame46} alt=""  />
            <img src={Frame47} alt="" />
          </div>
        </section>
      <div className="w-11/12 text-white max-w-maxContent mx-auto">
        

        {/* Section 2  */}
        <section className="bg-richblack-900 mt-[20%] mb-[10%]">
          <div className="text-[36px]">
            <RiDoubleQuotesL  className="mr-auto text-[#424854]"/>
            <Qoute />
            <RiDoubleQuotesR  className="ml-auto text-[#424854]"/>
          </div>
        </section>

        {/* Section 3  */}
        <section className="bg-richblack-900 mx-auto mb-[10%]">
          <div className="flex flex-col ">
            {/* FoundingStory Wala div  */}
            <div className="flex gap-5 items-center justify-between mb-[8%]">
              <div className="w-[50%] mx-auto flex flex-col gap-5">
                <h1 className="text-[36px] font-semibold leading-[44px] tracking-tight text-color3">Our Founding Story</h1>
                <p className="text-[16px] font-medium leading-[24px] text-[#838894] w-[80%]">
                  Our e-learning platform was born out of a shared vision and
                  passion for transforming education. It all began with a group
                  of educators, technologists, and lifelong learners who
                  recognized the need for accessible, flexible, and high-quality
                  learning opportunities in a rapidly evolving digital world.
                </p>

                <p  className="text-[16px] font-medium leading-[24px] text-[#838894] w-[80%]">
                  As experienced educators ourselves, we witnessed firsthand the
                  limitations and challenges of traditional education systems.
                  We believed that education should not be confined to the walls
                  of a classroom or restricted by geographical boundaries. We
                  envisioned a platform that could bridge these gaps and empower
                  individuals from all walks of life to unlock their full
                  potential.
                </p>
              </div>

              <div>
                <img src={FoundingStory} alt="" />
              </div>
            </div>
          </div>
          {/* Vision and mission wala parent div  */}
          <div className="flex gap-34 items-center justify-between ">
            {/* left box */}
            <div className="flex flex-col w-[50%] ml-[4%]">
              <h1 className="text-[36px] font-semibold text-color2">Our Vision</h1>
              <p className="text-[16px] font-medium leading-[24px] text-[#838894] w-[80%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            {/* Right box */}
            <div className="flex flex-col w-[50%] ml-[14%]">
              <h1 className="text-[36px] font-semibold text-color">Our Mission</h1>
              <p className="text-[16px] font-medium leading-[24px] text-[#838894] w-[80%]">
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4  */}
        <StatsComponent />

        {/* Section 5  */}
        <section className="mx-auto flex flex-col items-center justify-between gap-5">
          <LearningGrid />
          <ContactFormSection />
        </section>

        {/* section 6 */}
        <section className="mx-auto flex flex-col items-center justify-between gap-5">
          
          <h2 className="text-center text-4xl font-semibold mt-10">
          Review from other Learners
        </h2>
        {/* Review slider */}
        <ReviewSlider />
          
        </section>
      </div>

      {/* Footer  */}
      <Footer />
    </div>
  );
}

export default About;
