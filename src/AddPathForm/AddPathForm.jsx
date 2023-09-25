import { useCallback, useEffect, useState } from "react";
import { format, parse } from "date-fns";
import styles from "./AddPathForm.module.css";
import MasterButton from "../MasterButton";
import { useDispatch } from "react-redux";
import { submitPath } from "../store/path";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  lat: {
    val: "",
    errors: null,
  },
  lng: {
    val: "",
    errors: null,
  },
  date: {
    val: "",
    errors: null,
  },
  time: {
    val: "",
    errors: null,
  },
  timestamp: {
    val: "",
    errors: null,
  },
};

const AddPathForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [currentPath, setCurrentPath] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [success, setSuccess] = useState(false);

  const initSetFormDate = () =>
    setFormData({
      lat: {
        val: "",
        errors: null,
      },
      lng: {
        val: "",
        errors: null,
      },
      date: {
        val: "",
        errors: null,
      },
      time: {
        val: "",
        errors: null,
      },
      timestamp: {
        val: "",
        errors: null,
      },
    });

  const validateInputs = useCallback(() => {
    let valid = true;
    const newErrors = {
      lat: "",
      lng: "",
      date: "",
      time: "",
    };

    if (formData.lat.val.trim() === "") {
      newErrors.lat = "Latitude is required";
      valid = false;
    }

    if (formData.lng.val.trim() === "") {
      newErrors.lng = "Longitude is required";
      valid = false;
    }

    if (formData.date.val.trim() === "") {
      newErrors.date = "Date is required";
      valid = false;
    }

    if (formData.time.val.trim() === "") {
      newErrors.time = "Time is required";
      valid = false;
    }

    setFormData((prev) => {
      return {
        ...prev,
        lat: {
          ...prev.lat,
          errors: newErrors.lat,
        },
        lng: {
          ...prev.lng,
          errors: newErrors.lng,
        },
        date: {
          ...prev.date,
          errors: newErrors.date,
        },
        time: {
          ...prev.time,
          errors: newErrors.time,
        },
        timestamp: {
          ...prev.time,
        },
      };
    });

    return valid;
  }, [formData]);

  const handleAddChk = () => {
    if (validateInputs()) {
      setCurrentPath((prev) => {
        console.log(prev);
        const newPath = [...prev, formData];
        console.log(newPath);
        return newPath;
      });
      initSetFormDate();
    } else {
      alert("Enter the correct checkpoint");
    }
  };

  const getTimestamp = (date, time) => {
    console.log(date, time);
    if (!date || !time) {
      return "";
    }

    const dateTimeString = `${date}T${time}:00`;
    const dateTime = new Date(dateTimeString);
    if (isNaN(dateTime.getTime())) {
      return "";
    }

    const timestampMilliseconds = dateTime.getTime();
    console.log(timestampMilliseconds);
    return timestampMilliseconds;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    console.log(formData);

    setFormData((prev) => {
      if (name === "date" || name === "time") {
        const timestampVal = getTimestamp(prev.date.val, prev.time.val);
        console.log(timestampVal);
        const newFormData = {
          ...prev,
          [name]: {
            ...prev.name,
            val: value,
          },
          timestamp: {
            val: timestampVal,
            errors: null,
          },
        };
        return newFormData;
      } else {
        const newFormData = {
          ...prev,
          [name]: {
            ...prev.name,
            val: value,
          },
        };
        return newFormData;
      }
    });
  };

  const handleSubmit = () => {
    console.log("Submitting");
    if (name.trim() === "") {
      alert("Set Path Name");
      return;
    }
    if (validateInputs()) {
      setCurrentPath((prev) => {
        const newMeta = [...prev, formData];
        console.log(newMeta);
        return newMeta;
      });
      setSuccess(true);
    } else {
      alert("Errors");
    }
  };

  useEffect(() => {
    if (success) {
      const newMeta = currentPath.map((i) => ({
        lat: Number(i.lat.val),
        lng: Number(i.lng.val),
        timestamp: Number(i.timestamp.val),
      }));
      console.log(newMeta);
      const newPath = {
        name: name,
        meta: [...newMeta],
      };
      dispatch(submitPath(newPath));
      setSuccess(false);
      setCurrentPath([]);
      initSetFormDate();
      setName("");
    }
  }, [currentPath, success, formData]);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.inputField}>
          <span className={styles.label}>Latitude:</span>
          <input
            type="text"
            name="lat"
            value={formData.lat.val}
            onChange={handleChange}
          />
          <span className={styles.errorStatus}>{formData.lat.errors}</span>
        </div>
        <div className={styles.inputField}>
          <span className={styles.label}>Longitude:</span>
          <input
            type="text"
            name="lng"
            value={formData.lng.val}
            onChange={handleChange}
          />
          <span className={styles.errorStatus}>{formData.lng.errors}</span>
        </div>
        <div className={styles.inputField}>
          <span className={styles.label}>Date:</span>
          <input
            type="date"
            name="date"
            value={formData.date.val}
            onChange={handleChange}
          />
          <span className={styles.errorStatus}>{formData.date.errors}</span>
        </div>
        <div className={styles.inputField}>
          <span className={styles.label}>Time:</span>
          <input
            type="time"
            name="time"
            value={formData.time.val}
            onChange={handleChange}
          />
          <span className={styles.errorStatus}>{formData.time.errors}</span>
        </div>
      </form>
      <div className={styles.inputField}>
        <span className={styles.label}>Path Name:</span>
        <input
          type="text"
          placeholder="Enter Path Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={styles.btnCnt}>
        <MasterButton handleClick={handleAddChk}>Add Checkpoint</MasterButton>
        <MasterButton
          handleClick={() => {
            navigate("/");
          }}
        >
          Run Simulation
        </MasterButton>
        <MasterButton handleClick={handleSubmit}>Submit Path</MasterButton>
      </div>
    </div>
  );
};

export default AddPathForm;
