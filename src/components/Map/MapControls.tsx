import React from "react";
import { PlusIcon, MinusIcon } from "lucide-react";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({ onZoomIn, onZoomOut }) => {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      <button
        onClick={onZoomIn}
        className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        aria-label="Zoom in"
      >
        <PlusIcon className="w-6 h-6" />
      </button>
      <button
        onClick={onZoomOut}
        className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        aria-label="Zoom out"
      >
        <MinusIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default MapControls;
