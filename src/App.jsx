import { Routes, Route } from 'react-router-dom';
import RegistrationPage from './componets/Registration/RegistrationPage';
import LoginPage from './componets/Login/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
