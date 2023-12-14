import { useState } from "react";
import styles from "./Login.module.css";
import { useAuth } from "../../hooks/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "admin",
    password: "admin",
  });
  const { login } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status == 401) {
          toast.warn("Niepoprawne dane logowania");
        }
        //serwer zwrócił status
      } else if (error.request) {
        //wysłano zapytanie ale nie została zwrócona odpowiedź od serwera
        console.log(error);
        toast.dismiss();
        toast.error("Błąd serwera");
        return;
      }
    }
  };
  return (
    <div className={styles["form-container"]}>
      <h1>Zaloguj się na swoje konto</h1>
      <form className={styles["form"]} onSubmit={handleSubmit}>
        <div>
          <h3>Login</h3>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            required
            className={styles.input}
          />
        </div>
        <div>
          <h3>Hasło</h3>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles["submit-button"]}>
          Zaloguj się
        </button>
      </form>

      <div className={styles["link-wrap"]}>
        Nie masz konta?{" "}
        <Link to="/register" style={{ textDecoration: "none" }}>
          <div className={styles["register-link"]}>Utwórz konto</div>
        </Link>
      </div>
    </div>
  );
}
