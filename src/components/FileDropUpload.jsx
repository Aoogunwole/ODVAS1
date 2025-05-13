import React, { useEffect, useState } from "react";
import Steps from "./Steps";
import { Link, useNavigate } from "react-router-dom";
import FileType from '../assets/file-type.svg'
import Frame from '../assets/Frame 106.svg'
import UploadCloud from '../assets/upload-cloud.svg'
import SideBar from "./Sidebar";
import axios from "axios";
const data = [
  { id: 1, title: "Concept Map", checked: true },
  { id: 2, title: "Word Cloud Visualization" },
  { id: 3, title: "Geospatial Information Map" },
  { id: 4, title: "Sentiment Analysis Per State" },
];
const FileDropUpload = () => {
  const navigate = useNavigate()
  const [header, setHeader] = useState("Upload CSV File");
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [color, setColor] = useState("");
  const [color2, setColor2] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [handleCsv, sethandleCsv] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to manage loader visibility
  const [progress, setProgress] = useState(0); // State to manage loader progress
  
  useEffect(() => {
    // Set the default selected option when the component mounts
    const defaultOption = data.find((item) => item.checked);
    if (defaultOption) {
      setSelectedOption(defaultOption.title);
    }
  }, []);
  const handleOptionChange = (id) => {
    // console.log(id);
    setSelectedOption(id);
  };
  const toggleModal = () => {
    setHeader("Select Analytics Type");
    setColor("bg-primary text-white");
    setIsModalOpen((prevState) => !prevState);
  };


  const closeModal = () => {
    setHeader("Upload CSV File");
    setIsModalOpen(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-blue-500", "border-2");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.add("border-blue-500", "border-2");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 52428800; // 50MB in bytes

    if (file && file.size > maxSize) {
      alert('File size exceeds the maximum allowed size of 50MB.');
      e.target.value = null;
    } else {

      const files = Array.from(e.target.files);
      handleFiles(files);
      sethandleCsv(files[0])
    }
    // console.log(files);
  };

  const handleFiles = (files) => {
    setFileList(
      files.map((file) => `${file.name} (${formatBytes(file.size)})`)
    );
    // console.log(fileList);
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const handleResult = () => {
    // console.log(handleCsv);
    // console.log(selectedOption);
    const formData = new FormData();
    formData.append('csv_file', handleCsv);


    setIsLoading(true); // Show loader
    axios.post(`https://api.odvas.com//api/v1/result?analytic_type=${selectedOption}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json'
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded / total) * 100);
          setProgress(percent);
        }
      }
    ).then((response) => {
      // console.log(response);
      setColor2("bg-primary text-white");
      localStorage.setItem('analytics-ai', JSON.stringify({ "image": response.data.data, option: selectedOption }));
      navigate('/result')
    }).catch((error) => {
      // console.error('Error uploading file:', error);
      // Handle error
      if (error.response.status == 400) {
        alert(error.response.data.message)
      }
    }).finally(() => {
      setIsLoading(false); // Hide loader
    });

  };
  const deleteBtn = (indexToDelete) => {
    // Filter out the file at the specified index
    const updatedFileList = fileList.filter((file, index) => index !== indexToDelete);
    setFileList(updatedFileList);
    window.location.reload()
  }
  return (
    <>
      <section className="md:ml-72 h-screen">
        <SideBar colors={{ color: color, color2: color2 }} />

        <Steps colors={{ color: color, color2: color2 }} />
        <h6 className="pt-8 text-[20px] font-normal text-dark2 ml-6 md:ml-0">
          {header}
        </h6>
        <div className="h-ful flex items-center justify-center p-3 mt-5">
          <div className="w-[490px] sm:w-[510px] md:w-[610px] p-4 md:p-9">
            <div
              className="bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-blue-500 hover:border-blue-500 transition duration-300 ease-in-out transform  hover:shadow-md bg-[#EBF5FC]"
              id="dropzone"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <img
                  src={UploadCloud}
                  alt=""
                  className=""
                />
                <span className="text-[25.11px] font-normal text-primary">
                  Drag & Drop
                </span>
                <span
                  className=" text-[18.83px] font-normal"
                  style={{ color: "#263238" }}
                >
                  or select a csv file from device
                </span>
                <span
                  className=" text-[12.55px] pt-12"
                  style={{ color: "#263238" }}
                >
                  max. 50MB
                </span>
              </label>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                max-size="52428800"
                accept=".csv"
                onChange={handleFileInputChange}
              />
            </div>
            <div className="mt-6" id="fileList">
              {fileList && fileList.length > 0 ? (
                <>
                  {fileList.map((file, index) => (
                    <div key={index}>
                      <div
                        className="flex justify-between px-4 p-2 rounded-md"
                        style={{ backgroundColor: "#0080DCB2" }}
                      >
                        <div className="flex items-center gap-3 text-white">
                          <img src={FileType} alt="" />
                          <span className="text-[16px] md:text-[16px] font-normal">
                            {file}
                          </span>
                        </div>
                        <img
                          src={Frame}
                          alt=""
                          className="cursor-pointer"
                          onClick={() => deleteBtn(index)}
                        />
                      </div>
                      <div className="flex justify-center gap-5 mt-5">
                        <button
                          className="rounded"
                          style={{
                            width: "110px",
                            height: "36px",
                            outline: "1px solid #797A7B",
                            color: "#797A7B",
                          }}
                          onClick={() => deleteBtn(index)}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={toggleModal}
                          className="text-white rounded bg-[#3F57FF]"
                          style={{
                            width: "110px",
                            height: "36px",
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          </div>
        </div>

        {/* Main modal */}
        {isModalOpen && (
          <div
            id="default-modal"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
            aria-hidden="false"
          >
            <div className="relative p-4 w-full max-w-2xl">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5  rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Select Your Analytic Type
                  </h3>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="px-3">
                  {data.map((item) => (
                    <div key={item.id} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={item.title}
                        value={item.title}
                        checked={selectedOption === item.title}
                        onChange={() => handleOptionChange(item.title)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                      />
                      <label
                        htmlFor={item.title}
                        className="ms-2 text-sm font-medium text-gray-900"
                      >
                        {item.title}
                      </label>
                    </div>
                  ))}
                </div>
                {/* Modal footer */}
                <div className="flex items-center justify-center gap-6 p-4 md:p-5  rounded-b">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="rounded"
                    style={{
                      width: "110px",
                      height: "36px",
                      outline: "1px solid #797A7B",
                      color: "#797A7B",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResult}
                    type="button"
                    className="text-white rounded bg-[#3F57FF]"
                    style={{
                      width: "110px",
                      height: "36px",
                    }}
                  >
                    Continue
                  </button>
                </div>
                {/* Loader */}
                {isLoading && (
                  <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg">
                      <div role="status">
                        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                        {/* <div className="text-center font-bold">{isLoading ? `${progress}%` : 'Continue'}</div> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default FileDropUpload;
