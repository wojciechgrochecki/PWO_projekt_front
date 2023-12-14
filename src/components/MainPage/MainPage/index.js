import { useState, useEffect } from "react";
import axios from "axios";
import style from "./styles.module.css";
import { useAuth } from "../../../hooks/auth";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "../LineChart";
import jwt_decode from "jwt-decode";

Chart.register(CategoryScale);

export default function MainPage() {
  const [countryNames, setCountryNames] = useState([]);
  const [chartTitle, setChartTitle] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [gotCountryNames, setGotCountryNames] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const url = "http://localhost:8080/api/Country/GetAll";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(url, config)
      .then((response) => {
        setCountryNames(response.data.data);
        console.log(response.data.data);
        setGotCountryNames(true);
      })
      .catch((error) => {
        setGotCountryNames(false);
        console.error(error);
      });
  }, [token]);

  function getGraphInfo(countryId) {
    const url = `http://localhost:8080/api/Country/${countryId}`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(url, config)
      .then((response) => {
        let data = response.data.data;
        data.housePrices = data.housePrices.filter((price) => {
          return price.housePriceMeasure.subject === "REAL";
        });
        console.log(data);
        const housePricesArray = data.housePrices.map((obj) => obj.value);
        const interestRatesArray = data.interestRates.map((obj) => obj.value);

        console.log(housePricesArray);
        console.log(interestRatesArray);

        const minHousePrice = Math.min(...housePricesArray);
        const maxHousePrice = Math.max(...housePricesArray);

        const minInterestRate = Math.min(...interestRatesArray);
        const maxInterestRate = Math.max(...interestRatesArray);

        console.log("Min housePrice:", minHousePrice);
        console.log("Max housePrice:", maxHousePrice);

        console.log("Min intRate:", minInterestRate);
        console.log("Max intRate:", maxInterestRate);

        let chartD = {
          labels: data.housePrices.map((house) => {
            return house.year;
          }),
          datasets: [
            {
              label: "House Prices",
              data: data.housePrices.map((house) => {
                return (
                  (house.value - minHousePrice) /
                  (maxHousePrice - minHousePrice)
                );
              }),
            },
            {
              label: "Interest Rates",
              data: data.interestRates.map((interestRate) => {
                return (
                  (interestRate.value - minInterestRate) /
                  (maxInterestRate - minInterestRate)
                );
              }),
            },
          ],
        };
        setChartTitle(data.countryName);
        setChartData(chartD);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }

  return (
    <div className={style["main-wrap"]}>
      <ul className={style["country-names"]}>
        {gotCountryNames ? (
          countryNames.map((c) => {
            return (
              <li onClick={() => getGraphInfo(c.id)} key={c.id}>
                {c.countryName}
              </li>
            );
          })
        ) : (
          <div className={style["no-countries-message"]}>
            No countries in database
          </div>
        )}
      </ul>
      {chartData ? (
        <LineChart chartData={chartData} title={chartTitle} />
      ) : (
        <div className={style["select-country-message"]}>
          No country selected
        </div>
      )}
    </div>
  );
}
