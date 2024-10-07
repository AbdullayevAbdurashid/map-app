import React, { useState } from "react";
import { SidebarProps } from "types";

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed z-50 top-4 left-4 bg-white p-2 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        <div className="h-full overflow-y-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            React Map App
          </h1>

          {/* Todo :Online/Offline indicator  */}
          {/* <div className="mb-6 flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-sm text-gray-600">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div> */}

          {/* Sidebar content */}
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
