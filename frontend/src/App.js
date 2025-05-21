import React, { useEffect, useState } from 'react';
import LoginPage from './pages/Loginpage';

function App() {
    const [dados, setDados] = useState(null);

    useEffect(() => {
        // Substitua pela URL da sua API
        fetch('http://localhost:3001/todos')
            .then((response) => response.json())
            .then((data) => setDados(data))
            .catch((error) => console.error('Erro ao buscar dados:', error));
    }, []);

    /* {
        (' ');
    }
    {
        dados ? (
            <pre>{JSON.stringify(dados, null, 2)}</pre>
        ) : (
            <p>Carregando...</p>
        );
    } */

    return (
        <div className="App">
            <header className="App-header">Front end</header>
            <LoginPage />
        </div>
    );
}

export default App;
