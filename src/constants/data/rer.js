import {
  Line, Station, LineType, WalkTo,
} from '../lines';

export default [
  Line(
    LineType.OVERGROUND,
    'C',
    { shape: 'square', background: '#FAB136', longName: 'Ligne C' },
    Station('Saint-Cyprien Arènes', null, WalkTo('Arènes')),
    Station('Le TOEC'),
    Station('Lardenne'),
    Station('Saint-Martin-du-Touch'),
    Station('Ramassiers'),
    Station('Colomiers Gare SNCF'),
  ),
];
