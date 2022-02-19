import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { metrics } = useTheme();

  return StyleSheet.create({
    section: {
      marginTop: metrics.spacing(4),
    },
    sectionContent: {
      paddingHorizontal: metrics.spacing(4),
      paddingTop: metrics.spacing(2),
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
