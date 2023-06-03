/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import Router from './router';

export default function Main() {
  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
