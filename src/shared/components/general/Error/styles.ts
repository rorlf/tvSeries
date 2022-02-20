import { StyleSheet } from 'react-native';
import { spacing } from 'shared/utils/styles';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    tryAgainContainer: {
      borderRadius: spacing(3),
      borderWidth: 1,
      borderColor: colors.inactiveIcon,
      paddingHorizontal: spacing(4),
      paddingVertical: spacing(2),
      marginTop: spacing(10),
    },
  });
}
