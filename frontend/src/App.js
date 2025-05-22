import React from 'react';
import LoginPage from './pages/Loginpage';
import AdmPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

//TODO: Implementar funcao para usar filtro de data
function converterDataExcel(numeroExcel) {
    const base = new Date(1900, 0, 1); // 1º de janeiro de 1900
    const dias = Number(numeroExcel) - 2; // Ajuste de correção: Excel conta 1900 como ano bissexto
    base.setDate(base.getDate() + dias);
    return base.toISOString().split('T')[0];
}

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Login</Link>{' '}
                            </li>
                            <li>
                                <Link to="/admin">Admin</Link>{' '}
                            </li>
                            <li>
                                <Link to="/user">User</Link>{' '}
                            </li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/admin" element={<AdmPage />} />
                        <Route path="/user" element={<UserPage />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
