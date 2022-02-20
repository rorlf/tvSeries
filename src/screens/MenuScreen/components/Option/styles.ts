import { StyleSheet } from 'react-native';
import { spacing } from 'shared/utils/styles';

export default function useStyles() {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: spacing(2),
    },
  });
}
