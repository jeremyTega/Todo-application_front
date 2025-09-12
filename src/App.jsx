import { Routes, Route } from 'react-router-dom';
import RegistrationPage from './componets/Registration/RegistrationPage';
import LoginPage from './componets/Login/LoginPage';
import TaskBoard from './componets/Task-board/Task-board';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/task-board" element={<TaskBoard />} />
    </Routes>
  );
}

export default App;
