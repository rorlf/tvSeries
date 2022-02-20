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
    title: {
      marginBottom: spacing(10),
    },
    cellStyleFocused: {
      borderColor: colors.primary,
    },
  });
}
