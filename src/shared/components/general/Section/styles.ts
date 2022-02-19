import { StyleSheet } from 'react-native';

export default function useStyles() {
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
}
