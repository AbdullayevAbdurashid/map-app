import { memo } from "react";
import { MapPoint } from "types";

//Todo add auto zoom on coordinates when pressed on content

interface SidebarContentProps {
  points: MapPoint[];
}

const SidebarContent: React.FC<SidebarContentProps> = ({ points }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Points of Interest</h3>
      <ul className="space-y-2">
        {points.map((point) => (
          <li key={point.id} className="flex items-center space-x-2">
            <span
              className={`w-3 h-3 rounded-full transition-colors duration-300 ease-in-out ${
                point.status ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200">
              {point.details}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Memoizing the  points list to avoid re-rendering unless points change
export default memo(SidebarContent);
