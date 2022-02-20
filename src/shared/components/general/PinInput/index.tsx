import React, { useMemo, useRef, useState } from 'react';

// Dependencies
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

// Components
import { StyleProp, View, ViewStyle } from 'react-native';
import { Title } from 'shared/components';

// Services
import { showError } from 'services';

// Hooks
import Storage, { useStorageValue } from 'data/Storage';

// Styles
import useStyles from './styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  type: 'confirm' | 'remove' | 'register';
  onSuccess: () => void;
}

export const PinInput = ({ onSuccess, type, style }: Props) => {
  const styles = useStyles();
  const [firstTryPin, setFirstTryPin] = useState('');
  const [pinTyped, setPinTyped] = useState('');
  const [pin] = useStorageValue('@pin');
  const pinInputRef = useRef<SmoothPinCodeInput>(null);
  const label = useMemo(() => createLabel(), [firstTryPin, type]);

  function onFulfill(pinCode: string) {
    switch (type) {
      case 'confirm':
        handleConfirmPin(pinCode);
        break;

      case 'remove':
        handleRemovePin(pinCode);
        break;

      case 'register':
        handleRegisterPin(pinCode);
        break;

      default:
        break;
    }
  }

  function handleConfirmPin(pinCode: string) {
    if (pinCode === pin) {
      onSuccess();
      return;
    }

    pinInputRef.current?.shake();
    showError('PIN incorrect');
    setPinTyped('');
  }

  function handleRemovePin(pinCode: string) {
    if (pinCode === pin) {
      Storage.removeData('@pin');
      onSuccess();
      return;
    }
    pinInputRef.current?.shake();
    showError('PIN incorrect');
    setPinTyped('');
  }

  function handleRegisterPin(pinCode: string) {
    if (!firstTryPin) {
      setFirstTryPin(pinCode);
      setPinTyped('');
      return;
    }

    if (pinCode !== firstTryPin) {
      pinInputRef.current?.shake();
      showError('PINs are not the same. Try again.');
      setPinTyped('');
      setFirstTryPin('');
      return;
    }

    Storage.storeSensitiveData('@pin', pinCode);
    onSuccess();
  }

  function createLabel() {
    switch (type) {
      case 'confirm':
        return 'Enter your PIN';

      case 'remove':
        return 'Confirm your PIN before remove';

      case 'register': {
        if (firstTryPin) return 'Confirm PIN';

        return 'Type your new PIN';
      }

      default:
        return '';
    }
  }

  return (
    <View style={[styles.container, style]}>
      <Title style={styles.title}>{label}</Title>
      <SmoothPinCodeInput
        cellStyleFocused={styles.cellStyleFocused}
        password
        codeLength={4}
        value={pinTyped}
        onTextChange={setPinTyped}
        onFulfill={onFulfill}
        ref={pinInputRef}
      />
    </View>
  );
};
