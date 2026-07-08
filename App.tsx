import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {
  asyncStoragePersister,
  queryClient,
} from './src/lib/queryClient';
import AppNavigator from './src/navigation/AppNavigator';
import {persistor, store} from './src/store/store';
import './src/i18n/i18n';
import LanguageSync from './src/i18n/LanguageSync';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{persister: asyncStoragePersister}}>
            <SafeAreaProvider>
              <LanguageSync />
              <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
                <AppNavigator />
              </View>
            </SafeAreaProvider>
          </PersistQueryClientProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
