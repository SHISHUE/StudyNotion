import React from "react";
import { IoIosChatboxes } from "react-icons/io";
import { FaEarthAsia } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import ContactUsForm from "../components/core/ContactPage/ContactUsForm";
import HighlightText from "../components/core/HomePage/HighlightText";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

function Contact() {
  return (
    <>
      <section className="w-11/12 max-w-maxContent mx-auto ">
        <h1 className="text-[46px] text-center mt-[5%] mb-[5%]">
          <HighlightText text={"Contact us"} />
        </h1>
        <div className="flex gap-5">
          {/* Left side  */}
          <div className="w-[50%] h-fit bg-[#161D29] flex flex-col gap-6 p-4 rounded-xl">
            <div className="flex gap-3">
              <IoIosChatboxes className="text-[#999DAA] w-[24px] h-[24px]" />
              <div className="flex flex-col">
                <p className="text-[18px] font-semibold leading-[26px] text-richblack-5">
                  Chat on us
                </p>
                <p className="font-medium text-[14px] leading-[22px] text-[#999DAA]">
                  Our friendly team is here to help.
                </p>
                <p className="font-medium text-[14px] leading-[22px] text-[#999DAA]">
                  studynotion@mail address
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <FaEarthAsia className="text-[#999DAA] w-[24px] h-[24px]" />
              <div className="flex flex-col">
                <p className="text-[18px] font-semibold leading-[26px] text-richblack-5">
                  Visit us
                </p>
                <p className="font-medium text-[14px] leading-[22px] text-[#999DAA]">
                  Come and say hello at our office HQ.
                </p>
                <p className="font-medium text-[14px] leading-[22px] text-[#999DAA]">
                  Here is the location123 Main Street, Suite 456
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <FaPhoneAlt className="text-[#999DAA] w-[24px] h-[24px]" />
              <div className="flex flex-col">
                <p className="text-[18px] font-semibold leading-[26px] text-richblack-5">
                  Call us
                </p>
                <p className="font-medium text-[14px] leading-[22px] text-[#999DAA]">
                  Mon - Fri From 8am to 5pm
                </p>
                <p className="font-medium text-[14px] leading-[22px] text-[#999DAA]">
                  +1 (555) 555-1234
                </p>
              </div>
            </div>
          </div>

          {/* Right side  */}
          <div className="w-[50%] flex flex-col gap-3 border-2 p-8 border-[#424854] rounded-md">
            <h1 className="font-semibold text-[36px] leading-[44px] tracking-tight text-richblack-5">
              Got a Idea? We’ve got the skills. Let’s team up
            </h1>
            <p className="text-[16px] font-medium text-richblack-200 leading-[24px] ">
              Tall us more about yourself and what you’re got in mind.
            </p>

            <ContactUsForm />
          </div>
        </div>

        {/* Review Slideer  */}
        <div className="mt-[10%] flex flex-col items-center gap-3">
          <h1 className="text-[36px] text-richblack-5 font-bold leading-[44px] text-center">
            Reviews from other learners
          </h1>
          {/* <ReviewSlider />  */}
          <ReviewSlider />
        </div>
      </section>

      {/* Footer  */}
      <Footer />
    </>
  );
}

export default Contact;
