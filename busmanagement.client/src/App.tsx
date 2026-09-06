import SingIn from "./components/comman/singin";
import Login from "./components/comman/login";
import Dashboard from "../src/pages/dashboard";
import ProtectedRoute from "./components/comman/protectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SingIn />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />  
                </Route>
                
            </Routes>
        </BrowserRouter>

    );
}

export default App;