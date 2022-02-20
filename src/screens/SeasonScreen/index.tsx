import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Services
import { getSeasonEpisodes } from 'services';

// Components
import { FlatList, View } from 'react-native';
import {
  BackButton,
  Headline,
  Loading,
  ShowPoster,
  Title,
} from 'shared/components';
import { EpisodeItem } from './components';

// Types
import { Episode } from 'services/TvMazeService/types';
import { AppNavigatorParams } from 'navigators/AppNavigator/types';
import { RouteProp, useRoute } from '@react-navigation/native';

// Utils
import { removeTagsFromHtmlString } from 'shared/utils/string';

// Styles
import useStyles from './styles';
import { EpisodeItemProps } from './components/EpisodeItem/types';

type ScreenRouteProp = RouteProp<AppNavigatorParams, 'SeasonScreen'>;

export const SeasonScreen = () => {
  const [isEpisodesLoading, setIsEpisodesLoading] = useState(true);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const { params } = useRoute<ScreenRouteProp>();
  const styles = useStyles();
  const episodesFormatted = useMemo(() => formatEpisodes(), [episodes]);

  useEffect(() => {
    obtainEpisodes();
  }, []);

  async function obtainEpisodes() {
    setIsEpisodesLoading(true);

    try {
      const episodes = await getSeasonEpisodes(params.season.id);
      setEpisodes(episodes);
    } catch (error) {}

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
        <ShowPoster uri={params.season.image?.medium} style={styles.image} />
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

  const renderFooter = useCallback(
    () => (
      <View style={styles.footer}>
        {isEpisodesLoading && <Loading style={styles.loading} />}
      </View>
    ),
    [isEpisodesLoading],
  );

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.container}
        keyExtractor={keyExtractor}
        data={episodesFormatted}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
      />
      <BackButton style={styles.backButton} />
    </View>
  );
};
