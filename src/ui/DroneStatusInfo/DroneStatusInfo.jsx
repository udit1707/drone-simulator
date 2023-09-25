import { BiCurrentLocation, BiTimeFive } from "react-icons/bi";
import styles from "./DroneStatusInfo.module.css";

const DroneStatusInfo = ({ selectedOption, currentIndex, path }) => {
  if (
    selectedOption &&
    currentIndex - 1 >= 0 &&
    currentIndex - 1 < path.length
  ) {
    return (
      <div className={styles.droneStatusInfo}>
        <span className={styles.positionText}>
          <BiCurrentLocation className={styles.statusIcon} />{" "}
          {selectedOption.meta[currentIndex - 1].lat},
          {selectedOption.meta[currentIndex - 1].lng}{" "}
        </span>
        <span className={styles.timestampText}>
          <BiTimeFive className={styles.statusIcon} />
          {selectedOption.meta[currentIndex - 1].timestamp}ms
        </span>
      </div>
    );
  }
  return <div className={styles.fillerDiv}></div>;
};

export default DroneStatusInfo;
