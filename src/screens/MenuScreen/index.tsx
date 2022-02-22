import React, { useCallback, useEffect, useState } from 'react';

// Services
import { checkIsFingerprintAvailable, showMessage } from 'services';

// Hooks
import { toggleTheme, useTheme } from 'store/slices/themeSlice';
import { useDispatch } from 'react-redux';
import Storage, { useStorageValue } from 'data/Storage';
import { useFocusEffect } from '@react-navigation/native';

// Components
import { Alert, BackHandler, View } from 'react-native';
import { BackButton, PinInput } from 'shared/components';
import { Option } from './components';

// Styles
import useStyles from './styles';

export const MenuScreen = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const [isFingerprintAvailable, setIsFingerprintAvailable] = useState(false);
  const [isPinInputVisible, setIsPinInputVisible] = useState(false);
  const [pin] = useStorageValue('@pin');
  const [shouldUseFigerprint, setShouldUseFigerprint] = useStorageValue(
    '@shouldUseFigerprint',
  );

  const hasPin = !!pin;
  const shouldDisplayUseFigerprint = isFingerprintAvailable && hasPin;

  useEffect(() => {
    verifyFigerprintSensor();
  }, []);

  const onBackPress = useCallback(() => {
    if (isPinInputVisible) {
      closePinInput();
      return true;
    }

    return false;
  }, [isPinInputVisible]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [onBackPress]),
  );

  async function verifyFigerprintSensor() {
    const isFingerprintAvailable = await checkIsFingerprintAvailable();
    setIsFingerprintAvailable(isFingerprintAvailable);
  }

  function onDarkModeValueChange(value: boolean) {
    if (value === false) {
      Alert.alert(
        'Warning',
        'The light mode is a proof of concept\n Wanna proceed?',
        [{ text: 'Cancel' }, { text: 'OK', onPress: () => changeTheme(value) }],
      );
      return;
    }
    changeTheme(value);
  }

  function changeTheme(value: boolean) {
    dispatch(toggleTheme());
    Storage.storeData('@darkMode', value);
  }

  function securedWithPinValueChange() {
    setIsPinInputVisible(true);
  }

  function useFigerprintValueChange(value) {
    setShouldUseFigerprint(value);
  }

  function onHandlePinSuccess() {
    closePinInput();
    if (hasPin) {
      setShouldUseFigerprint(false);
      showMessage('PIN removed');
      return;
    }

    showMessage('PIN registered');
  }

  function closePinInput() {
    setIsPinInputVisible(false);
  }

  return (
    <View style={styles.screen}>
      {isPinInputVisible ? (
        <>
          <BackButton onPress={closePinInput} style={styles.backButton} />
          <PinInput
            type={hasPin ? 'remove' : 'register'}
            onSuccess={onHandlePinSuccess}
          />
        </>
      ) : (
        <>
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
              value={shouldUseFigerprint}
              onValueChange={useFigerprintValueChange}
            />
          )}
        </>
      )}
    </View>
  );
};
