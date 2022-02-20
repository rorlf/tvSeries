import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { colors, metrics } = useTheme();

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.screenBackground,
      padding: metrics.screenPadding,
    },
    content: {
      flex: 1,
    },
    searchInput: {
      marginBottom: metrics.spacing(2),
    },
    columnWrapper: {
      justifyContent: 'space-between',
    },
    footer: {
      marginBottom: metrics.footer,
    },
  });
}
