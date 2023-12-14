import style from './styles.module.css'
import axios from 'axios'
import { useAuth } from '../../../hooks/auth'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react'

export default function InterestRate() {
    const [selectedComponent, setSelectedComponent] = useState(0);

    return (<div className={style["two-row-grid"]}>
        <div className={style['button-panel']}>
            <button className={style['button-get']} onClick={() => setSelectedComponent(0)} >Get</button>
            <button className={style['button-post']} onClick={() => setSelectedComponent(1)} >Post</button>
            <button className={style['button-put']} onClick={() => setSelectedComponent(2)}>Put</button>
            <button className={style['button-delete']} onClick={() => setSelectedComponent(3)}  >Delete</button>
        </div>
        <div className={style['form-panel']}>
            {selectedComponent == 0 && <GetForm />}
            {selectedComponent == 1 && <PostForm />}
            {selectedComponent == 2 && <PutForm />}
            {selectedComponent == 3 && <DeleteForm />}
        </div>
    </div>)
}

function GetForm() {
    const [selectedId, setSelectedId] = useState(1);
    const [textAreaContent, setTextAreaContent] = useState('');
    const [gotData, setGotData] = useState(0);
    const { token } = useAuth();
    console.log(selectedId);

    function handleSubmit(e) {
        e.preventDefault();
        let url = `http://localhost:8080/api/InterestRate/${selectedId}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.get(url, config)
            .then(response => {
                setGotData(1);
                setTextAreaContent(JSON.stringify(response.data.data, null, 2));
                console.log(response.data);
            })
            .catch(error => {
                setGotData(1);
                setTextAreaContent(JSON.stringify(error.response.data, null, 2));
            });

    }


    return (
        <div className={style["form-wrap"]} >
            <form onSubmit={e => handleSubmit(e)}>
                <div className={style["input-wrap"]}>
                    <div>Select Interest Rate Id:</div>
                    <input type="number" min="1" step="1" value={selectedId}
                        onChange={e => setSelectedId(e.target.value)} />
                </div>
                <button>Submit</button>
            </form>
            {gotData != 0 &&
                <textarea rows={6}
                    value={textAreaContent}
                    onChange={e => setTextAreaContent(e.target.value)}
                />
            }
        </div>
    )
}

function PostForm() {
    const [formData, setFormData] = useState(
        {
            year: "", value: "", countryId: ""
        })
    const [textAreaContent, setTextAreaContent] = useState('');
    const [gotData, setGotData] = useState(0);
    const { token } = useAuth();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        let url = `http://localhost:8080/api/InterestRate`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.post(url, formData, config)
            .then(response => {
                setGotData(1);
                setTextAreaContent(JSON.stringify(response.data.data, null, 2));
                console.log(response.data);
            })
            .catch(error => {
                setGotData(1);
                setTextAreaContent(JSON.stringify(error.response.data, null, 2));
            });

    }


    return (
        <div className={style["form-wrap"]} >
            <form onSubmit={handleSubmit}>
                <div className={style["input-wrap"]}>
                    <div>Year:</div>
                    <input type="number" name="year" min="1" step="1" value={formData.year}
                        onChange={handleChange} />
                </div>
                <div className={style["input-wrap"]}>
                    <div>Value:</div>
                    <input type="number" name="value" value={formData.value}
                        onChange={handleChange} />
                </div>
                <div className={style["input-wrap"]}>
                    <div>Country Id:</div>
                    <input type="number" name="countryId" min="1" step="1" max="14" value={formData.countryId}
                        onChange={handleChange} />
                </div>
                <button>Submit</button>
            </form>


            {gotData != 0 &&
                <textarea rows={12}
                    value={textAreaContent}
                    onChange={e => setTextAreaContent(e.target.value)}
                />
            }
        </div>)
}



function DeleteForm() {
    const [selectedId, setSelectedId] = useState(47);
    const [textAreaContent, setTextAreaContent] = useState('');
    const [gotData, setGotData] = useState(0);
    const { token } = useAuth();
    console.log(selectedId);

    function handleSubmit(e) {
        e.preventDefault();
        let url = `http://localhost:8080/api/InterestRate/${selectedId}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.delete(url, config)
            .then(response => {
                setGotData(1);
                setTextAreaContent(JSON.stringify(response.data.data, null, 2));
                console.log(response.data);
            })
            .catch(error => {
                setGotData(1);
                setTextAreaContent(JSON.stringify(error.response.data, null, 2));
            });

    }


    return (<div className={style["form-wrap"]} >
        <form onSubmit={e => handleSubmit(e)}>
            <div className={style["input-wrap"]}>
                <div>Select Interest Rate Id to delete:</div>
                <input type="number" min="1" step="1" value={selectedId}
                    onChange={e => setSelectedId(e.target.value)} />
            </div>
            <button>Submit</button>
        </form>
        {gotData != 0 &&
            <textarea rows={6}
                value={textAreaContent}
                onChange={e => setTextAreaContent(e.target.value)}
            />
        }
    </div>)
}


function PutForm() {
    const [formData, setFormData] = useState(
        {
            id: "47", year: "2016", value: "1"
        })
    const [textAreaContent, setTextAreaContent] = useState('');
    const [gotData, setGotData] = useState(0);
    const { token } = useAuth();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        let url = `http://localhost:8080/api/InterestRate`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.put(url, formData, config)
            .then(response => {
                setGotData(1);
                setTextAreaContent(JSON.stringify(response.data.data, null, 2));
                console.log(response.data);
            })
            .catch(error => {
                setGotData(1);
                setTextAreaContent(JSON.stringify(error.response.data, null, 2));
            });

    }


    return (<div className={style["form-wrap"]} >
        <form onSubmit={handleSubmit}>
            <div className={style["input-wrap"]}>
                <div>id:</div>
                <input type="number" name="id" min="1" step="1" value={formData.id}
                    onChange={handleChange} />
            </div>
            <div className={style["input-wrap"]}>
                <div>Year:</div>
                <input type="number" name="year" min="1" step="1" value={formData.year}
                    onChange={handleChange} />
            </div>
            <div className={style["input-wrap"]}>
                <div>Value:</div>
                <input type="number" name="value" value={formData.value}
                    onChange={handleChange} />
            </div>
            <button>Submit</button>
        </form>


        {gotData != 0 &&
            <textarea rows={12}
                value={textAreaContent}
                onChange={e => setTextAreaContent(e.target.value)}
            />
        }
    </div>
    )
}

