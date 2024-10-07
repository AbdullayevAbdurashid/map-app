import { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { MapPoint } from "../types";
import { fromLonLat } from "ol/proj";
import { boundingExtent } from "ol/extent";

export const useMap = (points: MapPoint[]) => {
  const [map, setMap] = useState<Map | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) {
      console.log("Map container not found");
      return;
    }

    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    console.log("Map created", initialMap);
    setMap(initialMap);

    return () => {
      initialMap.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    if (!map || points.length === 0) return;

    const extent = boundingExtent(
      points.map((point) => fromLonLat([point.longitude, point.latitude]))
    );
    map.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 18 });
  }, [map, points]);

  return { map, mapRef };
};
