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
      paddingVertical: metrics.screenPadding,
    },
    backButton: {
      position: 'absolute',
      top: spacing(4),
      left: spacing(4),
    },
    favoriteContainer: {
      top: spacing(4),
      right: spacing(4),
      position: 'absolute',
      backgroundColor: colors.overlay,
      height: 32,
      width: 32,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      alignSelf: 'center',
    },
    name: {
      textAlign: 'center',
      paddingTop: spacing(4),
      paddingHorizontal: spacing(8),
    },
    premiered: {
      fontWeight: '300',
    },
    sections: {
      paddingTop: spacing(6),
    },
    section: {
      marginTop: spacing(4),
      paddingHorizontal: metrics.screenPadding,
    },
    sectionContent: {
      paddingHorizontal: spacing(8),
      paddingTop: spacing(2),
    },
    seasons: {
      marginTop: spacing(2),
    },
    seasonsContent: {
      paddingHorizontal: spacing(4),
    },
    episodesContainer: {
      marginTop: spacing(2),
    },
    sectionTitleContainer: {
      backgroundColor: colors.overlay,
      paddingHorizontal: spacing(2),
      paddingVertical: spacing(1),
      marginRight: spacing(1),
      borderRadius: spacing(1),
    },
    footer: {
      marginBottom: metrics.footer,
    },
  });
}
