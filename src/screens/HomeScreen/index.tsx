import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Services
import { getShows } from 'services';

// Utils
import { calculateCardColumns } from 'shared/utils/card';

// Hooks
import { useTheme } from 'store/slices/themeSlice';

// Components
import { ShowItem } from './components';
import { FlatList } from 'react-native';

// Types
import { TvSeriesItemProps } from './components/ShowItem/types';
import { Show } from 'services/TvMazeService/types';

// Styles
import useStyles from './styles';

export const HomeScreen = () => {
  const styles = useStyles();
  const { metrics } = useTheme();
  const [tvSeries, setTvSeries] = useState<TvSeriesItemProps[]>([]);
  const [page, setPage] = useState(0);
  const columns = useMemo(
    () => calculateCardColumns(metrics.screenPadding, metrics.cardMinWidth),
    [metrics],
  );

  useEffect(() => {
    obtainTvSeries();
  }, [page]);

  async function obtainTvSeries() {
    const shows = await getShows(page);
    setTvSeries(prevTvSeries => {
      if (shows) {
        const tvSerieItems: TvSeriesItemProps[] = createTvSeriesItem(shows);
        return prevTvSeries.concat(tvSerieItems);
      }

      return prevTvSeries;
    });
  }

  function createTvSeriesItem(shows: Show[]): TvSeriesItemProps[] {
    return shows.map(show => {
      return {
        ...show,
        onPressFavorite: () => null,
        onPressTvSerie: () => null,
      };
    });
  }

  const keyExtractor = useCallback((show: Show) => show.id.toString(), []);
  const renderItem = useCallback(
    ({ item: show }) => <ShowItem onPressTvSerie={() => null} {...show} />,
    [],
  );
  const onEndReached = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  return (
    <FlatList
      style={styles.screen}
      columnWrapperStyle={styles.columnWrapper}
      data={tvSeries}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={onEndReached}
      numColumns={columns}
      key={columns}
      showsVerticalScrollIndicator={false}
    />
  );
};
