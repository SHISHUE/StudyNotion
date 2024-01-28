import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";
import { categories } from "../apis";

const {
  COURSE_DETAILS_API,
  EDIT_COURSE_API,
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
  CREATE_RATING_API,
} = courseEndpoints;

const { CATEGORIES_API } = categories;

// GET ALL COURSES
export async function fetchInstructorCourses(token) {
  // console.log("BEFORE CALLING BACKEND...", token);
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const res = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSE_API, null, {
      Authorization: `Bearer ${token}`,
    });

    // console.log(" GET_ALL_INSTRUCTOR_COURSE_API Response:", res);

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    // toast.dismiss(toastId);
    result = res?.data?.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    toast.error("An error occurred. Please try again.");
    throw error; // Re-throw the error to propagate it to the calling code
  }

  toast.dismiss(toastId);
  return result;
}

export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const res = await apiConnector("GET", CATEGORIES_API);
    // console.log("COURSE CATEGORIES API RESPONSE........", res);
    if (!res?.data?.success) {
      throw new Error("Could Not Fatch Course Categories");
    }
    result = res?.data?.allCategorys;
  } catch (error) {
    // console.log("COURSE CATEGORIES API ERROR ", error.message);
    toast.error(error.message);
  }
  return result;
};

export const addCourseDetails = async (formData, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    // console.log("API CALLING ME FORMDATA...", formData, token);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    formData.append("token", token);

    // console.log(formDataObject);
    const res = await apiConnector("POST", CREATE_COURSE_API, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${token}`,
      },
    });
    // console.log("CREATE COURSE API RESPONSE....", res);
    if (res?.data?.data?.success) {
      throw new Error("Could Not Add Course Details");
    }
    toast.success("Course Created");
    result = res?.data?.data;
    // console.log("Result ke baad", res?.data?.data)
  } catch (error) {
    // console.log("ERROR WHILE CREATING A COURSE....", error.message);
  } finally {
    toast.dismiss(toastId);
  }
  return result;
};

export const editCourseDetails = async (formData, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    // console.log("API CALLING ME FORMDATA...", formData, token);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    formData.append("token", token);

    // console.log(formDataObject);

    const res = await apiConnector("POST", EDIT_COURSE_API, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${token}`,
      },
    });
    // console.log("UPDATE COURSE API RESPONSE....", res);
    if (res?.data?.success) {
      throw new Error("Could Not update Course Details");
    }
    toast.success("Course Updated");
    result = res?.data?.data;
  } catch (error) {
    // console.log("ERROR WHILE UPDATING A COURSE....", error.message);
  } finally {
    toast.dismiss(toastId);
  }
  return result;
};

