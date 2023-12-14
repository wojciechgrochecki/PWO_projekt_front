import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../hooks/auth";
import style from "./styles.module.css";
import { toast } from "react-toastify";

const XmlSeedInput = () => {
  const { token } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to upload the selected file to the server
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = async function (event) {
      const fileContent = event.target.result;
      try {
        const response = await axios.post("db/SeedFromXmlFile", fileContent, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/xml",
          },
        });
        console.log(response);
        toast.success(
          "Zaimportowano dane o stopach procentowych do bazy danych"
        );
      } catch (error) {
        console.error("Error:", error);
      }
    };

    reader.readAsBinaryString(selectedFile); // Read file as binary string
  };

  return (
    <div className={style["button-wrap"]}>
      <input
        type="file"
        accept="text/xml"
        className={style["seed-database-button"]}
        onChange={handleFileChange}
      />
      <button onClick={handleFileUpload}>Importuj ceny mieszkań</button>
    </div>
  );
};

export default XmlSeedInput;
