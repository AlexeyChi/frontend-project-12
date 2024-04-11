import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import Rollbar from 'rollbar';
import { Provider as RollbarProvider } from '@rollbar/react';
import { Provider } from 'react-redux';
import leoProfanity from 'leo-profanity';

import AuthProvider from './components/Providers/AuthProvider.jsx';
import ChatApiProvider from './api/ChatApiProvider.jsx';
import App from './components/App/App.jsx';
import store from './slices/index.js';
import resources from './locales/index';
import badWordsRu from './locales/badWordsRu.js';

const init = async () => {
  const i18n = i18next.createInstance();
  const lng = localStorage.getItem('userLng') || 'ru';

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: lng,
    });

  const wordsFilterRu = leoProfanity.getDictionary('ru');
  leoProfanity.add(wordsFilterRu);
  leoProfanity.add(badWordsRu);

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    enviroment: 'production',
  };

  const rollbar = new Rollbar(rollbarConfig);

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbar}>
        <I18nextProvider i18n={i18n}>
          <ChatApiProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ChatApiProvider>
        </I18nextProvider>
      </RollbarProvider>
    </Provider>
  );
};

export default init;
