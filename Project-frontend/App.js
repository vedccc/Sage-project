/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import Navigator from './Routes';
import {Provider as GlobalVariableProvider} from 'react-redux';
import store from './Redux-Toolkit/store';
import Otp from './Screens/verifyScreen';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  return (
    <GlobalVariableProvider store={store}>
      <Navigator />
    </GlobalVariableProvider>
  );
};

export default App;
