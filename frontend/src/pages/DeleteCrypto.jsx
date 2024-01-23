import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteCrypto = () => {

    const [name, setName] = useState('');
    const [ticker, setTicker] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/cryptos/${id}`)
            .then((response) => {
                setName(response.data.data.name);
                setTicker(response.data.data.ticker);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert("An error occured. Check the console.")
                console.log(error);
            })
    }, [])

    const handleDeleteCrypto = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/cryptos/${id}`)
            .then(() => {
                setLoading(false);
                navigate(-1);
            })
            .catch((error) => {
                setLoading(false);
                alert("An error occured, please check the console.");
                console.log(error);
            })
    }



    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3x1 my-4'>Delete crypto</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <button className='p-2 bg-sky-300 m-8' onClick={handleDeleteCrypto}>Delete {name + " " + ticker}</button>
            </div>

        </div>
    )
}

export default DeleteCrypto