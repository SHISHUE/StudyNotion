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

function Navbar() {
  const [subLinks, setSubLinks] = useState([]);
  const [isSmall, setIsSmall] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.allCategorys);
    } catch (error) {
      // console.log("Could not fetch the category list");
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 680);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-richblack-700">
      <div className="flex w-11/12 max-w-maxContent justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="logo" width={160} height={42} loading="lazy" />
        </Link>
        
        {isSmall ? (
          <div className="text-richblack-5 bg-richblack-900 flex gap-x-5 items-center">
            <div>
              {user?.accountType === "Student" && (
                <div className="relative flex gap-4 text-richblack-5 items-center justify-center ">
                  <Link to="/dashboard/cart" className="">
                    <FaCartShopping className="text-richblack-200 text-[28px]" />
                    {totalItems > 0 && (
                      <span className="w-[25%] text-[1vw] flex items-center justify-center rounded-full text-richblack-5 bg-[#44b559] absolute top-[5%] left-3 animate-bounce z-20">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </div>
              )}
            </div>
            <div className="w-[12vw] mx-auto">
              <div>
                {user ? (
                  <div onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}>
                    <img
                      src={user?.image}
                      alt="user-logo"
                      className="w-[15vw] aspect-square object-cover rounded-full border-0 group-hover:border-2 border-richblack-5"
                    />
                  </div>
                ) : (
                  <div
                    className="hamburger"
                    onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
                  >
                    <input className="checkbox" type="checkbox" />
                    <svg fill="none" viewBox="0 0 50 50" height="50" width="50">
                      <path
                        className="lineTop line"
                        stroke-linecap="round"
                        stroke-width="4"
                        stroke="black"
                        d="M6 11L44 11"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-width="4"
                        stroke="black"
                        d="M6 24H43"
                        className="lineMid line"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-width="4"
                        stroke="black"
                        d="M6 37H43"
                        className="lineBottom line"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
              {isHamburgerOpen && (
                <div className="w-full h-full bg-richblack-900 text-richblack-5 z-50 absolute -translate-x-[35%] transition-all duration-200">
                  <ul className="flex flex-col  gap-y-6 text-richblack-5 px-2 py-5">
                    {NavbarLinks.map((links, index) => (
                      <li key={index}>
                        {links.title === "Catalog" ? (
                          <div className="flex flex-col gap-2 text-richblack-5">
                            <p className="flex text-[6vw] gap-2 items-center">
                              {links.title}
                            </p>
                            <div className="flex flex-col rounded-md bg-[#FFD60A] h-[0%] text-richblack-5 transition-all duration-200 top-[30%] px-3 ">
                              {subLinks.length ? (
                                subLinks.map((subLink, index) => (
                                  <Link
                                    key={index}
                                    to={`/catalog/${subLink?.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                  >
                                    <p className="text-[5vw] text-richblack-900">{subLink.name}</p>
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
                              className={`text-[6vw] leading-[24px] font-semibold ${
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
                    ))}
                  </ul>

                  {!user && (
                    <div className="flex gap-x-6 px-2 py-5 items-start text-richblack-900 ">
                      <button className="bg-[#FFD60A] px-2 py-2 rounded-md border-[1px] border-richblack-900 font-semibold shadow-sm">Log In</button>
                      <button className="border-[1px] border-[#FFD60A] rounded-md text-[#FFD60A] font-semibold px-2 py-2 shadow-sm">Sign Up</button>
                    </div>
                  )}

                  {user && (
                    <div>
                      <div className="flex gap-2 items-center p-2 text-richblack-5 hover:text-richblack-200 transition-all duration-200">
                        <Link
                          to="/dashboard/my-profile"
                          className="flex gap-2 items-center text-[6vw]"
                        >
                          <RiDashboard3Fill />
                          Dashboard
                        </Link>
                      </div>
                      <div
                        onClick={() => {
                          dispatch(logout(navigate));
                        }}
                        className="flex cursor-pointer gap-2 items-center p-2 text-richblack-5 hover:text-richblack-200 transition-all duration-200 text-[6vw]"
                      >
                        <IoExit />
                        Log Out
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-x-[22vw]">
            <nav className="text-[20px]">
              <ul className="flex gap-x-6 text-richblack-25">
                {NavbarLinks.map((links, index) => (
                  <li key={index}>
                    {links.title === "Catalog" ? (
                      <div className="group flex items-center gap-2 relative z-10 ">
                        <p className="flex gap-2 items-center">{links.title}</p>
                        <FaAngleDown className="text-richblack-5" />
                        <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[40%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                          <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded translate-y-[-40%] translate-x-[80%] bg-richblack-5 "></div>
                          {subLinks.length ? (
                            subLinks.map((subLink, index) => (
                              <Link
                                key={index}
                                to={`/catalog/${subLink?.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                              >
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
                ))}
              </ul>
            </nav>
            <div className="flex gap-x-4 items-center">
              {user?.accountType === "Student" && (
                <div className="relative flex gap-4 text-richblack-5 items-center justify-center ">
                  <Link to="/dashboard/cart" className="">
                    <FaCartShopping className="text-richblack-200 text-[24px]" />
                    {totalItems > 0 && (
                      <span className="w-[25%] text-[1vw] flex items-center justify-center rounded-full text-richblack-5 bg-[#44b559] absolute top-[5%] left-3 animate-bounce z-20">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </div>
              )}
              {user && (
                <div className="group relative flex flex-col gap-5 z-10">
                  <img
                    src={user?.image}
                    alt=""
                    className="w-[3vw] aspect-square h-[3vw] object-cover rounded-full border-0 group-hover:border-2 border-richblack-5"
                  />
                  <div className="bg-richblack-800 absolute -bottom-[90px] -left-[70px] invisible transition-all duration-200 opacity-0 group-hover:visible group-hover:opacity-100 rounded-md">
                    <div className="flex gap-2 items-center p-2 text-richblack-5 hover:text-richblack-200 transition-all duration-200">
                      <Link
                        to="/dashboard/my-profile"
                        className="flex gap-2 items-center"
                      >
                        <RiDashboard3Fill />
                        Dashboard
                      </Link>
                    </div>
                    <div
                      onClick={() => {
                        dispatch(logout(navigate));
                      }}
                      className="flex cursor-pointer gap-2 items-center p-2 text-richblack-5 hover:text-richblack-200 transition-all duration-200"
                    >
                      <IoExit />
                      Log Out
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
        )}
      </div>
    </div>
  );
}

export default Navbar;
