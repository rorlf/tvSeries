import { deviceWidth } from 'services';

export function calculateCardColumns(
  screenPadding: number,
  cardMinWidth: number,
) {
  const columns = (deviceWidth - screenPadding * 2) / cardMinWidth;

  return Math.floor(columns);
}
