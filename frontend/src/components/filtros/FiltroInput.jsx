import React from 'react';

function FiltroInput({ label, type = 'text', value, onChange, placeholder }) {
    return (
        <div style={{ marginRight: '150px', marginBottom: '10px' }}>
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
