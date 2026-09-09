import SingIn from "./components/comman/singin";
import Login from "./components/comman/login";
import ProtectedRoute from "./components/comman/protectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BusesPage from "./pages/BusesPage";
import MeterPage from "./pages/MetersPage";
import EmployeePage from "./pages/EmployeesPage";
import DailyTrip from './pages/DailyTripPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SingIn />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/bus" element={<BusesPage />} />  
                    <Route path="/employee" element={<EmployeePage />} />  
                    <Route path="/meter" element={<MeterPage />} />  
                    <Route path="/dailyTrip" element={<DailyTrip />} />  
                </Route>
                
            </Routes>
        </BrowserRouter>

    );
}

export default App;