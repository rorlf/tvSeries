import React from 'react';

// Hooks
import { useNavigation } from '@react-navigation/native';

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
  const { replace } = useNavigation<NavigationProps>();

  async function onConfirmPinSuccess() {
    replace('HomeNavigator', { screen: 'HomeScreen' });
  }

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <PinInput type="confirm" onSuccess={onConfirmPinSuccess} />
    </KeyboardAvoidingView>
  );
};
