import { StyleSheet } from 'react-native';
import { spacing } from 'shared/utils/styles';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { colors, metrics } = useTheme();

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.screenBackground,
      padding: metrics.screenPadding,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginBottom: spacing(10),
    },
    cellStyleFocused: {
      borderColor: colors.primary,
    },
  });
}
