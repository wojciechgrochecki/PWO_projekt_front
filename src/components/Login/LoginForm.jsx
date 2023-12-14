import { useState } from "react"
import styles from "./Login.module.css"
import { useAuth } from "../../hooks/auth";
import { Link } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({ username: "user", password: "user" })
    const [error, setError] = useState("")
    const { login } = useAuth();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(formData);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }
    return (
        <div className={styles["form-container"]}>
            <h1>Login to Your Account</h1>
            <form className={styles["form"]}
                onSubmit={handleSubmit}>
                <div>
                    <h3>Username</h3>
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
                    <h3>Password</h3>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        required
                        className={styles.input}
                    />
                </div>
                {error && <div
                    className={styles["error-message"]}>{error}</div>}
                <button type="submit"
                    className={styles["submit-button"]}>
                    Log In
                </button>
            </form>

            <div className={styles['link-wrap']}>
                No account? <Link to='/register' style={{ textDecoration: 'none' }}><div className={styles["register-link"]}>Register now</div></Link>
            </div>

        </div>

    )
}

