import React, { useState } from 'react';

const FloatingInput = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    disabled,
    newClass,
    handleBlur,
    errorMessage
}) => {

    return (
        <div className="relative flex flex-col-reverse w-full mb-4">
            <div>
                <div className="relative">
                    <input
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={handleBlur}
                        type={type}
                        placeholder={placeholder}
                        aria-label={label}
                        className={`peer w-full pb-1 pt-6 pl-3 pr-11 text-base rounded-lg border ${errorMessage ? 'border-red-500' : 'border-gray-400'} focus:border-blue-400 text-gray-600 bg-transparent focus:outline-none focus:ring-0 appearance-none transition-colors duration-300 ${disabled ? 'bg-gray-200' : ''} ${newClass}`}
                        disabled={disabled}
                        required
                    />
                </div>

                <label
                    htmlFor={name}
                    className={`absolute top-0 items-center px-3 pt-2 text-xs ${errorMessage ? 'text-red-500' : 'peer-focus:font-semibold text-gray-600'} bg-transparent transition-colors duration-300`}
                >
                    {label}
                </label>
                <p className='px-3 my-0 py-0 text-xs text-red-500 bg-transparent transition-colors duration-300'>{errorMessage}</p>
            </div>
        </div>
    );
}

export default FloatingInput;
