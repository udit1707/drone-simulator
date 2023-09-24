import "./App.css";
import { Routes, Route } from "react-router-dom";
import DroneMapUI from "./DroneMapUI";
import AddPathForm from "./AddPathForm";
import { useSelector } from "react-redux";
import { allPathSelector } from "./selectors/path";

function App() {
  const { paths } = useSelector(allPathSelector);
  console.log(paths);
  return (
    <div className="App">
      <Routes>
        <Route element={<AddPathForm />} path="/add-path" />
        <Route element={<DroneMapUI />} path="/" />
      </Routes>
    </div>
  );
}

export default App;
