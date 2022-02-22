import React, { useEffect } from 'react';

// Dependencies
import TouchID from 'react-native-touch-id';

// Hooks
import { useNavigation } from '@react-navigation/native';
import { useStorageValue } from 'data/Storage';
import { useTheme } from 'store/slices/themeSlice';

// Components
import { KeyboardAvoidingView } from 'react-native';
import { PinInput } from 'shared/components';

// Types
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParams } from 'navigators/AppNavigator/types';

// Styles
import useStyles from './styles';

type NavigationProps = StackNavigationProp<AppNavigatorParams, 'PinScreen'>;

export const PinScreen = () => {
  const styles = useStyles();
  const { colors } = useTheme();
  const { replace } = useNavigation<NavigationProps>();
  const [shouldUseFigerprint] = useStorageValue('@shouldUseFigerprint');

  useEffect(() => {
    verifyFingerprint();
  }, []);

  async function verifyFingerprint() {
    try {
      if (shouldUseFigerprint) {
        await TouchID.authenticate('Enter your fingerprint', {
          imageColor: colors.primary,
          imageErrorColor: colors.error,
        });
        onAuthenticateSuccess();
      }
    } catch (error) {}
  }

  async function onAuthenticateSuccess() {
    replace('HomeNavigator', { screen: 'HomeScreen' });
  }

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <PinInput type="confirm" onSuccess={onAuthenticateSuccess} />
    </KeyboardAvoidingView>
  );
};
