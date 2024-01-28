import {toast} from "react-hot-toast";

import {setLoading, setUser} from '../../slices/profileSlice';
import {apiConnector} from '../apiconnector';
import {profileEndpoints} from '../apis';
import {logout} from '../operations/authAPI';

const {GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API} = profileEndpoints

export function getUserDetails(token, navigate) {

}

export async function getUserEnrolledCourses(token) {
    // console.log("BEFORE CALLING BACKEND...", token);
    const toastId = toast.loading("Loading...");
    let result = [];
    
    try {
        const res = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
        Authorization: `Bearer ${token}`,
        });

        // console.log("GET_USER_ENROLLED_COURSES_API Response:", res);

        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        // toast.dismiss(toastId);
        result = res.data.data;

    } catch (error) {
        console.error("Error fetching user enrolled courses:", error);
        toast.error("An error occurred. Please try again.");
        throw error; // Re-throw the error to propagate it to the calling code
    } 
     
    toast.dismiss(toastId);
    return result;
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    
    try {
        const res = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
        Authorization: `Bearer ${token}`,
        });

        // console.log("GET_USER_ENROLLED_COURSES_API Response:", res);

        if (!res.data.success) {
            throw new Error(res?.data?.message);
        }

        // toast.dismiss(toastId);
        result = res?.data?.courses;

    } catch (error) {
        console.error("Error fetching user instructor courses:", error);
        toast.error("An error occurred. Please try again.");
        throw error; // Re-throw the error to propagate it to the calling code
    } 
     
    toast.dismiss(toastId);
    return result;
}