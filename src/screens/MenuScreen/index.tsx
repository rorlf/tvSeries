import React, { useState } from 'react';

// Services
import { showMessage } from 'services';

// Hooks
import { useTheme } from 'store/slices/themeSlice';
import { useStorageValue } from 'data/Storage';

// Components
import { KeyboardAvoidingView, Modal, Switch, View } from 'react-native';
import { BackButton, PinInput, SubHeading } from 'shared/components';

// Styles
import useStyles from './styles';

export const MenuScreen = () => {
  const styles = useStyles();
  const { isDark, colors } = useTheme();
  const [isPinInputVisible, setIsPinInputVisible] = useState(false);
  const [pin] = useStorageValue('@pin');
  const hasPin = !!pin;

  function onDarkModeValueChange(value) {
    console.log(value);
  }

  function protectedWithPinValueChange(value) {
    setIsPinInputVisible(true);
    if (value === true) {
    }
  }

  function onHandlePinSuccess() {
    setIsPinInputVisible(false);
    if (hasPin) {
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
      <View style={styles.optionContainer}>
        <SubHeading>Dark mode</SubHeading>
        <Switch
          value={isDark}
          onValueChange={onDarkModeValueChange}
          thumbColor={isDark ? colors.primary : colors.placeholder}
          trackColor={{
            false: colors.overlay,
            true: colors.placeholder,
          }}
        />
      </View>
      <View style={styles.optionContainer}>
        <SubHeading>Secured with Pin</SubHeading>
        <Switch
          value={hasPin}
          onValueChange={protectedWithPinValueChange}
          thumbColor={hasPin ? colors.primary : colors.placeholder}
          trackColor={{
            false: colors.overlay,
            true: colors.placeholder,
          }}
        />
      </View>
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
