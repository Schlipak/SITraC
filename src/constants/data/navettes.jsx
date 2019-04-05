import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlane,
  faMoon,
  faFutbol,
  faFootballBall,
  faMicrophoneAlt,
} from '@fortawesome/free-solid-svg-icons';

import {
  Line, Station, LineType, WalkTo,
} from '../lines';

import { ReactComponent as CroixOccitane } from '../../assets/icons/croix_occitane.svg';
import { ReactComponent as Cemetery } from '../../assets/icons/cemetery.svg';

export default [
  Line(
    LineType.BUS,
    'Navette Aéroport',
    {
      shape: 'square',
      background: '#FCB338',
      icon: (
        <FontAwesomeIcon
          icon={faPlane}
          style={{ transformOrigin: 'center', transform: 'rotate(-25deg)' }}
        />
      ),
    },
    Station('Aéroport'),
    Station('Pont du Béarnais'),
    Station('Compans-Caffarelli'),
    Station('Jeanne d\'Arc'),
    Station('Matabiau Gare SNCF', null, WalkTo('Marengo SNCF')),
    Station('Gare Routière'),
  ),

  Line(
    LineType.BUS,
    'Navette Cimetières',
    {
      shape: 'square',
      background: '#0098D0',
      icon: <Cemetery />,
    },
    Station('Jolimont'),
    Station('Porte du Milieu'),
    Station('Porte de Caillibens'),
    Station('Jolimont'),
    Station('Marengo SNCF', null, WalkTo('Matabiau Gare SNCF')),
    Station('Jeanne d\'Arc'),
    Station('Canal du Midi'),
    Station('ZAC Ponts Jumeaux'),
    Station('Oratoire'),
    Station('Cimetière Cornebarrieu'),
    Station('Accueil Cimetière'),
    Station('Crématorium'),
    Station('Secteur I'),
    Station('Secteur G'),
    Station('Secteur F'),
    Station('Secteur D et E'),
    Station('Secteur B et C'),
    Station('Secteur A'),
    Station('Cimetière Cornebarrieu'),
  ),

  Line(
    LineType.BUS,
    'Noctambus',
    {
      shape: 'square',
      background: '#E31843',
      icon: <FontAwesomeIcon icon={faMoon} />,
      skipConnections: true,
    },
    Station('Marengo SNCF', null, WalkTo('Matabiau Gare SNCF')),
    Station('Bachelier'),
    Station('Jean Jaurès'),
    Station('Jeanne d\'Arc'),
    Station('Concorde'),
    Station('Compans-Caffarelli'),
    Station('Leclerc'),
    Station('Amidonners'),
    Station('Les Abattoirs'),
    Station('Saint-Cyprien République'),
    Station('Fer à Cheval'),
    Station('Cours Dillon'),
    Station('Pont Neuf'),
    Station('Esquirol'),
    Station('Carmes'),
    Station('Salin-Parlement'),
    Station('Palais de Justice'),
    Station('Notre Dame'),
    Station('Saint-Michel Marcel Langer'),
    Station('Récollets Daste'),
    Station('Camille Soula'),
    Station('Récollets'),
    Station('Saint-Agne SNCF'),
    Station('Delmas'),
    Station('Libellules'),
    Station('Pélude'),
    Station('Faculté de Pharmacie'),
    Station('Fac Dentaire'),
    Station('Université Paul Sabatier'),
    Station('Clotasses'),
    Station('Ramonville'),
  ),

  Line(
    LineType.BUS,
    'Navette Stadium',
    {
      shape: 'square',
      background: '#A58AC0',
      icon: <FontAwesomeIcon icon={faFutbol} />,
    },
    Station('Arènes', null, WalkTo('Saint-Cyprien Arènes')),
    Station('Stadium'),
  ),

  Line(
    LineType.BUS,
    'Navette Centre Ville',
    {
      shape: 'square',
      background: '#E875A4',
      icon: <CroixOccitane />,
    },
    Station('Cours Dillon'),
    Station('Pont Neuf'),
    Station('Brunière'),
    Station('Féral'),
    Station('Carmes'),
    Station('Trois Banquets'),
    Station('Jean Jaurès'),
    Station('Bellegarde'),
    Station('Rémusat'),
    Station('Saint-Sernin'),
    Station('Embarthe'),
    Station('Arsenal'),
    Station('Barcelone'),
    Station('Quai Saint-Pierre'),
    Station('Quai de la Daurade'),
    Station('Cours Dillon'),
  ),

  Line(
    LineType.BUS,
    'Navette Stade Ernest Wallon',
    {
      shape: 'square',
      background: '#DE0025',
      icon: <FontAwesomeIcon icon={faFootballBall} />,
    },
    Station('Barrière de Paris'),
    Station('Stade Ernest Wallon'),
  ),

  Line(
    LineType.BUS,
    'Navette Zénith',
    {
      shape: 'square',
      background: '#007B55',
      icon: <FontAwesomeIcon icon={faMicrophoneAlt} />,
    },
    Station('Arènes', null, WalkTo('Saint-Cyprien Arènes')),
    Station('Zénith'),
  ),
];
