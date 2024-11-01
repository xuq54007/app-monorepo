/* eslint-disable import/first */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-undef */
import log from 'electron-log/renderer';

(function () {
  const oldSetTimeout = globalThis.setTimeout;
  globalThis.setTimeout = function () {
    const e = new Error('Just for stack trace');
    log.info('New timeout registered from %s', e.stack);
    return oldSetTimeout.apply(this, arguments);
  };
  const oldSetInterval = globalThis.setInterval;
  globalThis.setInterval = function () {
    const e = new Error('Just for stack trace');
    log.info('New interval registered from %s', e.stack);
    return oldSetInterval.apply(this, arguments);
  };
})();

import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
