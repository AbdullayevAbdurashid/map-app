import { MapPoint } from "types";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Circle, Fill, Stroke } from "ol/style";

export const createPointFeature = (point: MapPoint): Feature => {
  const feature = new Feature({
    geometry: new Point(fromLonLat([point.longitude, point.latitude])),
  });
  feature.setId(point.id);
  feature.set("status", point.status);
  feature.set("details", point.details);
  return feature;
};

export const getPointStyle = (status: string): Style => {
  const colors: { [key: string]: string } = {
    active: "#27AE60",
    true: "#27AE60",
    false: "#E74C3C",
    inactive: "#E74C3C",
    pending: "#F39C12",
  };
  return new Style({
    image: new Circle({
      radius: 11,
      fill: new Fill({ color: colors[status] || colors.active }),
      stroke: new Stroke({ color: "#FFFFFF", width: 4 }),
    }),
  });
};

export const fitMapToPoints = (map: any, points: MapPoint[]): void => {
  if (!map || points.length === 0) return;

  const extent = points.reduce(
    (ext, point) => {
      const coord = fromLonLat([point.longitude, point.latitude]);
      return [
        Math.min(ext[0], coord[0]),
        Math.min(ext[1], coord[1]),
        Math.max(ext[2], coord[0]),
        Math.max(ext[3], coord[1]),
      ];
    },
    [Infinity, Infinity, -Infinity, -Infinity]
  );

  map.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 18 });
};
