import React from 'react'
import CodeCardSingle from './CodeCardSingle.jsx';

const CodeCard = ({ codes }) => {

    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {codes.map((code) => (
                <CodeCardSingle key={code._id} code={code} />
            ))}
        </div>
    )
}

export default CodeCard;