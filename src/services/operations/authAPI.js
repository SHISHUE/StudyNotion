import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { endpoints } from "../apis";

import { setToken } from "../../slices/authSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      // console.log("SENDOTP API RESPONSE........", response);
      // console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      // console.log("SENDOTP API ERROR...........", error);
      toast.error("Cloud not send otp");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  accountType,
  contactNumber,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp,
      });

      // console.log("SIGNUP API RESOPONSE..............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successfull");
      navigate("/login");
    } catch (error) {
      // console.log("SINGUP API ERROR.......", error);
      toast.error("Signup Failed");
      navigate("/signup");
    } //finally{
    //     const response = {
    //         firstName,
    //         lastName,
    //         email,
    //         password,
    //         confirmPassword,
    //         accountType,
    //         contactNumber,
    //         otp,
    //         navigate
    //     }
    //     console.log("FINALLY ME HAI YEH........", response);
    // }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

//login
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      // console.log("LOGIN API RESPONSE........", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const userImage = response.data?.user?.image
      ? response.data?.user?.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}${response.data.lastName}`;
      
      dispatch(setUser({ ...response.data.user, image: userImage }));
      // console.log("After SetUser: ", response.data.user)
      localStorage.setItem("token", JSON.stringify(response.data.data));
      // console.log("Token jo store ho raha hai woh...",response.data.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Login Successful");
      navigate("/dashboard/my-profile");
      dispatch(setToken(response.data.token));
    } catch (error) {
      // console.log("LOGIN API ERROR...............", error);
      toast.error("Login failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    localStorage.clear();
    navigate("/");
    toast.success('Logged Out');
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      // console.log("RESET PASSWORD TOKEN RES.......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email send");
      setEmailSent(true);
    } catch (error) {
      // console.log("REST PASSWORD TOKEN ERROR.....", error);
      toast.error("Failed to send email for reseting password.");
    }
    dispatch(setLoading(false));
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      // console.log("RESET PASSWORD RESPONSE.....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      // console.log("RESET PASSWORD ERROR......", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  };
}
