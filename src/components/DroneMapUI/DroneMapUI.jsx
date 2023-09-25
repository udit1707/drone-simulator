import { useCallback, useEffect, useState } from "react";
import { GoogleMap, MarkerF, Polyline } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IoPauseOutline, IoPlayOutline } from "react-icons/io5";
import { allPathSelector } from "../../selectors/path";
import { AiOutlinePlus } from "react-icons/ai";
import MasterButton from "../../ui/MasterButton";
import styles from "./DroneMapUI.module.css";

const Map = ({
  markerPosition,
  setMarkerPosition,
  mapCenter,
  setMapCenter,
  path,
}) => {
  const handleMarkerPositionChange = useCallback((event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(newPosition);
    setMapCenter(newPosition);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={{ height: "100%", width: "100%" }}
      center={mapCenter}
      zoom={12.5}
      onClick={handleMarkerPositionChange}
    >
      <MarkerF
        position={markerPosition}
        draggable={true}
        onDragEnd={handleMarkerPositionChange}
        icon={{
          url: require("../../assets/drone.svg").default,
          scaledSize: new window.google.maps.Size(50, 50),
          anchor: new window.google.maps.Point(25, 25),
        }}
      />
      {path.length > 1 && (
        <Polyline
          path={path}
          options={{
            strokeColor: "#ea8e0e",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          }}
        />
      )}
    </GoogleMap>
  );
};

const DroneMapUI = () => {
  const { paths } = useSelector(allPathSelector);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 26.490563917845076,
    lng: 80.28502477947444,
  });
  const [mapCenter, setMapCenter] = useState({
    lat: 26.490563917845076,
    lng: 80.28502477947444,
  });
  const [path, setPath] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStartSimulation = () => {
    if (!selectedOption) return;
    // const simulatedPath = [
    //   { lat: 26.48598788148077, lng: 80.34623322394918 },
    //   { lat: 26.42531294623219, lng: 80.393868541767 },
    //   { lat: 26.368264685881623, lng: 80.4363322461581 },
    //   { lat: 26.15495028182575, lng: 80.16823934080898 },
    // ];
    const pathModified = selectedOption.meta.map((i) => ({
      lat: i.lat,
      lng: i.lng,
    }));
    setPath(pathModified);
    if (currentIndex >= path.length) {
      setCurrentIndex(0);
    }
    setIsSimulating(true);
    setIsPaused(false);
  };

  const handleRadioChange = (i) => {
    const selectedPath = {
      name: i.name,
      meta: i.meta,
    };
    setSelectedOption(selectedPath);
  };

  useEffect(() => {
    let interval;

    if (isSimulating && !isPaused) {
      interval = setTimeout(() => {
        setCurrentIndex((currentIndex) => {
          if (currentIndex < path.length) {
            setMarkerPosition(path[currentIndex]);
            setMapCenter(path[currentIndex]);
            return currentIndex + 1;
          } else {
            setIsSimulating(false);
            clearInterval(interval);
            return currentIndex;
          }
        });
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isSimulating, path, isPaused, currentIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.mapBox}>
        <Map
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          path={path}
        />
      </div>
      {paths.length > 0 ? (
        <div className={styles.paths}>
          <h3>Select a path: </h3>
          {paths.map((i, index) => {
            return (
              <div key={index} className={styles.item}>
                <input
                  type="radio"
                  value={i.name}
                  checked={selectedOption?.name === i.name}
                  onChange={() => handleRadioChange(i)}
                  className={styles.radioInp}
                />
                <span className={styles.itemName}>{i.name}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <h3>No Path to Select!!</h3>
      )}

      <div className={styles.btnContainer}>
        <MasterButton handleClick={() => navigate("/new-path")}>
          <AiOutlinePlus className={styles.icon} />
          Add Path
        </MasterButton>
        <MasterButton
          handleClick={handleStartSimulation}
          disabled={isSimulating && !isPaused}
        >
          <IoPlayOutline className={styles.icon} />
          Start Simulation
        </MasterButton>
        <MasterButton
          handleClick={() => {
            setIsPaused(true);
          }}
          disabled={!isSimulating || isPaused}
        >
          <IoPauseOutline className={styles.icon} />
          Pause Simulation
        </MasterButton>
      </div>
    </div>
  );
};

export default DroneMapUI;
