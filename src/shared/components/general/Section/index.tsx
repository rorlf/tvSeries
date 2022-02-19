import React, { ReactNode } from 'react';

// Dependencies
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';

// Components
import { TouchableOpacity, View, ViewStyle, StyleProp } from 'react-native';
import { Title } from 'shared/components';

// Hooks
import { useTheme } from 'store/slices/themeSlice';

// Styles
import useStyles from './styles';

interface Props {
  title: string;
  isCollapsed: boolean;
  onToggleSection?: (isCollapsed) => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Section = ({
  title,
  isCollapsed,
  onToggleSection,
  children,
  style,
}: Props) => {
  const styles = useStyles();
  const { colors } = useTheme();

  function onPressToggleSection() {
    onToggleSection && onToggleSection(!isCollapsed);
  }

  return (
    <View>
      <TouchableOpacity
        style={[styles.header, style]}
        onPress={onPressToggleSection}>
        <Title>{title}</Title>
        <Icon
          name={isCollapsed ? 'chevron-down' : 'chevron-up'}
          color={colors.textPrimary}
          size={30}
        />
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>{children}</Collapsible>
    </View>
  );
};
