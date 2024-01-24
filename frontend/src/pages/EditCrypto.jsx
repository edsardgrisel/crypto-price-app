import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';

const EditCrypto = () => {

    const [name, setName] = useState('');
    const [ticker, setTicker] = useState('');
    const [quantity, setQuantity] = useState(0);
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

    const handleEditCrypto = () => {
        const data = {
            name,
            ticker,
            quantity,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5555/cryptos/${id}`, data)
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
            <h1 className='text-3x1 my-4'>Edit Crypto</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>Ticker</label>
                    <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className='my-4'>
                    <label className='text-x1 mr-4 text-gray-500'>Quantity</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditCrypto}>Add</button>
            </div>

        </div>
    )
}

export default EditCrypto