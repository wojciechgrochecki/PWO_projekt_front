import { useState, useEffect } from "react";
import axios from "axios";
import style from "./styles.module.css";
import { useAuth } from "../../../hooks/auth";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "../LineChart";
import { transformData, createChartData } from "../../../utils/chart";

Chart.register(CategoryScale);

export default function MainPage() {
  const { token } = useAuth();
  const [countryNames, setCountryNames] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [recievedData, setRecievedData] = useState(null);

  useEffect(() => {
    axios
      .get("countries", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setCountryNames(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  function getGraphInfo(countryId) {
    axios
      .get(`countries/${countryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let data = response.data;
        data.housePrices = data.housePrices.filter((price) => {
          return price.housePriceMeasure.subject === "REAL";
        });
        displayNormalizedData(data);
        setRecievedData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const displayRawData = (data) => {
    const rawData = transformData(data, false);
    const chartData = createChartData(
      rawData,
      data.housePrices.map((house) => house.year)
    );
    chartData.title = `${data.countryName} (Surowe dane)`;
    setChartData(chartData);
  };

  const displayNormalizedData = (data) => {
    const normalizedData = transformData(data, true);
    const chartData = createChartData(
      normalizedData,
      data.housePrices.map((house) => house.year)
    );
    chartData.title = `${data.countryName} (Znormalizowane dane)`;
    setChartData(chartData);
  };

  return (
    <div className={style["main-wrap"]}>
      <ul className={style["country-names"]}>
        {countryNames?.length !== 0 ? (
          countryNames.map((c) => {
            return (
              <li onClick={() => getGraphInfo(c.id)} key={c.id}>
                {c.countryName}
              </li>
            );
          })
        ) : (
          <div className={style["no-countries-message"]}>
            Brak krajów w bazie danych
          </div>
        )}
      </ul>
      <div>
        {chartData !== null && (
          <div className={style["action-buttons"]}>
            <button onClick={() => displayNormalizedData(recievedData)}>
              Znormalizuj
            </button>
            <button onClick={() => displayRawData(recievedData)}>
              Surowe dane
            </button>
          </div>
        )}
        {chartData ? (
          <LineChart chartData={chartData} />
        ) : (
          <div className={style["select-country-message"]}>
            Nie wybrano kraju do wyświetlenia
          </div>
        )}
      </div>
    </div>
  );
}
