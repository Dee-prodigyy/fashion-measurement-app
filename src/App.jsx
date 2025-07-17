import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister'; // combined auth page
import CustomersPage from './pages/Customers'; // secure page
import Dashboard from './pages/Dashboard' // New dashboard page
import VerifyEmail from './components/VerifyEmail'; // Email verification component
import SavedCustomers from './pages/SavedCustomers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<LoginRegister />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/SavedCustomers" element={<SavedCustomers />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
