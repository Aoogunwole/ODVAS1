import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { GrAppsRounded } from "react-icons/gr";
import { Link, NavLink, useLocation } from "react-router-dom";
// import Ellipse from "../assets/Ellipse 1.png"
import { FaRegBell } from "react-icons/fa6";
import { HiMenuAlt2 } from "react-icons/hi";
import { TfiWorld } from "react-icons/tfi";
import { LuSettings } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";

const SideBar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div className="">
     
      <aside
        className={`hidden md:block font-roboto border-r-[2px] border-[#F0F0F0] fixed top-0 left-0 z-40 w-[270px] h-screen transition-transform md:block  `}
      >
        <div className="h-full  pt-10 overflow-y-auto bg-white">
          <a
            className=" flex gap-3 items-center text-3xl font-bold leading-none"
            href="/"
          >
            <h1 className="font-roboto font-extrabold text-[22.2px] pl-8 text-primary">
              ODVAS1
            </h1>
          </a>
          <div className="mt-10">
            <span className="font-roboto font-normal text-[16.93px] pl-12 text-dark">
              Steps Configuration
            </span>
            <div className="pl-8 mt-4">
              <hr />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <ul className="space-y-3 flex flex-col  justify-center mt-6 font-normal">
              <li onClick={toggleMenu}>
                <div
                  className={`flex gap-2 w-full text-[14px] text-gray4  items-center text-gray-900 rounded-lg`}
                >
                  <span className="flex items-center justify-center  h-10 w-10 border border-primary rounded-full bg-primary text-white">
                    1
                  </span>
                  <span className="text-dark2 whitespace-nowrap font-manrope group-hover:text-primary">
                    Upload CSV File
                  </span>
                </div>
              </li>
              <li onClick={toggleMenu}>
                <div
                  className={`flex w-full gap-2 text-[14px]  items-center text-gray4 text-gray-900 rounded-lg`}
                >
                  <span className={`flex items-center justify-center  h-5 w-5 sm:h-10 sm:w-10 border border-primary rounded-full ${props.colors.color}`}>
                    2
                  </span>{" "}
                  <span className="text-dark2 font-manrope  whitespace-nowrap group-hover:text-primary">
                    Select Analytics Type
                  </span>
                </div>
              </li>
              <li onClick={toggleMenu}>
                <div
                  className={`flex w-full text-[14px] gap-2 items-center text-gray4 rounded-lg`}
                >
                  <span className={`flex items-center justify-center  h-5 w-5 sm:h-10 sm:w-10 border border-primary rounded-full ${props.colors.color2}`}>
                    3
                  </span>{" "}
                  <span className="text-dark2 font-manrope whitespace-nowrap group-hover:text-primary">
                    Result
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
