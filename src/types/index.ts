export interface MapPoint {
  id: number;
  latitude: number;
  longitude: number;
  status: boolean;
  details: string;
}
export interface SidebarProps {
  children: React.ReactNode;
}
export interface LayoutProps {
  children: React.ReactNode;
  sidebarContent: React.ReactNode;
}
