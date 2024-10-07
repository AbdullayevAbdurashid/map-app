import React from "react";
import { SidebarProps } from "../../types";
import { useStatus } from "hooks/useNetworkStatus";
//Todo add offline indicator
const Sidebar: React.FC<SidebarProps> = ({ children, isOpen, onToggle }) => {
  const { isOnline } = useStatus();
  return (
    <>
      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        <div className="h-full flex flex-col">
          <div className="flex-shrink-0 px-4 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Sidebar</h2>
            <button
              onClick={onToggle}
              className="md:hidden rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 px-4 py-6 overflow-y-auto">{children}</div>
          <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
            {" "}
            <span className={isOnline ? "text-green-400" : "text-orange-500"}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-25 md:hidden"
          onClick={onToggle}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
