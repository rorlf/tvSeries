import React from 'react';

// Dependencies
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// Components
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

// Hooks
import { useTheme } from 'store/slices/themeSlice';

// Styles
import useStyles from './styles';

interface Props extends TextInputProps {
  searchString: string;
  onChangeSearchString: (searchString) => void;
}

export const SearchInput = ({
  searchString,
  onChangeSearchString,
  style,
  ...textInputProps
}: Props) => {
  const styles = useStyles();
  const { colors } = useTheme();

  function onPressClear() {
    onChangeSearchString('');
  }

  return (
    <View style={[styles.container, style]}>
      <MaterialIcon name="search" color={colors.textPrimary} size={28} />
      <TextInput
        value={searchString}
        onChangeText={onChangeSearchString}
        style={styles.text}
        placeholder="Search..."
        placeholderTextColor={colors.placeholder}
        {...textInputProps}
      />
      {searchString.length > 0 && (
        <TouchableOpacity onPress={onPressClear}>
          <MaterialCommunityIcon
            name="close"
            color={colors.textPrimary}
            size={20}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
