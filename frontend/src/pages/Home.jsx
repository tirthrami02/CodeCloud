import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import CodeCard from '../components/home/CodeCard.jsx';
import CodeTable from '../components/home/CodeTable.jsx';

const Home = () => {
    const [codes, setCodes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/codes')
            .then((res) => {
                setCodes(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);
    
    // const handleSearch = () => {

    //     const filteredCodes = codes.filter(code =>
    //         code.title.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setCodes(filteredCodes);
    // };
    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            // If search term is empty, reset codes to the original array
            axios
                .get('http://localhost:5555/codes')
                .then((res) => {
                    setCodes(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            // Filter codes based on the searchTerm
            const filteredCodes = codes.filter(code =>
                code.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setCodes(filteredCodes);
        }
    };

    return (
        <div className='p-4'>
            <div className="flex justify-center items-center gap-x-4" >
                <button className='bg-sky-300 hover:bg-sky-600 rounded-lg px-4 py-1'
                    onClick={() => setShowType('table')}
                >
                    Table
                </button>
                <button className='bg-sky-300 hover:bg-sky-600 rounded-lg px-4 py-1'
                    onClick={() => setShowType('card')}
                >
                    Card
                </button>
                <button className=' bg-gray-700 hover:bg-white text-white hover:text-black hover:shadow-lg rounded-lg px-4 py-1 '
                    onClick={() => window.open("https://github.com/tirthrami02/CodeCloud", "_blank")}
                >
                    GitHub
                </button>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <button
                    className="bg-sky-300 hover:bg-sky-600 rounded-lg px-4 py-1 text-white"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">CodeCloud - Tirth Rami</h1>
                <Link to='/codes/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : showType === 'table' ? (
                <CodeTable codes={codes} />
            ) : (
                <CodeCard codes={codes} />
            )}
        </div>
    )
}

export default Home
