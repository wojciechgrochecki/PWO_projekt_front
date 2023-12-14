import style from "./styles.module.css";
import { useAuth } from "../../../hooks/auth";
import axios from "axios";

export default function SeedDatabase() {
  const { token } = useAuth();

  const downloadFile = (blob, fileName, fileType) => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement("a");
    a.href = url;
    a.innerText = "Click me!";
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  async function exportToJson() {
    try {
      const response = await axios.get("db/json_data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], { type: "application/json" });
      downloadFile(blob, "interest_rates.json", "application/json");
    } catch (error) {
      console.error("Error exporting JSON data:", error);
    }
  }

  async function exportToXml() {
    try {
      const response = await axios.get("db/xml_data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = new Blob([response.data], { type: "application/xml" });
      downloadFile(blob, "house_prices.xml", "application/json");
    } catch (error) {
      console.error("Error exporting XML data:", error);
    }
  }

  return (
    <div className={style["export-database-wrap"]}>
      <button
        onClick={exportToJson}
        className={style["export-database-button"]}
      >
        Wyeksportuj stopy procentowe
      </button>
      <button onClick={exportToXml} className={style["export-database-button"]}>
        Wyeksportuj ceny mieszkań
      </button>
    </div>
  );
}
