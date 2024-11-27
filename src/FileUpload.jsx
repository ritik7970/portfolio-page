import React, { useState } from "react";
import { useDispatch } from "react-redux";
import handleFile from "./handleFile"; // Import the updated handleFile function

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = () => {
    if (file) {
      handleFile(file, dispatch); // Pass the file and dispatch to handleFile
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload File</button>
    </div>
  );
};

export default FileUpload;
