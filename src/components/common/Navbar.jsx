import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assest/logo/main-Logo.svg";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation, matchPath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { FaAngleDown } from "react-icons/fa";
import { RiDashboard3Fill } from "react-icons/ri";
import { IoExit } from "react-icons/io5";

import { logout } from "../../services/operations/authAPI";


// const subLinks = [
//   {
//     title: "python",
//     link: "/catelog/python",
//   },
//   {
//     title: "web dev",
//     link: "/catelog/devops",
//   },
// ];

function Navbar() {
  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async() => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.allCategorys);
      console.log("Printing result", result.data.allCategorys);
    } catch (error) {
      console.log('Could not fetch the category list');
    }
  }

  useEffect(() => {
          fetchSubLinks();
  }, [])

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItem } = useSelector((state) => state.cart);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-richblack-700">
      <div className="flex w-11/12 max-w-maxContent justify-between items-center">
        {/* Logo  */}
        <Link to="/">
          <img src={Logo} alt="logo" width={160} height={42} loading="lazy" />
        </Link>

        {/* Nav Links  */}
        <nav>
          <ul className="flex  gap-x-6 text-richblack-25">
            {NavbarLinks.map((links, index) => {
              return (
                <li key={index}>
                  {links.title === "Catalog" ? (
                    <div className="group flex items-center gap-2 relative z-10 ">
                      <p className="flex gap-2 items-center">{links.title}</p>
                      <FaAngleDown className="text-richblack-5" />

                      <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[40%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded translate-y-[-40%] translate-x-[80%] bg-richblack-5 "></div>

                        {subLinks.length ? (
                          subLinks.map((subLink, index) => (
                            <Link key={index} to={`/${subLink.name}`}>
                              <p>{subLink.name}</p>
                            </Link>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={links?.path}>
                      <p
                        className={`${
                          matchRoute(links?.path)
                            ? "text-[#fcd40b]"
                            : "text-richblack-25 hover:text-[#fcd40b] transition-all duration-200"
                        }`}
                      >
                        {links.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login,signup & dashboard Button  */}
        <div className="flex gap-x-4 items-center">
          {user && (
            <div className="relative flex gap-4 text-richblack-5 items-center justify-center ">
              <Link to="/dashboard/cart" >
                <FaCartShopping className="text-richblack-200 text-[20px]" />
                {totalItem > 0 && (
                  <span className="rounded-full text-richblack-25 bg-[#44b559]">
                    {totalItem}
                  </span>
                )}
              </Link>
              
              <div className="group relative flex flex-col gap-5 z-10">
                <img src={user.image} alt="" className="w-[3vw] aspect-square h-[3vw] object-cover rounded-full border-0 group-hover:border-2 border-richblack-5"/>
                
                <div className="bg-richblack-800 absolute -bottom-[90px] -left-[70px] invisible transition-all duration-200 opacity-0 group-hover:visible group-hover:opacity-100 rounded-md">
                  <div className="flex gap-2 items-center p-2 text-richblack-5 hover:text-richblack-200 transition-all duration-200">
                  <Link to="/dashboard/my-profile" className="flex gap-2 items-center">
                    <RiDashboard3Fill />
                    Dashboard
                  </Link>
                  </div>
                  <div onClick={() => {
                     dispatch(logout(navigate));
                    
                  }} className="flex cursor-pointer gap-2 items-center p-2 text-richblack-5 hover:text-richblack-200 transition-all duration-200">
                      <IoExit/>
                      Log Out
                  </div>
                </div>
              </div>
              

              
            </div>
          )}
          {(token === null || undefined) && (
            <Link to="/login">
              <button className="text-richblack-5 border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md border-[1px] hover:bg-richblack-900 hover:text-richblack-100 transition-all duration-200">
                Log in
              </button>
            </Link>
          )}
          {(token === null || undefined) && (
            <Link to="/signup">
              <button className="text-richblack-5 border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md border-[1px] hover:bg-richblack-900 hover:text-richblack-100 transition-all duration-200">
                Sign Up
              </button>
            </Link>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Navbar;
