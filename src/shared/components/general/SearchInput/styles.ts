import { StyleSheet } from 'react-native';
import { spacing } from 'shared/utils/styles';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: spacing(2),
      paddingVertical: spacing(2),
      borderRadius: spacing(1),
      alignItems: 'center',
      backgroundColor: colors.searchInputBackground,
    },
    text: {
      color: colors.textPrimary,
      fontSize: 14,
      fontWeight: '400',
      flex: 1,
      padding: 0,
      marginLeft: spacing(2),
    },
  });
}
