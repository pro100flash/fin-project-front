// import logo from './wallet-logo.svg';
import './App.scss';
import Navigation from './components/dashboard/Navigation';
import Balance from './components/dashboard/Balance';
import { Routes, Route } from 'react-router';
import RegistrationPage from './views/RegistrationPage/RegistrationPage';
import LoginPage from './views/LoginPage/LoginPage';
import Diagram from '../src/components/statistic/Diagram';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Diagram />
      <Balance />

      <header className="App-header">
        <Routes>
          <Route
            path="/fin-project-front/"
            element={<p>Допиши /registration или /login</p>}
          />
          <Route
            path="/fin-project-front/registration"
            element={<RegistrationPage />}
          />
          <Route path="/fin-project-front/login" element={<LoginPage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;