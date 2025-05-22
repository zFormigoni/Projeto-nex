import React from 'react';

function UploadExcel() {
    const handleFile = (e) => {
        console.log(`teste`);
    };

    return (
        <div>
            <label
                htmlFor="upload-excel"
                style={{ cursor: 'pointer', color: '#007bff' }}
            >
                Clique aqui para enviar sua planilha Excel
            </label>
            <input
                id="upload-excel"
                type="file"
                accept=".xlsx, .xls"
                style={{ display: 'none' }}
                onChange={handleFile}
            />
        </div>
    );
}

export default UploadExcel;
