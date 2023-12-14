import style from "./styles.module.css";
import axios from "axios";
import { useAuth } from "../../../hooks/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function InterestRate() {
  const { token } = useAuth();
  const [countries, setCountries] = useState(null);
  const [selectedCountryInterestRate, setSelectedCountryInterestRate] =
    useState(null);
  const [interestRate, setInterestRate] = useState(null);

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
        let filteredData = response.data.interestRates;
        console.log("FData:", filteredData);
        filteredData["countryId"] = e.target.value;
        setSelectedCountryInterestRate(filteredData);
      });
  }

  function handleYearSelection(e) {
    console.log(e.target.value);
    setInterestRate(selectedCountryInterestRate[e.target.value]);
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
      {selectedCountryInterestRate && (
        <label>
          Wybierz rok:
          <select
            className={style.select}
            name="year"
            id="year"
            onInput={handleYearSelection}
          >
            {selectedCountryInterestRate.map((interestRate, index) => (
              <option key={interestRate.id} value={index}>
                {interestRate.year}
              </option>
            ))}
          </select>
        </label>
      )}
      {interestRate !== null && (
        <>
          <DisplayKeyValuePairs data={interestRate} />
          <div className={style.forms_container}>
            <PostForm
              interestRate={interestRate}
              countryId={selectedCountryInterestRate.countryId}
            />
            <PutForm
              interestRate={interestRate}
              countryId={selectedCountryInterestRate.countryId}
            />
            <DeleteForm interestRate={interestRate} />
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

function PostForm({ interestRate, countryId }) {
  const [formData, setFormData] = useState({
    year: interestRate.year,
    value: interestRate.value,
    countryId: countryId,
  });
  const { token } = useAuth();

  useEffect(() => {
    setFormData({
      year: interestRate.year,
      value: interestRate.value,
      countryId: countryId,
    });
  }, [interestRate, countryId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    let url = `interestRates`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        toast.success("Dodane cenę mieszkania");
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

function DeleteForm({ interestRate }) {
  const { token } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    let url = `interestRates/${interestRate.id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(url, config)
      .then((response) => {
        console.log(response.data);
        toast.success("Usunięto cenę mieszkania");
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

function PutForm({ interestRate, countryId }) {
  const [formData, setFormData] = useState({
    year: interestRate.year,
    value: interestRate.value,
    countryId: countryId,
  });
  const { token } = useAuth();

  useEffect(() => {
    setFormData({
      year: interestRate.year,
      value: interestRate.value,
      countryId: countryId,
    });
  }, [interestRate, countryId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    let url = `interestRates/${interestRate.id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(url, formData, config)
      .then((response) => {
        console.log(response.data);
        toast.success("Zaaktualizowano cenę mieszkania");
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
