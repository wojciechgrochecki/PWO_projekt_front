import style from "./styles.module.css";
import axios from "axios";
import { useAuth } from "../../../hooks/auth";
import { useEffect, useState } from "react";

export default function HousePrice() {
  const { token } = useAuth();
  const [countries, setCountries] = useState(null);
  const [selectedCountryHousePrices, setSelectedCountryHousePrices] =
    useState(null);
  const [housePrice, setHousePrice] = useState(null);

  useEffect(() => {
    if (countries == null) {
      axios
        .get("countries", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCountries(response.data);
        });
    }
  });

  async function fetchCountryInfo(e) {
    axios
      .get(`countries/${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let data = response.data;
        const filteredData = data.housePrices.filter(
          (house) => house.housePriceMeasure.subject === "REAL"
        );
        filteredData["countryId"] = e.target.value;
        setSelectedCountryHousePrices(filteredData);
      });
  }

  function handleYearSelection(e) {
    setHousePrice(selectedCountryHousePrices[e.target.value]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {countries ? (
        <label>
          Wybierz kraj:
          <select name="country" id="country" onInput={fetchCountryInfo}>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.countryName}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <p>Nie ma danych w bazie</p>
      )}
      {selectedCountryHousePrices && (
        <label>
          Wybierz rok:
          <select
            className={style.select}
            name="year"
            id="year"
            onInput={handleYearSelection}
          >
            {selectedCountryHousePrices.map((house, index) => (
              <option key={house.id} value={index}>
                {house.year}
              </option>
            ))}
          </select>
        </label>
      )}
      {housePrice !== null && (
        <>
          <DisplayKeyValuePairs data={housePrice} />
          <div className={style.forms_container}>
            <PostForm
              house={housePrice}
              countryId={selectedCountryHousePrices.countryId}
            />
            <PutForm
              house={housePrice}
              countryId={selectedCountryHousePrices.countryId}
            />
            <DeleteForm house={housePrice} />
          </div>
        </>
      )}
    </div>
  );
}

const DisplayKeyValuePairs = ({ data }) => {
  const { id, value, year } = data;

  return (
    <div>
      <ul className={style.pairs_list}>
        <li>id:{id}</li>
        <li>wartość:{value}</li>
        <li>rok:{year}</li>
      </ul>
    </div>
  );
};

function PostForm({ house, countryId }) {
  const [formData, setFormData] = useState({
    year: house.year,
    value: house.value,
    countryId: countryId,
    measureId: "2",
  });
  const { token } = useAuth();

  useEffect(() => {
    setFormData({
      year: house.year,
      value: house.value,
      countryId: countryId,
      measureId: "2",
    });
  }, [house, countryId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    let url = `housePrices`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(url, formData, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {});
  }

  return (
    <div className={style["form-wrap"]}>
      <p>POST</p>
      <form onSubmit={handleSubmit}>
        <div className={style["input-wrap"]}>
          <div>Rok:</div>
          <input
            type="number"
            name="year"
            min="1"
            step="1"
            value={formData.year}
            onChange={handleChange}
          />
        </div>
        <div className={style["input-wrap"]}>
          <div>Wartość:</div>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
          />
        </div>
        <button>Wyślij</button>
      </form>
    </div>
  );
}

function DeleteForm({ house }) {
  const { token } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    let url = `housePrices/${house.id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(url, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {});
  }

  return (
    <div className={style["form-wrap"]}>
      <p>DELETE</p>
      <form onSubmit={handleSubmit}>
        <button>Usuń</button>
      </form>
    </div>
  );
}

function PutForm({ house, countryId }) {
  const [formData, setFormData] = useState({
    year: house.year,
    value: house.value,
    countryId: countryId,
    measureId: "2",
  });
  const { token } = useAuth();

  useEffect(() => {
    setFormData({
      year: house.year,
      value: house.value,
      countryId: countryId,
      measureId: "2",
    });
  }, [house, countryId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    let url = `housePrices/${house.id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(url, formData, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {});
  }

  return (
    <div className={style["form-wrap"]}>
      <p>PUT</p>
      <form onSubmit={handleSubmit}>
        <div className={style["input-wrap"]}>
          <div>Rok:</div>
          <input
            type="number"
            name="year"
            min="1"
            step="1"
            value={formData.year}
            onChange={handleChange}
          />
        </div>
        <div className={style["input-wrap"]}>
          <div>Wartość:</div>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
          />
        </div>
        <button>Wyślij</button>
      </form>
    </div>
  );
}
