export interface MapPoint {
  id: number;
  latitude: number;
  longitude: number;
  status: boolean | any;
  details: string;
}
export interface SidebarProps {
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
  sidebarContent: React.ReactNode;
}
export interface MapProps {
  points: MapPoint[];
  onPointClick: (point: MapPoint) => void;
}
