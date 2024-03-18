import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditCodes = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [uploadTime, setUploadTime] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();   
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/codes/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setUploadTime(res.data.uploadTime);
        setDescription(res.data.description);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert('Error occurred, kindly check the console.');
        console.log(err);
      })
  }, []);

  const handleEditCode = () => {
    const data = {
      title,
      author,
      uploadTime,
      description,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/codes/${id}`, data) 
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Code edited successfully.", { variant: 'success' });
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        alert('An error happened, please check console.');
        enqueueSnackbar("Error occurred.", { variant: 'error' });
        console.log(err);
      });
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Code</h1>
      {loading ? (<Spinner />) : ('')}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className="my-4">
          <label className="text-xl text-gray-400">
            Title
          </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className="text-xl text-gray-400">
            Author
          </label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className="text-xl text-gray-400">
            Upload Year
          </label>
          <input type="number" value={uploadTime} onChange={(e) => setUploadTime(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className="text-xl text-gray-400">
            Description
          </label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditCode}>
          Commit
        </button>
      </div>
    </div>
  )
}

export default EditCodes;