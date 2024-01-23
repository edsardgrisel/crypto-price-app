import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';

const AddCrypto = () => {

    const [name, setName] = useState('');
    const [ticker, setTicker] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSaveCrypto = () => {
        const data = {
            name,
            ticker,
        };
        setLoading(true);
        axios
            .post('http://localhost:5555/cryptos', data)
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
            <h1 className='text-3x1 my-4'>Add Crypto</h1>
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
                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveCrypto}>Add</button>
            </div>

        </div>
    )
}

export default AddCrypto