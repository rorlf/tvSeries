import { deviceWidth } from 'services/DeviceService';
import { numPosterColumns } from 'shared/constants';
import { spacing } from 'shared/utils/styles';

const screenPadding = spacing(4);
const posterMinWidth = 150;
const posterMargin = spacing(0.5);
const posterWidth = calculatePosterWidth();

export const metrics = {
  screenPadding,
  posterMinWidth,
  posterWidth,
  posterMargin,
  footer: 80,
};

function calculatePosterWidth() {
  const posterAvailableWidth =
    (deviceWidth - screenPadding * 2) / numPosterColumns;
  const posterWidth = posterAvailableWidth - 2 * posterMargin;

  return Math.floor(posterWidth);
}
