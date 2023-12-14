import style from './styles.module.css'
import axios from 'axios'
import { useAuth } from '../../../hooks/auth'
import toast, { Toaster } from 'react-hot-toast';

export default function SeedDatabase() {

    const { token } = useAuth();

    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    function exportToJson() {
        let url = "http://localhost:8080/api/Export/ExportToJson";

        fetch(url, config).
            then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw Error('Error ' + response.status + ': ' + response.statusText);
                }

            })
            .then((response) => {
                if (response.success) {
                    console.log(response);
                    toast.success(response.message);
                }
                else {
                    console.log(response);
                    toast.error(response.message);
                }

            })
            .catch((error) => {
                toast.error(error.message);
            });

    }

    function exportToXml() {
        let url = "http://localhost:8080/api/Export/ExportToXml";
        fetch(url, config).
            then((response) => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw Error('Error ' + response.status + ': ' + response.statusText);
                }

            }).then((response) => {
                if (response.success) {
                    console.log(response);
                    toast.success(response.message);
                }
                else {
                    console.log(response);
                    toast.error(response.message);
                }

            })
            .catch((error) => {
                toast.error(error.message);
            });

    }



    return (<div className={style["export-database-wrap"]}>
        <Toaster />
        <button onClick={exportToJson} className={style["export-database-button"]}>Export to Json</button>
        <button onClick={exportToXml} className={style["export-database-button"]}>Export to Xml</button>

    </div>)
}