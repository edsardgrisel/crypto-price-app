import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const RefreshPrices = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRefreshPrices = () => {
        setLoading(true);
        axios
            .put('http://localhost:5555/cryptos/update-prices')
            .then(() => {
                setLoading(false);
                navigate('/');
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
            <h1 className='text-3x1 my-4'>Refresh Prices</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <button className='p-2 bg-sky-300 m-8' onClick={handleRefreshPrices}>Refresh</button>
            </div>

        </div>
    )
}

export default RefreshPrices