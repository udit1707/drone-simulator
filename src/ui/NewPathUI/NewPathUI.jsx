import { useState } from "react";
import classNames from "classnames";
import styles from "./NewPathUI.module.css";
import AddPathForm from "../AddPathForm";
import FileUpload from "../FileUpload";

const NewPathUI = () => {
  const [renderForm, setRenderForm] = useState(true);

  const handleFormTabClick = () => {
    setRenderForm(true);
  };

  const handleFileTabClick = () => {
    setRenderForm(false);
  };
  return (
    <div className={styles.cnt}>
      <div className={styles.header}>
        <div
          className={classNames(styles.tab, {
            [styles.active]: renderForm,
          })}
          role="presentation"
          onClick={handleFormTabClick}
        >
          Enter Manually
        </div>
        <div
          className={classNames(styles.tab, {
            [styles.active]: !renderForm,
          })}
          role="presentation"
          onClick={handleFileTabClick}
        >
          Upload File
        </div>
      </div>
      <div className={styles.content}>
        {renderForm ? <AddPathForm /> : <FileUpload />}
      </div>
    </div>
  );
};

export default NewPathUI;
