import React, { useRef } from 'react';

// Dependencies
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// Components
import {
  Pressable,
  TextInput as ReactTextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'shared/components';

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
  const textInputRef = useRef<ReactTextInput>(null);
  const { colors } = useTheme();

  function onPressClear() {
    onChangeSearchString('');
  }

  function onPressInput() {
    textInputRef.current?.focus();
  }

  return (
    <Pressable style={[styles.container, style]} onPress={onPressInput}>
      <MaterialIcon name="search" color={colors.textPrimary} size={28} />
      <TextInput
        innerRef={textInputRef}
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
    </Pressable>
  );
};
