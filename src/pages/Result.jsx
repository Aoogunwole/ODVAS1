import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import result from "../assets/result.svg";
import SideBar from "../components/Sidebar";
import Steps from "../components/Steps";

const Result = () => {
  const navigate = useNavigate()
  const [api, setapi] = useState(JSON.parse(localStorage.getItem("analytics-ai")) || null);
  useEffect(() => {
    if (!api) {
      navigate('/')
    }

  }, [])

  return (
    <section className="md:ml-72 h-screen">
      <SideBar
        colors={{
          color: "bg-primary text-white",
          color2: "bg-primary text-white",
        }}
      />

      <Steps
        colors={{
          color: "bg-primary text-white",
          color2: "bg-primary text-white",
        }}
      />

      <div className="w-full">
        {
          api && (
            <>
              <h6 className="pt-7 text-[22px] md:text-[27px] bg-white text-primary font-normal text-dark2 ml-6 md:ml-0">
                Visualization of {api.option}
              </h6>




              <div className="flex items-center justify-center">
                <div className="w-full sm:h-[90vh] flex justify-center mt-2 sm:mt-0 p-4 md:p-0 md:pr-4 md:pt-4" style={{}}>
                  <img src={api.image} alt="" className="" />
                  <div className={`${api.option == 'Geospatial Information Map' ? "" : 'hidden'} md:h-auto w-full`}>
                    
                    <div className="w-full h-[60vh] sm:h-[85vh] ">
                      <iframe src={api.option == 'Geospatial Information Map' ? 'http://api.odvas.com/images/sentiment_map.html~' : ''} frameborder="0" className="w-full h-full"></iframe>
                    </div>

                  </div>
                </div>

              </div>
            </>
          )
        }
      </div>
    </section>
  );
};

export default Result;
