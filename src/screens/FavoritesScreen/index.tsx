import React, { useCallback, useMemo, useState } from 'react';

// Services
import { onPressFavorite } from 'services';

// Utils
import { normalize } from 'shared/utils/string';

// Constants
import { numPosterColumns } from 'shared/constants';

// Hooks
import { useNavigation } from '@react-navigation/native';
import { useStorageValue } from 'data/Storage';
import { useDebounce } from 'shared/hooks';

// Components
import { FlatList, View } from 'react-native';
import { PosterWithName, SearchInput } from 'shared/components';

// Types
import { PosterWithNameProps } from 'shared/components/general/PosterWithName/types';

// Styles
import useStyles from './styles';

export const FavoritesScreen = () => {
  const [favorites] = useStorageValue('@favorites');
  const styles = useStyles();
  const { navigate } = useNavigation();
  const [searchString, setSearchString] = useState('');
  const searchStringDebounced = useDebounce(searchString, 500);
  const showsItems = useMemo(() => createShowItems(), [favorites]);
  const showItemsFiltered = useMemo(
    () => filterAndOrderShowItems(),
    [showsItems, searchStringDebounced],
  );

  function createShowItems(): PosterWithNameProps[] {
    return (
      favorites?.map(show => {
        return {
          id: show.id,
          name: show.name,
          uri: show.image?.medium,
          onPressFavorite: () => onPressFavorite(show),
          onPress: () => navigate('ShowScreen', show),
        };
      }) ?? []
    );
  }

  function filterAndOrderShowItems() {
    const filteredShowItems = showsItems.filter(show => {
      const nameNormalized = normalize(show.name);
      const searchStringNormalized = normalize(searchStringDebounced);
      return nameNormalized.includes(searchStringNormalized);
    });

    return filteredShowItems.sort((showA, showB) => {
      if (showA.name < showB.name) {
        return -1;
      }
      if (showA.name > showB.name) {
        return 1;
      }
      return 0;
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

  const renderFooter = useCallback(() => <View style={styles.footer} />, []);

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
        data={showItemsFiltered}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        numColumns={numPosterColumns}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
