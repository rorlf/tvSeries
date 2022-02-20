import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Dependencies
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Services
import {
  getSeasons,
  getShowEpisodes,
  onPressFavorite,
  showError,
} from 'services';

// Components
import {
  FlatList,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BackButton,
  Body1,
  Body2,
  Headline,
  Loading,
  Section,
  ShowPoster,
  Title,
} from 'shared/components';
import { EpisodeItem, InfoItem, SeasonItem } from './components';

// Hooks
import { useStorageValue } from 'data/Storage';
import { useTheme } from 'store/slices/themeSlice';

// Types
import { Episode, Season } from 'services/TvMazeService/types';
import { AppNavigatorParams } from 'navigators/AppNavigator/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

// Utils
import { removeTagsFromHtmlString } from 'shared/utils/string';

// Styles
import useStyles from './styles';

type ScreenRouteProp = RouteProp<AppNavigatorParams, 'ShowScreen'>;

export const ShowScreen = () => {
  const { navigate } = useNavigation();
  const { params } = useRoute<ScreenRouteProp>();
  const styles = useStyles();
  const { colors } = useTheme();
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isSeasonsLoading, setIsSeasonsLoading] = useState(true);
  const [isEpisodesLoading, setIsEpisodesLoading] = useState(true);
  const [activeEpisodeSection, setActiveEpisodeSection] = useState();
  const [favorites] = useStorageValue('@favorites');
  const isFavorite = useMemo(
    () => !!favorites?.some(favorite => favorite.id === params.id),
    [favorites, params.id],
  );

  const schedule = useMemo(() => createSchedule(), [params]);
  const sinopse = useMemo(
    () => removeTagsFromHtmlString(params.summary),
    [params],
  );
  const genres = useMemo(() => params.genres.join(' | '), [params]);
  const premieredYear = useMemo(
    () => params.premiered.substring(0, 4),
    [params],
  );

  const episodeSections = useMemo(() => createEpisodeSections(), [episodes]);
  const sectionTitles = useMemo(
    () => episodeSections.map(episodeSection => episodeSection.title),
    [episodeSections],
  );
  const episodesToRender = useMemo(
    () => createEpisodesToRender(),
    [activeEpisodeSection, episodeSections],
  );

  useEffect(() => {
    obtainSeasons();
    obtainEpisodes();
  }, []);

  async function obtainSeasons() {
    setIsSeasonsLoading(true);

    try {
      const seasons = await getSeasons(params.id);
      setSeasons(seasons.reverse());
    } catch (error) {
      showError('Error getting seasons');
    }

    setIsSeasonsLoading(false);
  }

  async function obtainEpisodes() {
    setIsEpisodesLoading(true);

    try {
      const episodes = await getShowEpisodes(params.id);
      setEpisodes(episodes);
    } catch (error) {
      showError('Error getting episodes');
    }

    setIsEpisodesLoading(false);
  }

  function createEpisodeSections() {
    const sections: { title: string; data: Episode[] }[] = [];

    episodes.forEach(episode => {
      const episodeSectionTitle = `Season ${episode.season}`;
      const sectionIndex = sections.findIndex(
        section => section.title === episodeSectionTitle,
      );
      if (sectionIndex !== -1) {
        sections[sectionIndex].data.push(episode);
      } else {
        sections.push({
          title: episodeSectionTitle,
          data: [episode],
        });
      }
    });
    return sections.reverse();
  }

  function createEpisodesToRender() {
    const index = episodeSections.findIndex(
      episodeSection => episodeSection.title === activeEpisodeSection,
    );

    return episodeSections[index]?.data ?? [];
  }

  function createSchedule() {
    if (params.schedule) {
      if (params.schedule.time && params.schedule.days.length > 0) {
        const runtime = createRuntime();
        const time = params.schedule.time;
        const day = params.schedule.days[0];

        const schedule = `${day} at ${time} ${runtime}`;

        return schedule;
      }
    }

    return undefined;
  }

  function createRuntime() {
    if (params.runtime) {
      return `(${params.runtime} min)`;
    }
    if (params.averageRuntime) {
      return `(~ ${params.runtime} min)`;
    }

    return '';
  }

  function onPressSite() {
    params.officialSite && Linking.openURL(params.officialSite);
  }

  function onPressSeason(season: Season) {
    navigate('SeasonScreen', { season, showName: params.name });
  }

  function onPressEpisode(episode: Episode) {
    // @todo
    // navigate('SeasonScreen', { season, showName: params.name });
  }

  const renderSeasonItem = useCallback(
    ({ item: season }) => (
      <SeasonItem onPress={() => onPressSeason(season)} {...season} />
    ),
    [],
  );

  const renderSeasonSectionItem = useCallback(
    ({ item: sectionTitle }) => (
      <TouchableOpacity
        style={styles.sectionTitleContainer}
        onPress={() => setActiveEpisodeSection(sectionTitle)}>
        {activeEpisodeSection === sectionTitle ? (
          <Body2>{sectionTitle}</Body2>
        ) : (
          <Body1>{sectionTitle}</Body1>
        )}
      </TouchableOpacity>
    ),
    [activeEpisodeSection],
  );

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        <ShowPoster uri={params.image?.medium} style={styles.image} />
        <Headline style={styles.name} selectable>
          {params.name}{' '}
          <Title style={styles.premiered}>({premieredYear})</Title>
        </Headline>
        <View style={styles.sections}>
          <Section style={styles.section} title="Show Info">
            <View style={styles.sectionContent}>
              {params.network?.name && (
                <InfoItem label="Network" value={params.network.name} />
              )}
              {schedule && <InfoItem label="Schedule" value={schedule} />}
              <InfoItem label="Status" value={params.status} />
              <InfoItem label="Show Type" value={params.type} />
              <InfoItem label="Genres" value={genres} />
              {params.officialSite && (
                <InfoItem
                  label="Official site"
                  value={params.officialSite}
                  onPressValue={onPressSite}
                />
              )}
              {params.rating?.average && (
                <InfoItem label="Rating" value={params.rating.average} />
              )}
            </View>
          </Section>
          <Section style={styles.section} title="Sinopse">
            <View style={styles.sectionContent}>
              <Body1>{sinopse}</Body1>
            </View>
          </Section>
          <Section style={styles.section} title="Seasons">
            {isSeasonsLoading ? (
              <Loading style={styles.loading} />
            ) : (
              <FlatList
                data={seasons}
                horizontal
                style={styles.seasons}
                renderItem={renderSeasonItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.seasonsContent}
              />
            )}
          </Section>
          <Section style={styles.section} title="Episodes">
            {isEpisodesLoading ? (
              <Loading style={styles.loading} />
            ) : (
              <View style={styles.episodesContainer}>
                <FlatList
                  data={sectionTitles}
                  horizontal
                  style={styles.seasons}
                  renderItem={renderSeasonSectionItem}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.seasonsContent}
                />
                <View style={styles.sectionContent}>
                  {episodesToRender.map(episode => (
                    <EpisodeItem
                      key={episode.id.toString()}
                      onPress={() => onPressEpisode(episode)}
                      {...episode}
                    />
                  ))}
                </View>
              </View>
            )}
          </Section>
        </View>
        <View style={styles.footer} />
      </ScrollView>
      <BackButton style={styles.backButton} />
      <TouchableOpacity
        style={styles.favoriteContainer}
        onPress={() => onPressFavorite(params)}>
        <Icon
          name="heart"
          color={isFavorite ? colors.favorite : colors.inactiveIcon}
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
};
