import { StyleSheet } from 'react-native';
import { spacing } from 'shared/utils/styles';

export default function useStyles() {
  return StyleSheet.create({
    section: {
      marginTop: spacing(4),
    },
    sectionContent: {
      paddingHorizontal: spacing(4),
      paddingTop: spacing(2),
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: '33%',
    },
    description: {
      marginLeft: 20,
      flex: 1,
    },
  });
}
