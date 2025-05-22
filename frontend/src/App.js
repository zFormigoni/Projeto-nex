import React, { useEffect } from 'react';
import LoginPage from './pages/Loginpage';
import AdmPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    useNavigate,
} from 'react-router-dom';
import UserCadastro from './components/cadastro/UserCadastro';

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/login">Login</Link>{' '}
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
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin" element={<AdmPage />} />
                        <Route path="/user" element={<UserPage />} />
                        <Route path="/cadastro" element={<UserCadastro />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
