// PointDetails.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PointDetails from "./PointDetails";
import { MapPoint } from "types"; // Adjust the import path based on your project structure

describe("PointDetails", () => {
  const mockOnUpdate = jest.fn();
  const mockOnClose = jest.fn();

  const initialPoint: MapPoint = {
    id: 1,
    status: "Active",
    details: "Some details",
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders PointDetails component", () => {
    const { getByText } = render(
      <PointDetails
        point={initialPoint}
        onUpdate={mockOnUpdate}
        onClose={mockOnClose}
      />
    );

    expect(getByText("Point Details")).toBeInTheDocument();
    expect(getByText("Status")).toBeInTheDocument();
    expect(getByText("Details")).toBeInTheDocument();
  });

  test("updates status and details and calls onUpdate", () => {
    const { getByLabelText, getByText } = render(
      <PointDetails
        point={initialPoint}
        onUpdate={mockOnUpdate}
        onClose={mockOnClose}
      />
    );

    fireEvent.change(getByLabelText(/Status/i), {
      target: { value: "Inactive" },
    });
    fireEvent.change(getByLabelText(/Details/i), {
      target: { value: "Updated details" },
    });
    fireEvent.click(getByText("Save"));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...initialPoint,
      status: "Inactive",
      details: "Updated details",
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onClose when cancel is clicked", () => {
    const { getByText } = render(
      <PointDetails
        point={initialPoint}
        onUpdate={mockOnUpdate}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(getByText("Cancel"));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
