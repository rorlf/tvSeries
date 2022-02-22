import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Services
import { getSeasonEpisodes } from 'services';

// Components
import { FlatList, View } from 'react-native';
import {
  BackButton,
  Error,
  Headline,
  Loading,
  Poster,
  Title,
} from 'shared/components';
import { EpisodeItem } from './components';

// Types
import { Episode } from 'services/TvMazeService/types';
import { AppNavigatorParams } from 'navigators/AppNavigator/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { EpisodeItemProps } from './components/EpisodeItem/types';

// Utils
import { removeTagsFromHtmlString } from 'shared/utils/string';

// Styles
import useStyles from './styles';

type ScreenRouteProp = RouteProp<AppNavigatorParams, 'SeasonScreen'>;

export const SeasonScreen = () => {
  const [isEpisodesLoading, setIsEpisodesLoading] = useState(true);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const { params } = useRoute<ScreenRouteProp>();
  const styles = useStyles();
  const episodesFormatted = useMemo(() => formatEpisodes(), [episodes]);

  useEffect(() => {
    obtainEpisodes();
  }, []);

  async function obtainEpisodes() {
    setIsEpisodesLoading(true);
    setErrorMessage(undefined);

    try {
      const episodes = await getSeasonEpisodes(params.season.id);
      setEpisodes(episodes);
    } catch (error) {
      setErrorMessage('Error getting episodes');
    }

    setIsEpisodesLoading(false);
  }

  function formatEpisodes(): EpisodeItemProps[] {
    return episodes.map(episode => {
      const title = `${episode.number ?? 'S'}. ${episode.name}`;
      const description = episode.summary
        ? removeTagsFromHtmlString(episode.summary)
        : `We don't have a summary for ${episode.name} yet.`;
      return { ...episode, title, description };
    });
  }

  const keyExtractor = useCallback(
    (show: EpisodeItemProps) => show.id.toString(),
    [],
  );
  const renderItem = useCallback(
    ({ item: episode }) => <EpisodeItem {...episode} />,
    [],
  );

  const renderHeader = useCallback(
    () => (
      <View style={styles.header}>
        <Poster uri={params.season.image?.medium} style={styles.image} />
        <Headline style={styles.name} selectable>
          {params.showName}{' '}
          <Title style={styles.seasonNumber}>
            ({`Season ${params.season.number}`})
          </Title>
        </Headline>
      </View>
    ),
    [params],
  );

  const renderFooter = useCallback(() => <View style={styles.footer} />, []);

  const renderEmpty = useCallback(() => {
    if (isEpisodesLoading) return <Loading style={styles.loading} />;

    if (errorMessage)
      return <Error onPressRetry={obtainEpisodes} message={errorMessage} />;

    return null;
  }, [isEpisodesLoading, errorMessage]);

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.container}
        keyExtractor={keyExtractor}
        data={episodesFormatted}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />
      <BackButton style={styles.backButton} />
    </View>
  );
};
