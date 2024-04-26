import React, { useState } from 'react';

const PresentAbsentButton = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className='flex items-center space-x-3'>
            <input type="checkbox" checked={isChecked} onChange={handleChange} className='' />
            <span className={isChecked ? 'text-green-500 plusJakartaSans font-semibold' : 'text-red-500 plusJakartaSans font-semibold'}>{isChecked ? 'Present' : 'Absent'}</span>
        </div>
    );
};

export default PresentAbsentButton;
