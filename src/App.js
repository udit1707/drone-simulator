import "./App.css";
import { Routes, Route } from "react-router-dom";
import DroneMapUI from "./components/DroneMapUI";
import { useSelector } from "react-redux";
import { allPathSelector } from "./selectors/path";
import NewPathUI from "./ui/NewPathUI";

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
