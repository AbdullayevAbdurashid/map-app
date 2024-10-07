import { useState, useEffect } from "react";
import { MapPoint } from "../types";
import { getStoredPoints, storePoints } from "../utils/storage";
import { USE_SAMPLE_DATA } from "../utils/constants";

export const usePoints = () => {
  const [points, setPoints] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const storedPoints = getStoredPoints();
        if (storedPoints) {
          setPoints(storedPoints);
          setLoading(false);
          return;
        }

        let fetchedPoints: MapPoint[];
        if (USE_SAMPLE_DATA) {
          const response = await fetch("/sampleData.json");
          const data = await response.json();
          fetchedPoints = data.coordinates.map((point: any, index: number) => ({
            id: index + 1,
            latitude: point.latitude,
            longitude: point.longitude,
            status: point.status,
            details: point.details,
          }));
        } else {
          // will be replaced with actual api endpoint if needed
          const response = await fetch("https://api.example.com/points");
          fetchedPoints = await response.json();
        }

        setPoints(fetchedPoints);
        storePoints(fetchedPoints);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch points");
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  const updatePoint = (updatedPoint: MapPoint) => {
    const newPoints = points.map((point) =>
      point.id === updatedPoint.id ? updatedPoint : point
    );
    setPoints(newPoints);
    storePoints(newPoints);
  };

  return { points, loading, error, updatePoint };
};
