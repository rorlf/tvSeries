// Dependencies
import { MessageOptions, showMessage } from 'react-native-flash-message';
import store from 'store';

export function showError(message: string, options?: MessageOptions) {
  const {
    theme: { colors },
  } = store.getState();

  showMessage({
    message,
    backgroundColor: colors.error,
    color: colors.textPrimary,
    ...options,
  });
}
