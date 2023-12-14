import styles from "./styles.module.css"
import { useAuth } from '../../hooks/auth'
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Navigation() {
    const { logout, token } = useAuth();

    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    const keys = Object.keys(decodedToken);
    const roles = decodedToken[keys[1]];

    const isAdmin = roles.includes("admin"); //odkomentować
    //const isAdmin = true;                       //usunąć (to jest do testów)



    return (
        <div className={styles["nav"]}>
            <div className={styles["navigation-container"]}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div className={styles["logo"]}>
                        <span>Integration</span>
                    </div>
                </Link>
                {isAdmin && <Link className={styles["add-promotion"]} to='/adminPanel'>
                    <div className={styles["nav-link"]}>Admin panel</div>
                </Link>}
                <div className={styles["actions"]}>
                    <button onClick={logout}>Log out</button>
                </div>
            </div>
        </div>
    )


}