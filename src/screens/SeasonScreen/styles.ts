import { StyleSheet } from 'react-native';
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
      marginBottom: metrics.spacing(4),
    },
    backButton: {
      position: 'absolute',
      left: metrics.spacing(4),
      top: metrics.spacing(4),
    },
    image: {
      alignSelf: 'center',
    },
    name: {
      textAlign: 'center',
      paddingTop: metrics.spacing(4),
      paddingHorizontal: metrics.spacing(8),
    },
    seasonNumber: {
      fontWeight: '300',
    },
    loading: {
      paddingVertical: metrics.spacing(5),
    },
    footer: {
      marginBottom: metrics.footer,
    },
  });
}
