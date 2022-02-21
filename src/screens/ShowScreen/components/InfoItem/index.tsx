import React from 'react';

// Components
import { View } from 'react-native';
import { Body1, Body2 } from 'shared/components';

// Styles
import useStyles from './styles';

interface Props {
  label: string;
  value?: string | number | null;
  onPressValue?: () => void;
}

export const InfoItem = ({ label, value, onPressValue }: Props) => {
  const styles = useStyles(!!onPressValue);

  if (value)
    return (
      <View style={styles.container}>
        <Body2>{label}: </Body2>
        <Body1 style={styles.value} onPress={onPressValue}>
          {value}
        </Body1>
      </View>
    );

  return null;
};
