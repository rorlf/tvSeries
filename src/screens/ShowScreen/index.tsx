import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// Services
import { getSeasons } from 'services';

// Components
import { FlatList, Linking, ScrollView, View } from 'react-native';
import {
  BackButton,
  Body1,
  Headline,
  Loading,
  Section,
  ShowPoster,
  Title,
} from 'shared/components';
import { InfoItem, SeasonItem } from './components';

// Types
import { Season } from 'services/TvMazeService/types';
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
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [isSeasonsLoading, setIsSeasonsLoading] = useState(true);
  const [isInfoCollapsed, setIsInfoCollapsed] = useState(true);
  const [isSinopseCollapsed, setIsSinopseCollapsed] = useState(true);
  const [isSeasonsCollapsed, setIsSeasonsCollapsed] = useState(true);

  const scrollRef = useRef<ScrollView>(null);

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

  useEffect(() => {
    obtainSeasons();
  }, []);

  async function obtainSeasons() {
    setIsSeasonsLoading(true);

    try {
      const seasons = await getSeasons(params.id);
      setSeasons(seasons);
    } catch (error) {}

    setIsSeasonsLoading(false);
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
  function toggleInfo(isCollapsed) {
    setIsInfoCollapsed(isCollapsed);
  }

  function toggleSinopse(isCollapsed) {
    setIsSinopseCollapsed(isCollapsed);
  }

  function toggleSeasons(isCollapsed) {
    setIsSeasonsCollapsed(isCollapsed);
    if (!isCollapsed) scrollRef.current?.scrollToEnd({ animated: true });
  }

  function onPressSite() {
    params.officialSite && Linking.openURL(params.officialSite);
  }

  function onPressSeason(season: Season) {
    navigate('SeasonScreen', { season, showName: params.name });
  }

  const renderItem = useCallback(
    ({ item: season }) => (
      <SeasonItem onPress={() => onPressSeason(season)} {...season} />
    ),
    [],
  );
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container} ref={scrollRef}>
        <ShowPoster uri={params.image.medium} style={styles.image} />
        <Headline style={styles.name} selectable>
          {params.name}{' '}
          <Title style={styles.premiered}>({premieredYear})</Title>
        </Headline>
        <View style={styles.sections}>
          <Section
            style={styles.section}
            title="Show Info"
            isCollapsed={isInfoCollapsed}
            onToggleSection={toggleInfo}>
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
          <Section
            style={styles.section}
            title="Sinopse"
            isCollapsed={isSinopseCollapsed}
            onToggleSection={toggleSinopse}>
            <View style={styles.sectionContent}>
              <Body1>{sinopse}</Body1>
            </View>
          </Section>
          <Section
            style={styles.section}
            title="Seasons"
            isCollapsed={isSeasonsCollapsed}
            onToggleSection={toggleSeasons}>
            {isSeasonsLoading ? (
              <Loading style={styles.loading} />
            ) : (
              <FlatList
                data={seasons}
                horizontal
                style={styles.seasons}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.seasonsContent}
              />
            )}
          </Section>
        </View>
        <View style={styles.footer} />
      </ScrollView>
      <BackButton style={styles.backButton} />
    </View>
  );
};
