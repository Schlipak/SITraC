import { Line, Station, LineType } from '../lines';

export default [
  Line(
    LineType.CABLE_CAR,
    'TUS',
    {
      shape: 'square',
      background: '#9F217F',
      longName: 'Téléphérique Urbain Sud',
    },
    Station('Université Paul Sabatier'),
    Station('CHU Rangueil'),
    Station('Oncopole'),
  ),
];
