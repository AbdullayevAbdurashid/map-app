import React, { useState, lazy, Suspense } from "react";
import Layout from "./components/Layout";
import { usePoints } from "./hooks/usePoints";
import { MapPoint } from "./types";
import PointDetails from "./components/PointDetails";
import { LoadingScreen, ErrorScreen } from "components/Progress/Progress.tsx";
import SidebarContent from "components/Sidebar/Content.tsx";

const MapComponent = lazy(() => import("./components/Map/index.tsx"));

const App: React.FC = () => {
  const { points, loading, error, updatePoint } = usePoints();
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const handlePointClick = (point: MapPoint) => {
    setSelectedPoint(point);
  };

  const clearSelectedPoint = () => {
    setSelectedPoint(null);
  };

  const handlePointUpdate = (updatedPoint: MapPoint) => {
    updatePoint(updatedPoint);
    clearSelectedPoint();
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;

  return (
    <Layout sidebarContent={<SidebarContent points={points} />}>
      <div
        className="relative h-full"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              Loading map...
            </div>
          }
        >
          <MapComponent points={points} onPointClick={handlePointClick} />
        </Suspense>
        {selectedPoint && (
          <div className="absolute top-4 left-4 z-10">
            <PointDetails
              point={selectedPoint}
              onUpdate={handlePointUpdate}
              onClose={clearSelectedPoint}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
