import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
} from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import ErrorPage from '../ErrorPage/ErrorPage';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <Routes>
        <Route path="/" element={<ErrorPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </div>
);

export default App;
