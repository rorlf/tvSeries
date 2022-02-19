import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Services
import { getShows, showError } from 'services';

// Utils
import { numPosterColumns } from 'shared/utils/poster';

// Hooks
import { useTheme } from 'store/slices/themeSlice';
import { useNavigation } from '@react-navigation/native';

// Components
import { ShowItem } from './components';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Error } from 'shared/components';

// Types
import { ShowItemProps } from './components/ShowItem/types';
import { Show } from 'services/TvMazeService/types';

// Styles
import useStyles from './styles';

export const HomeScreen = () => {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [shows, setShows] = useState<Show[]>([]);
  const [page, setPage] = useState(0);
  const showsItems = useMemo(() => createShowItems(), [shows]);
  const shouldDisplayError =
    shows.length === 0 && hasError && isLoading === false;

  useEffect(() => {
    obtainTvSeries();
  }, [page]);

  async function obtainTvSeries() {
    setIsLoading(true);
    try {
      const shows = await getShows(page);
      setShows(prevShows => {
        if (shows) return prevShows.concat(shows);

        return prevShows;
      });
    } catch (error) {
      showError('Error getting shows');
      setHasError(true);
    }

    setIsLoading(false);
  }

  function createShowItems(): ShowItemProps[] {
    //   @todo adicionar isFavorite
    return shows.map(show => {
      return {
        ...show,
        onPressFavorite: () => null,
        onPressTvSerie: () => navigate('ShowScreen', show),
        isFavorite: true,
      };
    });
  }

  const keyExtractor = useCallback((show: Show) => show.id.toString(), []);
  const renderItem = useCallback(
    ({ item: show }) => <ShowItem {...show} />,
    [],
  );
  const onEndReached = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);
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
          message="Error getting shows"
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