export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const res = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("UPDATE SECTION API RESPONSE.......", res);
    if (!res?.data?.success) {
      throw new Error("Could not update Section");
    }

    toast.success("Course Section Updated");
    result = res?.data?.data;
  } catch (error) {
    // console.log("UPDATED SECTION API ERROR.....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const res = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("CREATE SECTION API RESPONSE.......", res);
    if (!res?.data?.success) {
      throw new Error("Could not create Section");
    }

    toast.success("Course section created");
    result = res?.data?.data;
  } catch (error) {
    // console.log("CREATE SECTION API ERROR.....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  // console.log("DELETE SECTION KE AANDER DATA ", data, token);

  try {
    const res = await apiConnector("DELETE", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("DELETE SECTION API RESPONSE.......", res);
    if (!res?.data?.success) {
      throw new Error("Could not delete Section");
    }

    toast.success("Course section deleted");
    // console.log("INSIDE API CALLING FOR DELETING SECTION", res);
    result = res?.data?.data;
  } catch (error) {
    // console.log("DELETE SECTION API ERROR.....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const res = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("DELETE SUBSECTION API RESPONSE.......", res);
    if (!res?.data?.success) {
      throw new Error("Could not delete SubSection");
    }

    toast.success("Course SubSection deleted");
    result = res?.data?.data;
  } catch (error) {
    // console.log("DELETE SUBSECTION API ERROR.....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSubSection = async (formData, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    // console.log("API CALLING ME FORMDATA...", formData, token);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    formData.append("token", token);

    // console.log(formDataObject);
    const res = await apiConnector("POST", CREATE_SUBSECTION_API, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${token}`,
      },
    });
    // console.log("CREATE SUBSECTION API RESPONSE....", res);
    if (res?.data?.data?.success) {
      throw new Error("Could Not Create Subsection Details");
    }
    toast.success("Subsection Created");
    result = res?.data?.data;
    // console.log("Result ke baad", res?.data?.data)
  } catch (error) {
    // console.log("ERROR WHILE CREATING A SUBSECTION....", error.message);
  } finally {
    toast.dismiss(toastId);
  }
  return result;
};

export const updateSubSection = async (formData, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    // console.log("API CALLING ME FORMDATA...", formData, token);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    formData.append("token", token);

    // console.log(formDataObject);
    const res = await apiConnector("POST", UPDATE_SUBSECTION_API, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${token}`,
      },
    });
    // console.log("UPDATE SUBSECTION API RESPONSE....", res);
    if (res?.data?.data?.success) {
      throw new Error("Could Not Update Subsection Details");
    }
    toast.success("Subsection Updated");
    result = res?.data?.data;
    // console.log("Result ke baad", res?.data?.data)
  } catch (error) {
    // console.log("ERROR WHILE UPDATING A SUBSECTION....", error.message);
  } finally {
    toast.dismiss(toastId);
  }
  return result;
};

export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");

  // console.log("DELETE SECTION KE AANDER DATA ", data, token);

  try {
    const res = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("DELETE COURSE API RESPONSE.......", res);
    if (!res?.data?.success) {
      throw new Error("Could not delete Course");
    }

    toast.success("Course deleted");
    // console.log("INSIDE API CALLING FOR DELETING COURSE", res);
  } catch (error) {
    // console.log("DELETE COURSE API ERROR.....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};

export const getFullDetailsOfCourse = async (courseId, token) => {
  // console.log("BEFORE CALLING BACKEND...", token, courseId);
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const res = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENDICATED,
      { courseId: courseId },
      { Authorization: `Bearer ${token}`,}
    );
    // console.log(" COURSE_DETAILS_API Response:", res);

    if (!res.data.success) {
      throw new Error(res.data.message);
    };
    // toast.dismiss(toastId);
    result = res?.data?.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    toast.error("An error occurred. Please try again.");
    throw error; // Re-throw the error to propagate it to the calling code
  }

  toast.dismiss(toastId);
  return result;
};


export const fetchCourseDetails = async(courseId) => {
  const toastId = toast.loading("Loading...");
  let result = null
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {courseId})
    // console.log("COURSE_DETAILS_API RES.....", response)

    if(!response.data.success) {
      throw new Error(response.data.message)
    }

    result = response?.data?.data;


  } catch (error) {
    console.error("Error fetching courses:", error);
    toast.error("An error occurred. Please try again.");
    throw error;
  }

  toast.dismiss(toastId);
  return result;
}

export const createRating = async(data,token) => {
  const toastId = toast.loading("Loading...");

  try {
    const res = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("CREATE SECTION API RESPONSE.......", res);
    if (!res?.data?.success) {
      throw new Error("Could not create Review");
    }

    toast.success("Review Submitted");

  } catch (error) {
    // console.log("CREATE REVIEW API ERROR.....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
}

export const markLectureAsComplete = async(data,token) => {
  const toastId = toast.loading("Loading...");

  try {
    await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("CREATE SECTION API RESPONSE.......", res);


    toast.success("Lecture Completed");

  } catch (error) {
    // console.log(" API ERROR.....", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
}