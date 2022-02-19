import React, { ReactNode, useMemo, useState } from 'react';

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
  isCollapsed?: boolean;
  onToggleSection?: (isCollapsed) => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Section = ({
  title,
  children,
  isCollapsed: controlledIsCollapsed = true,
  onToggleSection,
  style,
}: Props) => {
  const [uncontrolledIsCollapsed, setUncontrolledIsCollapsed] = useState(
    controlledIsCollapsed,
  );
  const styles = useStyles();
  const { colors } = useTheme();
  const isCollapsed = useMemo(
    () => controlledIsCollapsed ?? uncontrolledIsCollapsed,
    [uncontrolledIsCollapsed, controlledIsCollapsed],
  );

  function onPressToggleSection() {
    setUncontrolledIsCollapsed(
      prevUncontrolledIsCollapsed => !prevUncontrolledIsCollapsed,
    );
    onToggleSection && onToggleSection(!isCollapsed);
  }

  return (
    <View>
      <TouchableOpacity
        style={[styles.header, style]}
        onPress={onPressToggleSection}>
        <Title>{title}</Title>
        <Icon
          name={uncontrolledIsCollapsed ? 'chevron-down' : 'chevron-up'}
          color={colors.textPrimary}
          size={30}
        />
      </TouchableOpacity>
      <Collapsible collapsed={uncontrolledIsCollapsed}>{children}</Collapsible>
    </View>
  );
};
