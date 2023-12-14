import { useState } from "react";
import styles from "../Login/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "user2",
    password: "user2",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "auth/register";
      await axios.post(url, formData);
      toast.success("Konto zostało poprawnie założone");
      navigate("/login");
    } catch (error) {
      if (error.response) {
      } else if (error.request) {
        console.log(error);
        toast.dismiss();
        toast.error("Błąd serwera");
        return;
      }

      console.log(error);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  return (
    <>
      <div className={styles["form-container"]}>
        <h1>Utwórz nowe konto</h1>
        <form className={styles["form"]} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Login</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Hasło</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles["submit-button"]}>
            Zarejestruj się
          </button>
        </form>
        <div className={styles["link-wrap"]}>
          Masz już konto?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <div className={styles["register-link"]}>Zaloguj się</div>
          </Link>
        </div>
      </div>
    </>
  );
}
