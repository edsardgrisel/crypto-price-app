import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';


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
            <div className='flex justify-between items-center'>
                <h1 className='text-3x1 my-8'>Crypto Currencies</h1>
                <Link to='/cryptos/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4x1' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-seperate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>Name</th>
                            <th className='border border-slate-600 rounded-md'>Ticker</th>
                            <th className='border border-slate-600 rounded-md'>Price</th>
                            <th className='border border-slate-600 rounded-md'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptos.map((crypto) => {
                            <tr key={crypto.id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {crypto.name}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {crypto.ticker}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {crypto.price}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div>
                                        <Link to={`/cryptos/details/${crypto.id}`}>
                                            <BsInfoCircle className='text-2x1 text-green-800'></BsInfoCircle>
                                        </Link>
                                        <Link to={`/cryptos/edit/${crypto.id}`}>
                                            <AiOutlineEdit className='text-2x1 text-green-800'></AiOutlineEdit>
                                        </Link>
                                        <Link to={`/cryptos/delete/${crypto.id}`}>
                                            <MdOutlineDelete className='text-2x1 text-green-800'></MdOutlineDelete>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            )}


        </div>
    )
}

export default Home