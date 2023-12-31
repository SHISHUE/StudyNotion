import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { BiSolidEdit } from "react-icons/bi";

function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  console.log("DASHBOARD ME USER KA DATA AA RAHA HAI...", user);
  const navigate = useNavigate();

  return (
    <div className="text-white flax flex-col gap-5 p-8">
      <h1 className="text-richblack-5 text-[30px] font-medium leading-[38px] mb-[5%]">
        My Profile
      </h1>

      {/* section 1  */}
      <div className="p-4 px-7 bg-richblack-800 rounded-xl flex w-full justify-between items-center mb-[3%]">
        <div className="flex items-center gap-5">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div>
            <p className="text-richblack-5 text-[18px] leading-[26px] font-semibold">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-[#838894] text-[16px] leading-[24px] font-inter">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex gap-x-2">
          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <BiSolidEdit />
          </IconBtn>
        </div>
      </div>

      {/* Section 2  */}
      <div className="p-4 px-5 bg-richblack-800 rounded-xl flex w-full justify-between items-center mb-[3%]">
        <div className="flex justify-between p-3 items-center w-full">
          <div className="flex flex-col gap-3">
            <p className="text-richblack-5 text-[18px] leading-[26px] font-semibold">
              About
            </p>
            <p className="text-[#838894] text-[16px] leading-[24px] font-inter">
              {user?.additionalDetails.about ??
                "Write Something About yourself..."}
            </p>
          </div>
          <div className="flex gap-x-2">
            <IconBtn
              text="Edit"
              onClick={() => {
                navigate("/dashboard/settings");
              }}
            >
              <BiSolidEdit />
            </IconBtn>
          </div>
        </div>
      </div>

      {/* Section 3  */}
      <div className="p-4 px-5 bg-richblack-800 rounded-xl flex w-full justify-between items-center mb-[3%]">
        <div className="w-full">
          <div className=" flex justify-between p-3">
            <h1 className="text-richblack-5 text-[18px] leading-[26px] font-semibold">
              Personal Details
            </h1>
            <div className="flex items-center gap-1">
              <IconBtn
                text="Edit"
                onClick={() => {
                  navigate("/dashboard/settings");
                }}
              >
                <BiSolidEdit />
              </IconBtn>
            </div>
          </div>

          <div className="flex gap-[250px] p-3">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-[14px] leading-[22px] text-[#424854]">
                  First Name
                </p>
                <p className="text-[14px] leading-[22px] text-richblack-5">
                  {user?.firstName}
                </p>
              </div>

              <div>
                <p className="text-[14px] leading-[22px] text-[#424854]">
                  Gender
                </p>
                <p className="text-[14px] leading-[22px] text-richblack-5">
                  {user?.additionalDetails?.gender ?? "Add Gender"}
                </p>
              </div>

              <div className="">
                <p className="text-[14px] leading-[22px] text-[#424854]">
                  Email
                </p>
                <p className="text-[14px] leading-[22px] text-richblack-5">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="">
                <p className="text-[14px] leading-[22px] text-[#424854]">
                  Last Name
                </p>
                <p className="text-[14px] leading-[22px] text-richblack-5">
                  {user?.lastName}
                </p>
              </div>

              <div>
                <p className="text-[14px] leading-[22px] text-[#424854]">
                  Contact
                </p>
                <p className="text-[14px] leading-[22px] text-richblack-5">
                  {user?.additionalDetails?.contactNumber ??
                    "Add Contact Number"}
                </p>
              </div>

              <div>
                <p className="text-[14px] leading-[22px] text-[#424854]">
                  Date of Birth
                </p>
                <p className="text-[14px] leading-[22px] text-richblack-5">
                  {user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
