import { deviceWidth } from 'services';
import { numPosterColumns } from 'shared/utils/poster';

const baseline = 4;

const screenPadding = spacing(4);
const posterMinWidth = 150;
const posterMargin = spacing(0.5);
const posterWidth = calculatePosterWidth();

export const metrics = {
  screenPadding,
  posterMinWidth,
  posterWidth,
  posterMargin,
  spacing,
  footer: 80,
};

function spacing(value: number) {
  return value * baseline;
}

function calculatePosterWidth() {
  const posterAvailableWidth =
    (deviceWidth - screenPadding * 2) / numPosterColumns;
  const posterWidth = posterAvailableWidth - 2 * posterMargin;

  return Math.floor(posterWidth);
}
