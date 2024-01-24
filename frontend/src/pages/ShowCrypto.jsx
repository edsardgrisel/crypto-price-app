import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowCrypto = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [crypto, setCrypto] = useState({});
    let c;

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/cryptos/${id}`)
            .then((response) => {
                setCrypto(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);



    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Show Crypto</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    {/* <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Id</span>
                        <span>{crypto._id}</span>
                    </div> */}
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Name</span>
                        <span>{crypto.name}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Ticker</span>
                        <span>{crypto.ticker}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Price</span>
                        <span>{"$" + crypto.price}</span>
                    </div>

                </div>
            )}
        </div>
    );
}

export default ShowCrypto