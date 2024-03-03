import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import MainPageRoute from './components/MainPageRoute';
import NavBar from './components/NavBar';
import LoginPage from '../LoginPage/LoginPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import MainPage from '../MainPage/MainPage';
import routes from '../../routes';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <NavBar />
      <Routes>
        <Route
          path={routes.app.mainPage()}
          element={(
            <MainPageRoute>
              <MainPage />
            </MainPageRoute>
          )}
        />
        <Route path={routes.app.loginPage()} element={<LoginPage />} />
        <Route path={routes.app.errorPage()} element={<ErrorPage />} />
      </Routes>
    </Router>
  </div>
);

export default App;
