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
      paddingVertical: metrics.screenPadding,
    },
    backButton: {
      position: 'absolute',
      top: metrics.spacing(4),
      left: metrics.spacing(4),
    },
    image: {
      alignSelf: 'center',
    },
    name: {
      textAlign: 'center',
      paddingTop: metrics.spacing(4),
      paddingHorizontal: metrics.spacing(8),
    },
    premiered: {
      fontWeight: '300',
    },
    sections: {
      paddingTop: metrics.spacing(6),
    },
    section: {
      marginTop: metrics.spacing(4),
      paddingHorizontal: metrics.screenPadding,
    },
    sectionContent: {
      paddingHorizontal: metrics.spacing(8),
      paddingTop: metrics.spacing(2),
    },
    seasons: {
      marginTop: metrics.spacing(2),
    },
    seasonsContent: {
      paddingHorizontal: metrics.spacing(4),
    },
    loading: {
      paddingVertical: metrics.spacing(5),
    },
    footer: {
      marginBottom: metrics.footer,
    },
  });
}
