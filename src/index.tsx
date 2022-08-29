// Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import i18n
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { en, fr } from 'make-plural/plurals'
import { messages as enMessages } from './locales/en/messages'
import { messages as frMessages } from './locales/fr/messages'

i18n.loadLocaleData({
  en: { plurals: en },
  fr: { plurals: fr },
})
i18n.load({
  en: enMessages,
  fr: frMessages,
})
i18n.activate('en')

//
// Render main root
//
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <I18nProvider i18n={i18n}>
    <App />
  </I18nProvider>
);
