import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete, MdOutlineRefresh } from 'react-icons/md';


const Home = () => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/cryptos')
            .then((res) => {
                setCryptos(res.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }, [])


    return (
        <div className='p-4'>
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-3xl font-bold'>Crypto Currencies Portfolio</h1>
                <Link to='/cryptos/update-prices'>
                    <MdOutlineRefresh>Refresh</MdOutlineRefresh>
                </Link>
                <Link to='/cryptos/add'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>

            </div>

            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <div className="flex items-center">
                        <h2 className="mr-4 text-lg font-semibold">Portfolio Value:</h2>
                        <p className="text-xl">${cryptos.reduce((sum, crypto) => sum + crypto.price * crypto.quantity, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <table className='w-full border-collapse border-separate'>
                        <thead>
                            <tr>
                                <th className='border p-2 rounded-md'>Name</th>
                                <th className='border p-2 rounded-md'>Ticker</th>
                                <th className='border p-2 rounded-md'>Price</th>
                                <th className='border p-2 rounded-md'>Quantity</th>
                                <th className='border p-2 rounded-md'>Quantity USD</th>
                                <th className='border p-2 rounded-md'>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cryptos.map((crypto) => (
                                <tr key={crypto.id} className='h-8'>
                                    <td className='border p-2 text-center'>{crypto.name}</td>
                                    <td className='border p-2 text-center'>{crypto.ticker}</td>
                                    <td className='border p-2 text-center'>{crypto.price ? "$" + crypto.price.toLocaleString() : "N/A"}</td>
                                    <td className='border p-2 text-center'>{crypto.quantity}</td>
                                    <td className='border p-2 text-center'>{crypto.price ? "$" + (crypto.quantity * crypto.price).toLocaleString() : "N/A"}</td>

                                    <td className='border p-2 text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/cryptos/details/${crypto._id}`}>
                                                <BsInfoCircle className='text-2xl text-green-800' />
                                            </Link>
                                            <Link to={`/cryptos/edit/${crypto._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                                            </Link>
                                            <Link to={`/cryptos/delete/${crypto._id}`}>
                                                <MdOutlineDelete className='text-2xl text-red-600' />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    )
}

export default Home