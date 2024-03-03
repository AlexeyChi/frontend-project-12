import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './components/Providers/AuthProvider.jsx';
import App from './components/App/App.jsx';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
