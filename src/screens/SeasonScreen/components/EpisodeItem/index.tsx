import React from 'react';

// Components
import { View } from 'react-native';
import { Body1, Section, ShowPoster } from 'shared/components';

// Types
import { EpisodeItemProps } from './types';

// Styles
import useStyles from './styles';

export const EpisodeItem = ({
  title,
  description,
  image,
}: EpisodeItemProps) => {
  const styles = useStyles();

  return (
    <Section style={styles.section} title={title}>
      <View style={styles.sectionContent}>
        <ShowPoster uri={image?.medium} style={styles.image} />
        <Body1 style={styles.description}>{description}</Body1>
      </View>
    </Section>
  );
};
