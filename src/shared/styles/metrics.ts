import { deviceWidth } from 'services';
import { calculateCardColumns } from 'shared/utils/card';

const baseline = 4;

const screenPadding = spacing(4);
const cardMinWidth = 150;
const cardMargin = spacing(0.5);
const cardWidth = calculateCardWidth();

export const metrics = {
  screenPadding,
  cardMinWidth,
  cardWidth,
  cardMargin,
  spacing,
};

function spacing(value) {
  return value * baseline;
}

function calculateCardWidth() {
  const columns = calculateCardColumns(screenPadding, cardMinWidth);
  const cardAvailableWidth = (deviceWidth - screenPadding * 2) / columns;
  const cardWidth = cardAvailableWidth - 2 * cardMargin;

  return Math.floor(cardWidth);
}
