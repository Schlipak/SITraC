import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StationDot from './StationDot';
import StationConnections from './StationConnections';

import { Colors, Neutrals } from '../constants';
import NextStationIndicator from './NextStationIndicator';

const StationWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 4em;

  color: #2f3542;

  &:first-of-type,
  &:last-of-type {
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      width: 50%;
      height: 100%;
      background-color: white;
      pointer-events: none;
      z-index: 1;
    }
  }

  &:first-of-type {
    margin-left: 0;

    &::before {
      right: 50%;
      width: calc(50vw + 3em);
    }
  }

  &:last-of-type {
    margin-right: 0;

    &::before {
      left: 50%;
      width: calc(50vw + 3em);
    }
  }
`;

const StationName = styled.h2`
  position: absolute;
  top: 0;
  left: 0%;
  margin: 0.25em;
  padding: 0.35em;

  color: ${props => (props.isCurrent ? Neutrals.white.lighter : 'currentColor')};
  font-weight: 400;
  white-space: nowrap;
  transform-origin: left;
  transform: translate(0.5em, calc(-100% - 0.5em)) rotate(-25deg);

  transition-property: color;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  z-index: 100;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: ${Colors.blue.dark};
    border-radius: 4px;
    transform-origin: left;
    transform: scaleX(${props => (props.isCurrent ? 1 : 0)});
    opacity: ${props => (props.isCurrent ? 1 : 0)};

    transition-property: transform, opacity;
    transition-duration: 0.4s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

    z-index: -1;
  }
`;

const StationNameLabel = styled.p`
  margin: 0;
`;

const StationSubNameLabel = styled.p`
  margin: 0;
  font-size: 0.6em;
  opacity: 0.9;
  font-family: 'Frutiger', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Station = ({
  station, isFirst, isCurrent, isNext, lineColor, network,
}) => {
  const { name, subName, connections } = station;
  const hasConnections = Object.entries(connections).length !== 0;

  const stationRef = useRef();
  const nextStationIndicatorRef = useRef();

  useEffect(() => {
    if (isCurrent && isNext) {
      const { current: nextStationIndicatorElement } = nextStationIndicatorRef;

      if (nextStationIndicatorElement) {
        nextStationIndicatorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }
    } else if (isCurrent) {
      const { current: stationElement } = stationRef;
      stationElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, [isCurrent, isNext]);

  return (
    <StationWrapper isCurrent={isCurrent} isNext={isNext} ref={stationRef}>
      {!isFirst && (
        <NextStationIndicator isCurrent={isCurrent} isNext={isNext} ref={nextStationIndicatorRef} />
      )}
      <StationName isCurrent={isCurrent} isNext={isNext}>
        <StationNameLabel>{name}</StationNameLabel>
        {subName && <StationSubNameLabel>{subName}</StationSubNameLabel>}
      </StationName>
      <StationDot
        isCurrent={isCurrent}
        isNext={isNext}
        lineColor={lineColor}
        hasConnections={hasConnections}
      />
      {hasConnections && <StationConnections connections={connections} isCurrent={isCurrent} />}
    </StationWrapper>
  );
};

Station.propTypes = {
  station: PropTypes.objectOf(PropTypes.any).isRequired,
  isFirst: PropTypes.bool,
  isCurrent: PropTypes.bool,
  isNext: PropTypes.bool,
  lineColor: PropTypes.string,
  network: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

Station.defaultProps = {
  isFirst: false,
  isCurrent: false,
  isNext: false,
  lineColor: 'red',
};

export default Station;
