import React from 'react';

const FloatingInput = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    disabled,
    newClass,
}) => {

    return (
        <div className="relative flex flex-col-reverse w-full mb-4">
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={type}
                    placeholder={placeholder}
                    aria-label={label}
                    className={`peer w-full pb-1 pt-6 pl-3 pr-11 text-base rounded-lg border border-gray-400 focus:border-blue-400 text-gray-600 bg-transparent focus:outline-none focus:ring-0 appearance-none transition-colors duration-300 ${disabled ? "bg-gray-200" : ""} ${newClass}`}
                    disabled={disabled}
                />
            </div>

            <label
                htmlFor={name}
                className="absolute top-0 items-center px-3 pt-2 text-xs peer-focus:font-semibold capitalize peer-focus:text-blue-400 text-gray-600 bg-transparent transition-colors duration-300"
            >
                {label}
            </label>
        </div>
    );
}

export default FloatingInput;
