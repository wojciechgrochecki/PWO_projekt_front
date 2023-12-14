import styles from "./styles.module.css";
import { useAuth } from "../../hooks/auth";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Navigation() {
  const { logout, token } = useAuth();

  const decodedToken = jwtDecode(token);
  const isAdmin = decodedToken.ROLES.includes("ADMIN");
  return (
    <div className={styles["nav"]}>
      <div className={styles["navigation-container"]}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={styles["logo"]}>
            <span>PWO</span>
          </div>
        </Link>
        {isAdmin && (
          <Link className={styles["add-promotion"]} to="/adminPanel">
            <div className={styles["nav-link"]}>Panel admina</div>
          </Link>
        )}
        <div className={styles["actions"]}>
          <button onClick={logout}>Wyloguj</button>
        </div>
      </div>
    </div>
  );
}
