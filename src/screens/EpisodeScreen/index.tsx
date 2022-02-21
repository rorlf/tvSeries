import React from 'react';

// Components
import { View } from 'react-native';
import {
  BackButton,
  Body1,
  Body2,
  Headline,
  ShowPoster,
  Title,
} from 'shared/components';

// Types
import { AppNavigatorParams } from 'navigators/AppNavigator/types';
import { RouteProp, useRoute } from '@react-navigation/native';

// Utils
import { removeTagsFromHtmlString } from 'shared/utils/string';

// Styles
import useStyles from './styles';

type ScreenRouteProp = RouteProp<AppNavigatorParams, 'EpisodeScreen'>;

export const EpisodeScreen = () => {
  const { params } = useRoute<ScreenRouteProp>();
  const summary = params.summary
    ? removeTagsFromHtmlString(params.summary)
    : `We don't have a summary for ${params.name} yet.`;

  const styles = useStyles();

  return (
    <View style={styles.screen}>
      <ShowPoster uri={params.image?.medium} style={styles.image} />
      <Headline style={styles.name} selectable>
        {params.name}{' '}
        <Title style={styles.seasonNumber}>({`Season ${params.season}`})</Title>
      </Headline>
      <Body2 style={styles.episode}>Episode {params.number}</Body2>
      <Body1>{summary}</Body1>
      <BackButton style={styles.backButton} />
    </View>
  );
};
