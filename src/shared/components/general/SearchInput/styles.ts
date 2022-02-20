import { StyleSheet } from 'react-native';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { colors, metrics } = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: metrics.spacing(2),
      paddingVertical: metrics.spacing(2),
      borderRadius: metrics.spacing(1),
      alignItems: 'center',
      backgroundColor: colors.searchInputBackground,
    },
    text: {
      color: colors.textPrimary,
      fontSize: 14,
      fontWeight: '400',
      flex: 1,
      padding: 0,
      marginLeft: metrics.spacing(2),
    },
  });
}
