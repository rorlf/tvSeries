import { StyleSheet } from 'react-native';
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
      marginVertical: metrics.spacing(2),
    },
    modalBackButton: {
      position: 'absolute',
      left: metrics.spacing(4),
      top: metrics.spacing(4),
    },
    pinModalContainer: {
      flex: 1,
      backgroundColor: colors.screenBackground,
      padding: metrics.screenPadding,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}
