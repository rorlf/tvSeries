import { StyleSheet } from 'react-native';
import { spacing } from 'shared/utils/styles';
import { useTheme } from 'store/slices/themeSlice';

export default function useStyles() {
  const { colors, metrics } = useTheme();

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.screenBackground,
    },
    container: {
      flex: 1,
      padding: metrics.screenPadding,
    },
    header: {
      marginBottom: spacing(4),
    },
    backButton: {
      position: 'absolute',
      left: spacing(4),
      top: spacing(4),
    },
    image: {
      alignSelf: 'center',
    },
    name: {
      textAlign: 'center',
      paddingTop: spacing(4),
      paddingHorizontal: spacing(8),
    },
    seasonNumber: {
      fontWeight: '300',
    },
    loading: {
      paddingVertical: spacing(5),
    },
    footer: {
      marginBottom: metrics.footer,
    },
  });
}
