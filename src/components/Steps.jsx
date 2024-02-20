import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Steps = (props) => {

  
  return (
    <div>
      <div className="md:hidden pt-2">
        <Link
          className=" flex gap-3 items-center text-3xl font-bold leading-none"
          to="/"
        >
          <h1 className="font-roboto font-extrabold text-[22.2px] ml-6 text-primary">
           ODVAS1
          </h1>
        </Link>
        <div className="flex items-center justify-center">
          <ul className="w-full flex items-center px-6 gap-1 justify-between mt-6 font-normal">
            <li>
              <div
                className={`flex gap-1 sm:gap-2 w-full text-[11px] sm:text-[16px]  items-center text-gray-900 rounded-lg`}
              >
                <span
                  className={`flex items-center justify-center h-5 w-5 sm:h-10 sm:w-10 border border-primary rounded-full bg-primary text-white`}
                >
                  1
                </span>
                <span className="text-dark2 whitespace-nowrap font-manrope group-hover:text-primary">
                  Upload Image
                </span>
              </div>
            </li>
            <li>
              <div
                className={`flex w-full gap-1 sm:gap-2  text-[11px] sm:text-[16px]  items-center text-gray-900 rounded-lg`}
              >
                <span
                  className={`flex items-center justify-center  h-5 w-5 sm:h-10 sm:w-10 border border-primary rounded-full ${props.colors.color}`}
                >
                  2
                </span>{" "}
                <span className="text-dark2 font-manrope  whitespace-nowrap group-hover:text-primary">
                  Select Analytics Type
                </span>
              </div>
            </li>
            <li>
              <div
                className={`flex w-full text-[11px] sm:text-[16px] gap-1 sm:gap-2  items-center rounded-lg`}
              >
                <span
                  className={`flex items-center justify-center  h-5 w-5 sm:h-10 sm:w-10 border border-primary rounded-full ${props.colors.color2}`}
                >
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
    </div>
  );
};

export default Steps;
