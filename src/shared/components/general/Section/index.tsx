import React, { ReactNode, useState } from 'react';

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
  defaultIsCollapsedValue?: boolean;
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Section = ({
  defaultIsCollapsedValue = true,
  title,
  children,
  style,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultIsCollapsedValue);
  const styles = useStyles();
  const { colors } = useTheme();

  function onPressToggleSection() {
    setIsCollapsed(prevIsCollapsed => !prevIsCollapsed);
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
