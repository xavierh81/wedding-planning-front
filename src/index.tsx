// Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import moment from 'moment';
import 'moment/min/locales';

import App from './App';

// Import i18n
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { en, fr } from 'make-plural/plurals'
import { messages as enMessages } from './locales/en/messages'
import { messages as frMessages } from './locales/fr/messages'
import { detect, fromUrl, fromStorage, fromNavigator } from "@lingui/detect-locale"

i18n.loadLocaleData({
  en: { plurals: en },
  fr: { plurals: fr },
})
i18n.load({
  en: enMessages,
  fr: frMessages,
})

const DEFAULT_LOCALE_FALLBACK = "en";
let localeDetected = detect(
  fromUrl("lang"),
  fromStorage("lang"),
  fromNavigator(),
  DEFAULT_LOCALE_FALLBACK
)

localeDetected = localeDetected ? localeDetected.substring(0, 2) : DEFAULT_LOCALE_FALLBACK

i18n.activate(localeDetected)

moment.locale(localeDetected)

//
// Render main root
//
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <I18nProvider i18n={i18n}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </I18nProvider>
);
