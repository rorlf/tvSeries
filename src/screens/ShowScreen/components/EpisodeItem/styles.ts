import { StyleSheet } from 'react-native';
import { spacing } from 'shared/utils/styles';

export default function useStyles() {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: spacing(2),
      alignSelf: 'center',
      paddingHorizontal: spacing(3),
    },
    text: {
      marginRight: spacing(2),
    },
  });
}
