import React from 'react';

function FiltroInput({ label, type = 'text', value, onChange, placeholder }) {
    return (
        <div className="filtro-container">
            <label>
                {label}:&nbsp;
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </label>
        </div>
    );
}

export default FiltroInput;
