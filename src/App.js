import "./App.css";
import { Routes, Route } from "react-router-dom";
import DroneMapUI from "./DroneMapUI";
import { useSelector } from "react-redux";
import { allPathSelector } from "./selectors/path";
import NewPathUI from "./NewPathUI";

function App() {
  const { paths } = useSelector(allPathSelector);
  console.log(paths);
  return (
    <div className="App">
      <Routes>
        <Route element={<NewPathUI />} path="/new-path" />
        <Route element={<DroneMapUI />} path="/" />
      </Routes>
    </div>
  );
}

export default App;
