import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import LineIcon from './LineIcon';
import StationsLine from './StationsLine';

import { lineTypeToIcon } from '../utils';
import { Neutrals } from '../constants';
import { getStationFromNode } from '../constants/lines';

const LineWrapperContainer = styled.section`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  max-width: 100vw;
  height: 100vh;
  margin: 0;

  overflow: hidden;
`;

const LineIconContainer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  padding: 0.5em 1em;

  background-color: ${Neutrals.white.light};
  border-bottom-right-radius: 4px;
  font-size: 1.75em;

  z-index: 200;

  > *:not(:last-child) {
    margin-right: 0.25em;
  }
`;

const LineTerminus = styled.p`
  display: flex;
  align-self: stretch;
  align-items: center;
  margin: 0;
  margin-left: 0.5em;

  color: ${Neutrals.black.dark};
  font-size: 1.25em;
  cursor: ew-resize;

  z-index: 200;

  svg {
    margin: 0 0.5em;
    font-size: 0.75em;
    color: ${Neutrals.black.medium};

    transform: rotate(0deg);

    transition-property: transform;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &:hover {
    svg {
      transform: rotate(180deg);
    }
  }
`;

const Line = ({
  type, name, options, stations,
}) => {
  const [currentStation, setCurrentStation] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const stationsList = isReversed ? stations.slice().reverse() : stations;

  const firstStation = getStationFromNode(stationsList[0]);
  const lastStation = getStationFromNode(stationsList[stationsList.length - 1]);

  const currentStationId = `${name}-${
    isReversed ? stations.length - currentStation : currentStation + 1
  }`;

  useEffect(() => setCurrentStation(0), [stations]);

  const previousStation = () => {
    if (!isNext && currentStation > 0) {
      setIsNext(true);
    } else {
      setCurrentStation(Math.max(currentStation - 1, 0));
      setIsNext(false);
    }
  };

  const nextStation = () => {
    if (isNext) {
      setIsNext(false);
    } else if (currentStation < stationsList.length - 1) {
      setCurrentStation(Math.min(currentStation + 1, stationsList.length - 1));
      setIsNext(true);
    }
  };

  const toggleReverse = () => {
    setIsReversed(!isReversed);
    setCurrentStation(0);
    setIsNext(false);
  };

  const handleStationChange = (event) => {
    const key = event.keyCode || event.which;

    if (key === 37) previousStation();
    else if (key === 39) nextStation();
    else if (key === 84) toggleReverse();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleStationChange);
    return () => document.removeEventListener('keydown', handleStationChange);
  });

  return (
    <>
      <LineIconContainer>
        <LineIcon
          background="white"
          foreground="#2f3542"
          shape="circle"
          border="0.15em solid #2f3542"
        >
          <span>{lineTypeToIcon(type)}</span>
        </LineIcon>
        <LineIcon {...options}>{options.icon || name}</LineIcon>
        <LineTerminus onClick={toggleReverse}>
          <span>{firstStation.name}</span>
          <FontAwesomeIcon icon={faChevronRight} />
          <span>{lastStation.name}</span>
        </LineTerminus>
      </LineIconContainer>
      <LineWrapperContainer>
        <StationsLine
          stationsList={stationsList}
          options={options}
          currentStationId={currentStationId}
          isNext={isNext}
        />
      </LineWrapperContainer>
    </>
  );
};

Line.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.objectOf(PropTypes.any),
  stations: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
};

Line.defaultProps = {
  options: {},
  stations: [],
};

export default Line;
