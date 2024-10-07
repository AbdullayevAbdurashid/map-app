import { usePoints } from "hooks/usePoints";

function App() {
  const { points, loading, error, updatePoint } = usePoints();
  return <>This is app js</>;
}

export default App;
