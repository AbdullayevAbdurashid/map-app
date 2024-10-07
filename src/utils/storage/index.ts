import { MapPoint } from "types";
import { POINTS_STORAGE_KEY } from "utils/constants";

export const getStoredPoints = (): MapPoint[] | null => {
  try {
    const storedPoints = sessionStorage.getItem(POINTS_STORAGE_KEY);
    return storedPoints ? JSON.parse(storedPoints) : null;
  } catch (error) {
    console.error("Error retrieving stored points:", error);
    return null;
  }
};

export const storePoints = (points: MapPoint[]): void => {
  try {
    sessionStorage.setItem(POINTS_STORAGE_KEY, JSON.stringify(points));
  } catch (error) {
    console.error("Error storing points:", error);
  }
};

export const updateStoredPoint = (updatedPoint: MapPoint): void => {
  const storedPoints = getStoredPoints();
  if (storedPoints) {
    const updatedPoints = storedPoints.map((point) =>
      point.id === updatedPoint.id ? updatedPoint : point
    );
    storePoints(updatedPoints);
  }
};

export const clearStoredPoints = (): void => {
  try {
    sessionStorage.removeItem(POINTS_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing stored points:", error);
  }
};

export const isStorageAvailable = (): boolean => {
  try {
    const testKey = "__storage_test__";
    sessionStorage.setItem(testKey, testKey);
    sessionStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};
