import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../services/apiconnector";
import { contactusEndpoint } from "../../../services/apis";
import { toast } from "react-hot-toast";
import { countryCode } from "../../../data/countryCode";

function ContactUsForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessfull },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("FORM KA DATA......", data);
    try {
      setLoading(true);
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        { data }
      );
      console.log("LOGGING RESPONSE >>>>>>", response);
      setLoading(false);
      toast.success("Message sent Successfull");
    } catch (error) {
      console.log("FORM SUBMITTING ME ERROR AA RAHA HAI ", error);
      setLoading(false);
      toast.error("Something Wrong");
    }
  };

  useEffect(() => {
    if (isSubmitSuccessfull) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessfull]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-5 mb-[10%]">
        <div className="flex gap-5">
          {/* firstName  */}
          <div className="flex flex-col w-[50%]">
            <label htmlFor="firstname" className='text-[14px] mb-2 text-richblack-5'>First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className='bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]'
              {...register("firstname", { required: true })}
            />
            {errors.firstname && <span>Please enter your name</span>}
          </div>

          {/* lastname  */}
          <div className="flex flex-col w-[50%]">
            <label htmlFor="firstname" className='text-[14px] mb-2 text-richblack-5'>last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              className='bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]'
              {...register("lastname")}
            />
          </div>
        </div>

        {/* email  */}
        <div className="flex flex-col">
          <label htmlFor="email" className='text-[14px] mb-2 text-richblack-5'>Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email Address"
            className='bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]'
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please enter your email address</span>}
        </div>

        {/* phoneNO  */}
        <div className="flex flex-col gap-x-10">
          <label htmlFor="phoneNo" className='text-[14px] mb-2 text-richblack-5'>Phone Number</label>
          <div className="flex gap-5 items-center justify-center">
            {/* dropDown  */}

            <select
              name="dropdown"
              id="dropdown"
              className='bg-richblack-800 text-richblack-5 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E] w-[15%]'
              {...register("countryCode", { required: true })}
            >
              {countryCode.map((elem, index) => {
                return (
                  <option
                    key={index}
                    value={elem.code}
                    className="text-richblack-5"
                  >
                    {elem.code} -{elem.name}
                  </option>
                );
              })}
            </select>

            <input
              type="tel"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 678910"
              className='bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E] w-[90%]'
              {...register("phoneNo", {
                required: true,
                maxLength: { value: 10, message: "Invaild phone number" },
                minLength: { value: 8, message: "Invaild phone number" },
              })}
            />
          </div>
          {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
        </div>

        {/* message box  */}
        <div className="flex flex-col">
          <label htmlFor="message" className='text-[14px] mb-2 text-richblack-5'>Message</label>
          <textarea
            type="text"
            name="message"
            id="message"
            placeholder="Enter your message"
            cols={30}
            rows={7}
            className='bg-richblack-800 rounded-md py-2 px-2 placeholder:text-richblack-200 shadow shadow-[#FFFFFF2E]'
            {...register("message", { required: true })}
          />
          {errors.message && <span>Please enter your message</span>}
        </div>

        {/* button  */}
        <button
          type="submit"
          className="text-center text-[13px] px-6 py-3 rounded-md font-semibold  hover:scale-95 transition-all duration-200 hover:drop-shadow-xl bg-[#ffd60a] text-richblack-800"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}

export default ContactUsForm;
