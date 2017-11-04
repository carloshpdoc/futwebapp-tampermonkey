/* globals models onVisibilityChanged gAuthenticationModel document */
import 'babel-polyfill';

import initSettingsScreen from './settings';

import { Settings, Queue } from './core';

import {
  CardInfoSettings,
  RefreshListSettings,
  RemoveSoldAuctionsSettings,
  RelistAuctionsSettings,
  MinBinSettings,
} from './transferlist';

gAuthenticationModel.addListener(
  models.AuthenticationModel.EVENT_AUTHENTICATION_SUCCESSFUL,
  this,
  () => {
    Queue.getInstance().start();

    // get rid of pinEvents when switching tabs
    document.removeEventListener('visibilitychange', onVisibilityChanged);

    const settings = Settings.getInstance();
    settings.registerEntry(new RefreshListSettings());
    settings.registerEntry(new RemoveSoldAuctionsSettings());
    settings.registerEntry(new RelistAuctionsSettings());
    settings.registerEntry(new MinBinSettings());
    settings.registerEntry(new CardInfoSettings());

    initSettingsScreen(settings);
  },
);
