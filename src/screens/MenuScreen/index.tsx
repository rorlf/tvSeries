import React, { useEffect, useState } from 'react';

// Services
import { checkIsFingerprintAvailable, showMessage } from 'services';

// Hooks
import { useTheme } from 'store/slices/themeSlice';
import { useStorageValue } from 'data/Storage';

// Components
import { KeyboardAvoidingView, Modal, View } from 'react-native';
import { BackButton, PinInput } from 'shared/components';
import { Option } from './components';

// Styles
import useStyles from './styles';

export const MenuScreen = () => {
  const styles = useStyles();
  const { isDark } = useTheme();
  const [isFingerprintAvailable, setIsFingerprintAvailable] = useState(false);
  const [isPinInputVisible, setIsPinInputVisible] = useState(false);
  const [pin] = useStorageValue('@pin');
  const [useFigerprint, setUseFigerprint] = useStorageValue('@useFigerprint');
  const hasPin = !!pin;
  const shouldDisplayUseFigerprint = isFingerprintAvailable && hasPin;

  useEffect(() => {
    verifyFigerprintSensor();
  }, []);

  async function verifyFigerprintSensor() {
    const isFingerprintAvailable = await checkIsFingerprintAvailable();
    setIsFingerprintAvailable(isFingerprintAvailable);
  }

  function onDarkModeValueChange() {}

  function securedWithPinValueChange() {
    setIsPinInputVisible(true);
  }

  function useFigerprintValueChange(value) {
    setUseFigerprint(value);
  }

  function onHandlePinSuccess() {
    setIsPinInputVisible(false);
    if (hasPin) {
      setUseFigerprint(false);
      showMessage('PIN removed');
      return;
    }

    showMessage('PIN registered');
  }

  function closeModal() {
    setIsPinInputVisible(false);
  }

  return (
    <View style={styles.screen}>
      <Option
        label="Dark mode"
        value={isDark}
        onValueChange={onDarkModeValueChange}
      />

      <Option
        label="Secured with Pin"
        value={hasPin}
        onValueChange={securedWithPinValueChange}
      />
      {shouldDisplayUseFigerprint && (
        <Option
          label="Use Figerprint"
          value={useFigerprint}
          onValueChange={useFigerprintValueChange}
        />
      )}
      <Modal visible={isPinInputVisible} onRequestClose={closeModal}>
        <KeyboardAvoidingView style={styles.pinModalContainer}>
          <BackButton onPress={closeModal} style={styles.modalBackButton} />
          <PinInput
            type={hasPin ? 'remove' : 'register'}
            onSuccess={onHandlePinSuccess}
          />
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};
