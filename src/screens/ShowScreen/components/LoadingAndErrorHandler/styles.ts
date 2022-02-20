import { StyleSheet } from 'react-native';
import { spacing } from 'shared/utils/styles';

export default function useStyles() {
  return StyleSheet.create({
    loading: {
      paddingVertical: spacing(5),
    },
  });
}
