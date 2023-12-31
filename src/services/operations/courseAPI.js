import {toast} from "react-hot-toast";

import {setLoading, setUser} from '../../slices/profileSlice';
import {apiConnector} from '../apiconnector';
import {courseEndpoints} from '../apis'
import { categories } from "../apis";


const {
    GET_ALL_COURSE_API,
    COURSE_DETAILS_API,
    EDIT_COURSE_API,
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSE_API,
    DELETE_SECTION_API, 
    DELETE_SUBSECTION_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENDICATED,
    LECTURE_COMPLETION_API,
    CREATE_RATING_API
} = courseEndpoints

const {CATEGORIES_API} = categories

// GET ALL COURSES
export async function getAllCourses(){
     // console.log("BEFORE CALLING BACKEND...", token);
     const toastId = toast.loading("Loading...");
     let result = [];
     
     try {
         const res = await apiConnector("GET",  GET_ALL_COURSE_API);
 
         console.log(" GET_ALL_COURSE_API Response:", res);
 
         if (!res.data.success) {
             throw new Error(res.data.message);
         }
 
         // toast.dismiss(toastId);
         result = res.data.data;
 
     } catch (error) {
         console.error("Error fetching courses:", error);
         toast.error("An error occurred. Please try again.");
         throw error; // Re-throw the error to propagate it to the calling code
     } 
      
     toast.dismiss(toastId);
     return result;
}

export const fetchCourseCategories = async() => {
    let result =[]
    try {
        const res = await apiConnector("GET", CATEGORIES_API)
        console.log("COURSE CATEGORIES API RESPONSE........", res)
        if(!res?.data?.success) {
            throw new Error("Could Not Fatch Course Categories")
        }
        result = res?.data?.allCategorys
    } catch (error) {
        console.log("COURSE CATEGORIES API ERROR ", error.message)
        toast.error(error.message)
    }
    return result
}

export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const res = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE COURSE API RESPONSE....", res)
        if(res?.data?.success) {
            throw new Error("Could Not Add Course Details");
        }
        toast.success("Course Created");
        result = res?.data?.data
    } catch (error) {
        console.log("ERROR WHILE CREATING A COURSE....", error.message);
    } finally {
        toast.dismiss(toastId)
    }
    return result;
}

export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const res = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE COURSE API RESPONSE....", res)
        if(res?.data?.success) {
            throw new Error("Could Not update Course Details");
        }
        toast.success("Course Created");
        result = res?.data?.data
    } catch (error) {
        console.log("ERROR WHILE UPDATING A COURSE....", error.message);
    } finally{
        toast.dismiss(toastId)
    }
    return result;
}