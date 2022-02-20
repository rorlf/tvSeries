import Storage from 'data/Storage';
import { showMessage } from 'services';
import { Show } from 'services/TvMazeService/types';

export function onPressFavorite(show: Show) {
  const prevFavorites = Storage.getData('@favorites');
  if (prevFavorites) {
    const { isRemove, newFavorites } = createNewFavorites(prevFavorites, show);
    Storage.storeData('@favorites', newFavorites);
    showSuccessMessage(isRemove);
    return;
  }

  Storage.storeData('@favorites', [show]);
}

function createNewFavorites(prevFavorites: Show[], show: Show) {
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

  return {
    newFavorites,
    isRemove,
  };
}

function showSuccessMessage(isRemove: boolean) {
  if (isRemove) {
    showMessage('Removed from Favorites');
    return;
  }
  showMessage('Added to Favorites');
}
