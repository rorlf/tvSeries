import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Services
import { getShows, onPressFavorite, showError } from 'services';

// Constants
import { numPosterColumns } from 'shared/constants';

// Hooks
import { useTheme } from 'store/slices/themeSlice';
import { useNavigation } from '@react-navigation/native';

// Components
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Error, PosterWithName } from 'shared/components';

// Types
import { Show } from 'services/TvMazeService/types';
import { PosterWithNameProps } from 'shared/components/general/PosterWithName/types';

// Styles
import useStyles from './styles';

export const HomeScreen = () => {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [shows, setShows] = useState<Show[]>([]);
  const [page, setPage] = useState(0);
  const [reachedEndOfTheList, setReachedEndOfTheList] = useState(false);
  const showsItems = useMemo(() => createShowItems(), [shows]);
  const shouldDisplayError =
    shows.length === 0 && errorMessage && isLoading === false;

  useEffect(() => {
    obtainTvSeries();
  }, [page]);

  async function obtainTvSeries() {
    setIsLoading(true);
    setErrorMessage(undefined);
    try {
      const shows = await getShows(page);
      if (shows) {
        setShows(prevShows => {
          return prevShows.concat(shows);
        });
        return;
      }

      setReachedEndOfTheList(true);
    } catch (error) {
      const errorMessage = 'Error getting shows';
      showError(errorMessage);
      setErrorMessage(errorMessage);
    }

    setIsLoading(false);
  }

  function createShowItems(): PosterWithNameProps[] {
    return shows.map(show => {
      return {
        id: show.id,
        name: show.name,
        uri: show.image?.medium,
        onPressFavorite: () => onPressFavorite(show),
        onPress: () => navigate('ShowScreen', show),
      };
    });
  }

  const keyExtractor = useCallback(
    (show: PosterWithNameProps) => show.id.toString(),
    [],
  );
  const renderItem = useCallback(
    ({ item: show }: { item: PosterWithNameProps }) => (
      <PosterWithName {...show} />
    ),
    [],
  );
  const onEndReached = useCallback(() => {
    if (!reachedEndOfTheList) setPage(prevPage => prevPage + 1);
  }, [reachedEndOfTheList]);

  const renderFooter = useCallback(
    () => (
      <View style={styles.footer}>
        {isLoading && (
          <ActivityIndicator size="large" color={colors.textPrimary} />
        )}
      </View>
    ),
    [isLoading],
  );

  if (shouldDisplayError)
    return (
      <View style={styles.screen}>
        <Error
          style={styles.error}
          message={errorMessage}
          onPressRetry={obtainTvSeries}
        />
      </View>
    );

  return (
    <FlatList
      style={styles.screen}
      columnWrapperStyle={styles.columnWrapper}
      data={showsItems}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={onEndReached}
      ListFooterComponent={renderFooter}
      numColumns={numPosterColumns}
      showsVerticalScrollIndicator={false}
    />
  );
};
