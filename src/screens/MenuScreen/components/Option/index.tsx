import React from 'react';

// Components
import { View } from 'react-native';
import { SubHeading, Switch } from 'shared/components';

// Styles
import useStyles from './styles';

interface Props {
  label: string;
  value?: boolean;
  onValueChange: (value) => void;
}

export const Option = ({ label, value, onValueChange }: Props) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <SubHeading>{label}</SubHeading>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};
