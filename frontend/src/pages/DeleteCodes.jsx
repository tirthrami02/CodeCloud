import React, { useState } from 'react'
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteCodes = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteCode = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/codes/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Code deleted successfully.", { variant: 'success' });
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        alert('Error occurred, kindly check the console.');
        enqueueSnackbar("Error occurred.", { variant: 'error' });
        console.log(err);
      });
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">Delete Code</h1>
      {loading ? (<Spinner />) : ('')}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className='text-2xl'>Are you sure you want to delete this code?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteCode}>Yes, Delete it.</button>
      </div>
    </div>
  )
}

export default DeleteCodes