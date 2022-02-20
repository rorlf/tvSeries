import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Services
import { onPressFavorite, searchShows, showError } from 'services';

// Utils
import { numPosterColumns } from 'shared/utils/poster';

// Hooks
import { useNavigation } from '@react-navigation/native';
import { useDebounce } from 'shared/hooks';

// Components
import { FlatList, View } from 'react-native';
import {
  Body1,
  Error,
  Loading,
  PosterWithName,
  SearchInput,
} from 'shared/components';

// Types
import { Show } from 'services/TvMazeService/types';
import { PosterWithNameProps } from 'shared/components/general/PosterWithName/types';

// Styles
import useStyles from './styles';

export const SearchShowScreen = () => {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const [searchString, setSearchString] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [shows, setShows] = useState<Show[]>([]);
  const showsItems = useMemo(() => createShowItems(), [shows]);
  const searchStringDebounced = useDebounce(searchString, 500);
  const shouldDisplayError =
    shows.length === 0 && hasError && isLoading === false;

  useEffect(() => {
    obtainTvSeries();
  }, [searchStringDebounced]);

  async function obtainTvSeries() {
    setIsLoading(true);
    setHasError(false);
    setShows([]);
    try {
      const searchedShows = await searchShows(searchStringDebounced);
      const shows = searchedShows.map(searchedShow => searchedShow.show);
      setShows(shows);
    } catch (error) {
      showError('Error getting shows');
      setHasError(true);
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

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;
    if (shows.length === 0 && searchStringDebounced.length > 0)
      return <Body1>Could not find any show</Body1>;
    return <Body1>Start searching shows</Body1>;
  }, [isLoading, shows, searchStringDebounced]);

  const renderFooter = useCallback(
    () => <View style={styles.footer}>{isLoading && <Loading />}</View>,
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
    <View style={styles.screen}>
      <SearchInput
        style={styles.searchInput}
        onChangeSearchString={setSearchString}
        searchString={searchString}
      />
      <FlatList
        style={styles.content}
        columnWrapperStyle={styles.columnWrapper}
        data={showsItems}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        numColumns={numPosterColumns}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
