import { Network } from './lines';

import metro from './data/metro';
import tram from './data/tram';
import lineo from './data/lineo';
import rer from './data/rer';
import navettes from './data/navettes';
import telepherique from './data/telepherique';

export * from './colors';

export const network = Network(
  // Line(
  //   LineType.METRO,
  //   'Test',
  //   { background: Colors.green.dark, shape: 'circle', longName: 'Ligne de test' },
  //   Station('Station 1'),
  //   Fork(
  //     Station('Station 2'),
  //     Branch(Station('Station 3', null, WalkTo('Autre Station')), Station('Station 4')),
  //     Branch(Station('Station 5'), Station('Station 6'), Station('Terminus Branche')),
  //   ),
  // ),

  // Line(
  //   LineType.METRO,
  //   'Autre',
  //   { background: Colors.yellow.dark, shape: 'circle', longName: 'Autre ligne de test' },
  //   Station('Autre Station'),
  // ),

  ...metro,
  ...tram,
  ...lineo,
  ...rer,
  ...navettes,
  ...telepherique,
);
