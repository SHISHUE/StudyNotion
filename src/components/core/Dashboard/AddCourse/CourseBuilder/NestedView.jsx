import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdKeyboardDoubleArrowDown  } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { setCourse } from "../../../../../slices/courseSlice";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseAPI";

function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course);
  const token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  // console.log("NESTEDVIEW KE AANDER HU CouRSE....", course);

  const handlerDeleteSection = async(sectionId) => {
    const result = await deleteSection({sectionId, courseId: course._id, token})

    if(result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null);

  };

  const handleDeleteSubSection = async(subSectionId, sectionId) => {
    const result = await deleteSubSection({subSectionId, sectionId, token});

    if(result) {
      //extra kya kr sakte hai
      const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section);
      const updatedCourse = {...course, courseContent: updatedCourseContent}
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null);

  };

  return (
    <div className="mt-10 rounded-lg bg-richblack-700 p-6 px-4 relative">
      <div className="cursor-pointer relative ">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex items-center justify-between gap-3 border-b-2">
              <div className="text-richblack-5 flex items-center gap-x-3">
                <RxDropdownMenu />
                <p>{section.sectionName}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleChangeEditSectionName(
                    section._id,
                    section.sectionName
                  )}
                >
                  <FiEdit />
                </button>

                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Delete this section",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handlerDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <RiDeleteBin5Line />
                </button>
                <span>|</span>
                <MdKeyboardDoubleArrowDown className={`text-xl text-richblack-300`} />
              </div>
            </summary>

            <div>
              {section?.subSection?.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex items-center justify-between gap-x-3 border-b-2 ml-3 my-2"
                >
                  <div className="text-richblack-5 flex items-center gap-x-3">
                    <RxDropdownMenu />
                    <p>{data?.title}</p>
                  </div>

                  <div className="flex items-center gap-x-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Delete this Sub section",
                          text2:
                            "current lectures in this sub section will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        });
                      }}
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setAddSubSection(section._id)}
                className="mt-4 flex items-center gap-x-2 text-[#DDF06A]"
              >
                <AiOutlinePlus />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}

      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default NestedView;
