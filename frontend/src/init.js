import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';

import AuthProvider from './components/Providers/AuthProvider.jsx';
import ChatApiProvider from './api/ChatApiProvider.jsx';
import App from './components/App/App.jsx';
import store from './slices/index.js';
import resources from './locales/index';

const init = () => {
  const i18n = i18next.createInstance();

  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <Provider store={store}>
      <AuthProvider>
        <ChatApiProvider>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </ChatApiProvider>
      </AuthProvider>
    </Provider>
  );
};

export default init;
