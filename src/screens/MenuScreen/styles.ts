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
    },
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: spacing(2),
    },
    backButton: {
      position: 'absolute',
      left: spacing(4),
      top: spacing(4),
    },
  });
}
