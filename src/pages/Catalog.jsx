import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { useParams } from "react-router-dom";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/CourseCard";
import CourseSlider from "../components/core/Catalog/CourseSlider";


function Catalog() {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCatagorys = async () => {
      setLoading(true);
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id = res?.data?.allCategorys?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      // console.log("category_id", category_id);
      setCategoryId(category_id);
    };
    setLoading(false);
    getCatagorys();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      setLoading(true);
      try {
        const res = await getCatalogPageData(categoryId);
        // console.log("Printing res", res);
        setCatalogPageData(res);
      } catch (error) {
        // console.log(error);
      }
    };

    if (categoryId) {
      getCategoryDetails();
    }
    setLoading(false);
  }, [categoryId]);


  return (
    <div className="text-white">
      {loading ? (
        <div className="w-screen h-screen text-[32px] leading-[48px] font-semibold flex justify-center items-center">
          Loading...
        </div>
      ) : (
        <div className="text-richblack-5 w-full">
          <section className="bg-[#161D29] mx-auto w-full min-h-[12vw]  py-8">
            <div className="w-11/12 mx-auto">
              <p className="flex gap-x-1 text-[14px] leading-[22px] text-[#838894]">
                {`Home / Catalog /`}
                <span className="text-[#FFD60A]">{catalogPageData?.data?.selectedCategory?.name}</span>
              </p>
              <p className="text-[30px] leading-[38px] font-medium text-richblack-5"> {catalogPageData?.data?.selectedCategory?.name}</p>
              <p className="text-[14px] leading-[22px] text-[#999DAA]"> {catalogPageData?.data?.selectedCategory?.description}</p>
            </div>
          </section>

          <section className="w-full mx-auto ">
            {/* section 1 */}
            <div className="my-4 w-11/12 mx-auto ">
              <div className="text-[30px] leading-[38px] font-semibold text-richblack-5">Courses to get you started</div>
              <div className="flex gap-x-3 my-5 pb-2 border-b-[1px] border-[#999DAA] ">
                <p className="text-[14px] leading-[22px] text-[#FFD60A]">Most Popular</p>
                <p className="text-[14px] leading-[22px] text-[#999DAA]">New</p>
              </div>
              <div className="w-full ">
                <CourseSlider
                  Courses={catalogPageData?.data?.selectedCategory?.courses}
                />
              </div>
            </div>

            {/* Section 2 */}
            <div className="my-4 w-11/12 mx-auto">
              <p className="text-[30px] leading-[38px] font-semibold mt-5">
                Top Courses in {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <div className="my-5">
                <CourseSlider
                  Courses={catalogPageData?.data?.differentCategory?.courses}
                />
              </div>
            </div>

            {/* Section 3 */}
            <div className="my-4 w-11/12 mx-auto ">
              <div className="text-[30px] leading-[38px] font-semibold mt-5">Frequently Bought </div>
              <div className="py-8 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {catalogPageData?.data?.mostSellingCourses
                    ?.slice(0, 4)
                    .map((course, index) => (
                      <Course_Card
                        course={course}
                        key={index}
                        Height={"h-[400px]"}
                      />
                    ))}
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      )}
    </div>
  );
}

export default Catalog;
