import { renderHook, act } from "@testing-library/react-hooks";
import { usePoints } from "../hooks/usePoints";
import { getStoredPoints, storePoints } from "../utils/storage";

jest.mock("../utils/storage");
jest.mock("../utils/constants", () => ({
  USE_SAMPLE_DATA: true,
}));

const mockPoints = [
  { id: 1, latitude: 10, longitude: 20, status: "active", details: "Point 1" },
  {
    id: 2,
    latitude: 30,
    longitude: 40,
    status: "inactive",
    details: "Point 2",
  },
];

beforeEach(() => {
  (getStoredPoints as jest.Mock).mockReturnValue(null);
  globalThis.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ coordinates: mockPoints }),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

test("should initialize with loading true and no points", async () => {
  const { result, waitForNextUpdate } = renderHook(() => usePoints());
  expect(result.current.loading).toBe(true);
  expect(result.current.points).toEqual([]);
  await waitForNextUpdate();
  expect(result.current.loading).toBe(false);
  expect(result.current.points).toEqual(mockPoints);
});

test("should handle error during fetch", async () => {
  (globalThis.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.reject("API is down")
  );
  const { result, waitForNextUpdate } = renderHook(() => usePoints());
  await waitForNextUpdate();
  expect(result.current.error).toBe("Failed to fetch points");
  expect(result.current.loading).toBe(false);
});

test("should update a point", async () => {
  const { result, waitForNextUpdate } = renderHook(() => usePoints());
  await waitForNextUpdate();
  const updatedPoint = { ...mockPoints[0], status: "updated" };
  act(() => {
    result.current.updatePoint(updatedPoint);
  });
  expect(result.current.points[0].status).toBe("updated");
  expect(storePoints).toHaveBeenCalledWith(result.current.points);
});
