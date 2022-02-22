import React, { useCallback, useEffect, useState } from 'react';

// Components
import { FlatList, View } from 'react-native';
import {
  BackButton,
  Body1,
  Headline,
  Section,
  Poster,
  LoadingAndErrorHandler,
} from 'shared/components';
import { ShowItem } from './components';

// Services
import { getPersonCastCredits, getPersonCrewCredits } from 'services';

// Types
import { AppNavigatorParams } from 'navigators/AppNavigator/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  PersonCastCredits,
  PersonCrewCredits,
  Show,
} from 'services/TvMazeService/types';

// Styles
import useStyles from './styles';

type ScreenRouteProp = RouteProp<AppNavigatorParams, 'PersonScreen'>;

export const PersonScreen = () => {
  const { navigate } = useNavigation();
  const { params } = useRoute<ScreenRouteProp>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [shows, setShows] = useState<Show[]>([]);
  const styles = useStyles();

  useEffect(() => {
    obtainShows();
  }, []);

  async function obtainShows() {
    setIsLoading(true);
    setErrorMessage(undefined);
    setShows([]);
    try {
      const castCredits = await getPersonCastCredits(params.id);
      const crewCredits = await getPersonCrewCredits(params.id);
      const shows = createShows(castCredits, crewCredits);

      setShows(shows);
    } catch (error) {
      setErrorMessage('Error searching shows');
    }
    setIsLoading(false);
  }

  function createShows(
    castCredits: PersonCastCredits[],
    crewCredits: PersonCrewCredits[],
  ) {
    const shows: Show[] = [];
    castCredits.forEach(credit => {
      if (shows.some(show => show.id === credit._embedded.show.id)) return;
      shows.push(credit._embedded.show);
    });

    crewCredits.forEach(credit => {
      if (shows.some(show => show.id === credit._embedded.show.id)) return;
      shows.push(credit._embedded.show);
    });

    return shows;
  }

  function onPressShow(show: Show) {
    navigate('ShowScreen', show);
  }

  const renderShowItem = useCallback(
    ({ item: show }) => (
      <ShowItem onPress={() => onPressShow(show)} {...show} />
    ),
    [],
  );

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;

    return <Body1>No shows found</Body1>;
  }, [isLoading]);

  return (
    <View style={styles.screen}>
      <Poster uri={params.image?.medium} style={styles.image} />
      <Headline style={styles.name} selectable>
        {params.name}
      </Headline>
      <Section
        defaultIsCollapsedValue={false}
        title="Shows"
        style={styles.section}>
        <LoadingAndErrorHandler
          isLoading={isLoading}
          errorMessage={errorMessage}
          onPressRetry={obtainShows}>
          <FlatList
            data={shows}
            horizontal
            style={styles.shows}
            renderItem={renderShowItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.showsContent}
            ListEmptyComponent={renderEmpty}
          />
        </LoadingAndErrorHandler>
      </Section>
      <BackButton style={styles.backButton} />
    </View>
  );
};
