import React from 'react';

let newName = '';
let path = '';

function UploadExcel() {
    const handleFile = async (e) => {
        //? seleciona a planilha
        const file = e.target.files[0];

        //?cria um objeto e adiciona o arquivo para ser enviado em uma requisição HTTP
        const formData = new FormData();
        formData.append('file', file);

        try {
            await fetch('http://localhost:3001/usuarios/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    newName = data.nomeSalvo;
                    path = data.caminho;
                    console.log('itens adicionados com sucesso!');
                })
                .catch(console.log('Erro para adicionar itens'));
        } catch (error) {
            console.error('Erro:', error);
        }
        try {
            await fetch('http://localhost:3001/transacoes/adicionar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName, path: path }),
            }).then((response) => response.json());
        } catch (error) {
            console.error('Erro:', error);
        }
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
