import {
  MessageOptions,
  showMessage as showFlashMessage,
} from 'react-native-flash-message';
import store from 'store';

export function showError(message: string, options?: MessageOptions) {
  const {
    theme: { colors },
  } = store.getState();

  showFlashMessage({
    message,
    backgroundColor: colors.error,
    color: colors.textPrimary,
    ...options,
  });
}

export function showMessage(message: string, options?: MessageOptions) {
  const {
    theme: { colors },
  } = store.getState();

  showFlashMessage({
    message,
    backgroundColor: colors.messageBackground,
    color: colors.textMessage,
    ...options,
  });
}
