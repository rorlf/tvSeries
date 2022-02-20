import Storage from 'data/Storage';
import { Show } from 'services/TvMazeService/types';

export function onPressFavorite(show: Show) {
  const prevFavorites = Storage.getData('@favorites');
  if (prevFavorites) {
    const newFavorites: Show[] = [];
    let isRemove = false;
    for (let index = 0; index < prevFavorites.length; index++) {
      const favoriteShow = prevFavorites[index];
      if (favoriteShow.id === show.id) {
        isRemove = true;
        continue;
      }
      newFavorites.push(favoriteShow);
    }
    if (!isRemove) {
      newFavorites.push(show);
    }
    Storage.storeData('@favorites', newFavorites);
    return;
  }

  Storage.storeData('@favorites', []);
}
