import React, { useEffect, useRef } from "react";
import { useMap } from "../../hooks/useMap";
import { MapPoint } from "../../types";
import { createPointFeature, getPointStyle } from "../../utils/mapUtils";
import MapControls from "./MapControls";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { click } from "ol/events/condition";
import Select from "ol/interaction/Select";

interface MapProps {
  points: MapPoint[];
  onPointClick: (point: MapPoint) => void;
}

const Map: React.FC<MapProps> = ({ points, onPointClick }) => {
  const { map, mapRef } = useMap(points);
  const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);

  useEffect(() => {
    if (!map) return;

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vectorLayer);
    vectorLayerRef.current = vectorLayer;

    const select = new Select({
      condition: click,
      style: null,
    });

    map.addInteraction(select);

    select.on("select", (event) => {
      if (event.selected.length > 0) {
        const feature = event.selected[0];

        const pointId = feature.getId() as number;
        const point = points.find((p) => p.id === pointId);
        if (point) {
          event.preventDefault();
          onPointClick(point);
        }
      }
    });

    return () => {
      map.removeLayer(vectorLayer);
      map.removeInteraction(select);
    };
  }, [map, points]);

  useEffect(() => {
    if (!map || !vectorLayerRef.current) return;

    const vectorSource = vectorLayerRef.current.getSource();
    if (!vectorSource) return;

    vectorSource.clear();

    points.forEach((point) => {
      const feature = createPointFeature(point);
      feature.setStyle(getPointStyle(point.status));
      vectorSource.addFeature(feature);
    });
  }, [map, points]);

  const handleZoomIn = () => {
    if (map) {
      const view = map.getView();
      view.animate({
        zoom: view.getZoom()! + 1,
        duration: 250,
      });
    }
  };

  const handleZoomOut = () => {
    if (map) {
      const view = map.getView();
      view.animate({
        zoom: view.getZoom()! - 1,
        duration: 250,
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapRef}
        style={{ height: "500px", width: "100%" }}
        id="map"
        className="map-container"
      />
      <MapControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
    </div>
  );
};

export default Map;
