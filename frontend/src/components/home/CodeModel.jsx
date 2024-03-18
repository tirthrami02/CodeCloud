
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const CodeModel = ({ code, onClose }) => {
    return (
        <div
            onClick={onClose}
            className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
        >
            <div className='w-[600px] max-w-full h-auto bg-white rounded-xl p-4 flex flex-col relative'>
                <AiOutlineClose className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose} />
                <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
                    {code.uploadTime}
                </h2>
                <h4 className='my-2 text-gray-500'>{code._id}</h4>
                <div className="flex justify-start items-center gap-x-2">
                    <PiBookOpenTextLight className='text-red-300 text-2xl' />
                    <h2 className='my-2'>{code.title}</h2>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <BiUserCircle className='text-red-300 text-2xl' />
                    <h2 className='my-2'>{code.author}</h2>
                </div>
                <code className='my-2'>
                    {code.description}
                </code>
            </div>
        </div>
    )
}

export default CodeModel