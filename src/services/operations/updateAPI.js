import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import {logout} from '../operations/authAPI';

import { settingsEndpoints } from "../apis";



const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
  } = settingsEndpoints;


//   Profile picture Update 
export function updateprofile(token, email, file) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        console.log("UPLOADING ME TOKEN", token, email, file);
        dispatch(setLoading(true));

        try {
            const formData = new FormData();
            formData.append("token", token);
            formData.append("email", email);
            formData.append("displayPicture", file);

            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
                header: {
                    "Content-Type": "multipart/form-data",  // Important for file uploads
                },
            });

            console.log("UPDATE PROFILE PICTURE API RESPONSE........", response);
            dispatch(setUser(response.data.data));
            localStorage.setItem("user", JSON.stringify(response.data.data));

            if (!response) {
                throw new Error(response.data.message);
            }

            toast.success("Picture Updated");
            //   navigate("/verify-email");
        } catch (error) {
            console.log("Updating picture API ERROR...........", error);
            toast.error("Something wrong!");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

//Profile Information Update
export function updateprofileInfo(gender, dob, phonenumber, about, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        console.log("INFORMATION UPLOADING ME TOKEN", gender, dob, phonenumber, about, token);
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, {
                token: token,
                gender: gender,
                dateOfBirth: dob,
                contactNumber: phonenumber,
                about: about

            });

            console.log("UPDATE PROFILE INFO. API RESPONSE........", response);
            dispatch(setUser(response.data.data));
            localStorage.setItem("user", JSON.stringify(response.data.data));

            if (!response) {
                throw new Error(response.data.message);
            }

            toast.success("Infomation Updated");
            //   navigate("/verify-email");
        } catch (error) {
            console.log("Updating Information API ERROR...........", error);
            toast.error("Something wrong!");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}


//Change Password 
export function changePassword(token, password, newPassword, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        console.log("CHANGEPASSWORD UPLOADING ME TOKEN", password, newPassword, token);
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", CHANGE_PASSWORD_API, {
                token: token,
                oldPassword: password,
                newPassword: newPassword,
                confirmPassword: newPassword
            });

            console.log("CHANGE PASSWORD API RESPONSE........", response);
           

            if (!response) {
                throw new Error(response.data.message);
            }

            toast.success("Password Changed");
            dispatch(logout(navigate))
        } catch (error) {
            console.log("Password Changing API ERROR...........", error);
            toast.error("Something wrong!");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

//Delete Account 
export function deleteAccount(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        console.log("Delete Account ME TOKEN",token);
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, {
                token: token,
            });

            console.log("DELETE API RESPONSE........", response);
           

            if (!response) {
                throw new Error(response.data.message);
            }

            toast.success("Account Deleted Successfully");
            dispatch(logout(navigate))
            navigate("/")
        } catch (error) {
            console.log("Account Deleting API ERROR...........", error);
            toast.error("Something wrong!");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}