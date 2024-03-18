import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';

const ShowCode = () => {
  const [code, setcode] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/codes/${id}`)
      .then((res) => {
        setcode(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">Show Code:</h1>
      {
        loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
            <div className="my-4">
              <span className='text-xl mr-4 text-grey-500'>Id</span>
              <span>{code._id}</span>
              </div>
              <div className="my-4">
                <span className='text-xl mr-4 text-grey-500'>Title: </span>
                <span>{code.title}</span>
              </div>
              <div className="my-4">
                <span className='text-xl mr-4 text-grey-500'>Author: </span>
                <span>{code.author}</span>
              </div>
              <div className="my-4">
                <span className='text-xl mr-4 text-grey-500'>Upload Year: </span>
                <span>{code.uploadTime}</span>
              </div>
              <div className="my-4">
                <span className='text-xl mr-4 text-grey-500'>Description: </span>
                <span>{code.description}</span>
              </div>
              <div className="my-4">
                <span className='text-xl mr-4 text-grey-500'>Create Time</span>
                <span>{new Date(code.createdAt).toString()}</span>
              </div>
              <div className="my-4">
                <span className='text-xl mr-4 text-grey-500'>Last Update Time</span>
                <span>{new Date(code.updatedAt).toString()}</span>
              </div>
          </div>
        )
      }
    </div>
  )
}

export default ShowCode