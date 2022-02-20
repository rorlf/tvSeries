import { StyleSheet } from 'react-native';
import { spacing } from 'shared/utils/styles';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { colors } = useTheme();

  return StyleSheet.create({
    tabBar: {
      backgroundColor: colors.navigationBar,
      height: 52,
      paddingBottom: spacing(1),
      borderTopWidth: 2,
    },
  });
}
