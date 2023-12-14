import style from './styles.module.css'
import axios from 'axios'
import { useAuth } from '../../../hooks/auth'
import toast, { Toaster } from 'react-hot-toast';

export default function SeedDatabase() {

    const { token } = useAuth();

    async function handleClick() {
        // let url = "http://localhost:8080/api/Database/SeedDatabaseFromXml";

        // const config = {
        //     headers: {
        //         Authorization: `bearer ${token}`,
        //         'Content-Type': 'application/json'
        //     }
        // };

        // await axios.post(url, config)
        //     .then(response => {
        //         toast.success(response.data.message);
        //     })
        //     .catch(error => {
        //         toast.error(error.response.data.message);
        //         console.log(error);
        //     });


        // url = "http://localhost:8080/api/Database/SeedDatabaseFromJson";

        // axios.post(url, config).then(response => {
        //     console.log(response);
        //     toast.success(response.data.message);
        // }).catch(error => {
        //     console.log(error);
        //     toast.error(error.response.data.message);
        // });

        let url = "http://localhost:8080/api/Database/SeedDatabaseFromXml";
        const config = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        await fetch(url, config)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                else if (response.status === 409) {//database already seeded
                    return response.json();
                }
                else {
                    throw Error('Error ' + response.status + ': ' + response.statusText);
                }

            })
            .then((response) => {
                if (response.success) {
                    toast.success(response.message);
                }
                else {
                    toast.error(response.message);
                }

            })
            .catch((error) => {
                toast.error(error.message);
            });


        url = "http://localhost:8080/api/Database/SeedDatabaseFromJson";

        await fetch(url, config)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                else if (response.status === 409) { //database already seeded
                    return response.json();
                }
                else {
                    throw Error('Error ' + response.status + ': ' + response.statusText);
                }

            })
            .then((response) => {
                if (response.success) {
                    toast.success(response.message);
                }
                else {
                    toast.error(response.message);
                }

            })
            .catch((error) => {
                toast.error(error.message);
            });



    }

    return (<div className={style["seed-database-wrap"]}>
        <Toaster />
        <button onClick={handleClick} className={style["seed-database-button"]}>Seed Databse</button>
    </div>)
}