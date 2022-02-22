import React, { useCallback, useMemo, useState } from 'react';

// Services
import { onPressFavorite, searchShows } from 'services';

// Constants
import { numPosterColumns } from 'shared/constants';

// Hooks
import { useNavigation } from '@react-navigation/native';
import { useDebounce, useNonInitialEffect } from 'shared/hooks';

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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [shows, setShows] = useState<Show[]>([]);
  const showsItems = useMemo(() => createShowItems(), [shows]);
  const searchStringDebounced = useDebounce(searchString, 500);
  const shouldDisplayError =
    shows.length === 0 && errorMessage && isLoading === false;

  useNonInitialEffect(() => {
    obtainTvSeries();
  }, [searchStringDebounced]);

  async function obtainTvSeries() {
    setIsLoading(true);
    setErrorMessage(undefined);
    setShows([]);
    try {
      const searchedShows = await searchShows(searchStringDebounced);
      const shows = searchedShows.map(searchedShow => searchedShow.show);
      setShows(shows);
    } catch (error) {
      setErrorMessage('Error searching shows');
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

  return (
    <View style={styles.screen}>
      <SearchInput
        style={styles.searchInput}
        onChangeSearchString={setSearchString}
        searchString={searchString}
      />
      {shouldDisplayError ? (
        <Error
          style={styles.error}
          message={errorMessage}
          onPressRetry={obtainTvSeries}
        />
      ) : (
        <FlatList
          keyboardShouldPersistTaps="handled"
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
      )}
    </View>
  );
};
