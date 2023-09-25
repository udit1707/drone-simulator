import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import Parser from "papaparse";
import { submitPath } from "../../store/path";
import MasterButton from "../MasterButton";
import styles from "./FileUpload.module.css";

const FileUpload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadedData, setUploadedData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [pathName, setPathName] = useState("");
  const [fileName, setFileName] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file.type !== "text/csv") {
      alert("Please upload a CSV file.");
      return;
    }

    Parser.parse(file, {
      complete: (result) => {
        const data = result.data;
        const index = data.findIndex((i) => i[2] === "");
        const parsedData = data.slice(1, index);

        const paths = parsedData.map((item) => {
          const [latitude, longitude, timestamp] = item;
          return {
            lat: Number(latitude),
            lng: Number(longitude),
            timestamp: Number(timestamp),
          };
        });

        setUploadedData(paths);
        setSuccess(true);
        setFileName(file.name);
      },
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv",
    multiple: false,
  });

  const handleSubmit = () => {
    if (!success) {
      alert("No File Data Found");
      return;
    }
    if (pathName.trim() === "") {
      alert("Set Path Name First");
      return;
    }

    const newPath = {
      name: pathName,
      meta: [...uploadedData],
    };

    dispatch(submitPath(newPath));
    setUploadedData([]);
    setSuccess(false);
    setPathName("");
    setFileName("");
    alert("Path Added Success!");
  };

  return (
    <div className={styles.container}>
      <div {...getRootProps()} className={styles.fileUpload}>
        <input {...getInputProps()} />
        <p className={styles.dropLabel}>
          {success
            ? `File ${fileName} Uploaded Successfully!`
            : `Drag 'n' drop a CSV file here, or click to select one`}
        </p>
      </div>
      <div className={styles.inputField}>
        <span className={styles.label}>Path Name:</span>
        <input
          type="text"
          placeholder="Enter Path Name"
          value={pathName}
          onChange={(e) => {
            setPathName(e.target.value);
          }}
        />
      </div>
      <div className={styles.btnCnt}>
        <MasterButton
          handleClick={() => {
            navigate("/");
          }}
        >
          Run Simulation
        </MasterButton>
        <MasterButton handleClick={handleSubmit}>Submit File Data</MasterButton>
      </div>
    </div>
  );
};

export default FileUpload;
