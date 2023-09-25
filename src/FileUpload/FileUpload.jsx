import { useDropzone } from "react-dropzone";
import Parser from "papaparse";
import { useDispatch } from "react-redux";
import { submitPath } from "../store/path";

import styles from "./FileUpload.module.css";
import MasterButton from "../MasterButton";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

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

    console.log(file);

    Parser.parse(file, {
      complete: (result) => {
        const data = result.data;
        const header = data[0];
        const index = data.findIndex((i) => i[2] === "");
        console.log(data);
        console.log(index);
        const parsedData = data.slice(1, index);

        const paths = parsedData.map((item) => {
          const [latitude, longitude, timestamp] = item;
          return {
            lat: Number(latitude),
            lng: Number(longitude),
            timestamp: Number(timestamp),
          };
        });

        console.log(paths);

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

    console.log(newPath);
    dispatch(submitPath(newPath));
    setUploadedData([]);
    setSuccess(false);
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
