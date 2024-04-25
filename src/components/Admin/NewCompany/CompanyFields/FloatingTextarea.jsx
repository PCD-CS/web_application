import React from 'react';

const FloatingTextarea = ({
    label,
    name,
    value,
    rows = 1,
    onChange,
    placeholder,
    disabled,
}) => {
    return (
        <div className="relative flex flex-col-reverse w-full mb-4">
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-label={label}
                rows={rows}
                className={`peer w-full pb-1 pt-6 px-3 text-base rounded-lg border border-gray-400 focus:border-blue-400 text-gray-600 bg-transparent focus:outline-none focus:ring-0 appearance-none transition-colors duration-300 resize-none hover:resize-y ${disabled ? "bg-gray-200" : ""}`}
                disabled={disabled}
            />
            <label
                htmlFor={name}
                className="absolute top-0 items-center px-3 pt-2 text-xs capitalize  text-gray-600 bg-transparent transition-colors duration-300"
            >
                {label}
            </label>
        </div>
    );
}

export default FloatingTextarea;
