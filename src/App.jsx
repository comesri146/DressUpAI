import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Api from './Api';

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