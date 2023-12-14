import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../hooks/auth";
import style from "./styles.module.css";
import { toast } from "react-toastify";

const JsonSeedInput = () => {
  const { token } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to upload the selected file to the server
  const handleFileUpload = async (e) => {
    e.preventDefault();

    try {
      if (!selectedFile) {
        console.error("Please select a file.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      await axios.post("db/SeedFromJsonFile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Zaimportowano dane o cenach mieszkań do bazy danych");
    } catch (error) {
      console.error("Error occurred while uploading the file:", error);
    }
  };

  return (
    <div className={style["button-wrap"]}>
      <input
        type="file"
        accept="application/json"
        onChange={handleFileChange}
        className={style["seed-database-button"]}
      />
      <button onClick={handleFileUpload}>Importuj stopy procentowe</button>
    </div>
  );
};

export default JsonSeedInput;
