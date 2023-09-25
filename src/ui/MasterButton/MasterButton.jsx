import classNames from "classnames";
import styles from "./MasterButton.module.css";

const MasterButton = ({
  children,
  handleClick = () => {},
  className = null,
  type = null,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={classNames(
        styles.masterBtn,
        { [className]: className },
        {
          [styles.disabled]: disabled,
        }
      )}
    >
      {children}
    </button>
  );
};

export default MasterButton;
