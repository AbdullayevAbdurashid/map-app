export const LoadingScreen: React.FC = () => (
  <div className="flex items-center justify-center h-screen">Loading...</div>
);
export const ErrorScreen: React.FC<{ error: string }> = ({ error }) => (
  <div className="flex items-center justify-center h-screen text-red-600">
    Error: {error}
  </div>
);
