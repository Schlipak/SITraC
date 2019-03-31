import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBus, faTram, faSubway, faTrain,
} from '@fortawesome/free-solid-svg-icons';

import { LineType } from '../constants/lines';

export const lineTypeToIcon = (type) => {
  switch (type) {
  case LineType.BUS:
  case LineType.GUIDED_BUS:
  case LineType.TROLLEYBUS:
    return <FontAwesomeIcon icon={faBus} />;
  case LineType.BUS_RAPID_TRANSIT:
    return 'L';
  case LineType.CABLE_CAR:
    return <FontAwesomeIcon icon={faTram} />;
  case LineType.PEOPLE_MOVER:
    return <FontAwesomeIcon icon={faSubway} />;
  case LineType.METRO_TRAM:
  case LineType.METRO:
    return 'M';
  case LineType.MONORAIL:
  case LineType.OVERGROUND:
  case LineType.HIGH_SPEED_TRAIN:
  case LineType.TRAIN:
    return <FontAwesomeIcon icon={faTrain} />;
  case LineType.TRAM_TRAIN:
  case LineType.TRAM:
    return 'T';
  default:
    return '?';
  }
};
