import styles from "./CheckpointCard.module.css";
import {BiCurrentLocation, BiTimeFive } from "react-icons/bi";

const CheckpointCard = ({ checkpoints }) => {
  return (
    <div className={styles.container}>
      {checkpoints?.length > 0 ? (
        <ol className={styles.list}>
          {checkpoints.map((i, index) => {
            return (
              <li className={styles.listItem} key={index}>
                <span className={styles.itemText}>
                <BiCurrentLocation className={styles.icon}/>
                  {i.lat.val},{i.lng.val}
                </span>
                <span className={styles.timeStamp}>
                  <BiTimeFive className={styles.icon}/>
                  {i.date.val}, {i.time.val}
                </span>
              </li>
            );
          })}
        </ol>
      ) : (
        <h3>No Checkpoints Added!</h3>
      )}
    </div>
  );
};

export default CheckpointCard;
