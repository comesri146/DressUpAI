import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Api from './Api/Api';
import { AuthContext } from './Context/Auth';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/api" element={<Api />} />
            </Routes>
        </Router>
    );
}

export default App;