import React, { useCallback, useMemo, useState } from 'react';

// Services
import { searchPeople, showError } from 'services';

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
import { Person } from 'services/TvMazeService/types';
import { PosterWithNameProps } from 'shared/components/general/PosterWithName/types';

// Styles
import useStyles from './styles';

export const PeopleSearchScreen = () => {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const [searchString, setSearchString] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const peopleItems = useMemo(() => createPeopleItems(), [people]);
  const searchStringDebounced = useDebounce(searchString, 500);
  const shouldDisplayError =
    people.length === 0 && hasError && isLoading === false;

  useNonInitialEffect(() => {
    obtainPeople();
  }, [searchStringDebounced]);

  async function obtainPeople() {
    setIsLoading(true);
    setHasError(false);
    setPeople([]);
    try {
      const searchedPeople = await searchPeople(searchStringDebounced);
      const people = searchedPeople.map(
        searchedPerson => searchedPerson.person,
      );
      setPeople(people);
    } catch (error) {
      showError('Error searching people');
      setHasError(true);
    }
    setIsLoading(false);
  }

  function createPeopleItems(): PosterWithNameProps[] {
    return people.map(person => {
      return {
        id: person.id,
        name: person.name,
        uri: person.image?.medium,
        onPress: () => navigate('PersonScreen', person),
        hideFavoriteButton: true,
      };
    });
  }

  const keyExtractor = useCallback(
    (person: PosterWithNameProps) => person.id.toString(),
    [],
  );
  const renderItem = useCallback(
    ({ item: person }: { item: PosterWithNameProps }) => (
      <PosterWithName {...person} />
    ),
    [],
  );

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;
    if (people.length === 0 && searchStringDebounced.length > 0)
      return <Body1>Could not find any person</Body1>;
    return <Body1>Start searching people</Body1>;
  }, [isLoading, people, searchStringDebounced]);

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
          message="Error searching people"
          onPressRetry={obtainPeople}
        />
      ) : (
        <FlatList
          keyboardShouldPersistTaps="handled"
          style={styles.content}
          columnWrapperStyle={styles.columnWrapper}
          data={peopleItems}
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
