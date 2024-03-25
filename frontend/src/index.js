import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthProvider from './components/Providers/AuthProvider.jsx';
import ChatApiProvider from './api/ChatApiProvider.jsx';
import App from './components/App/App.jsx';
import store from './slices/index.js';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <ChatApiProvider>
        <App />
      </ChatApiProvider>
    </AuthProvider>
  </Provider>,
);
