import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Station from './Station';
import Fork from './Fork';
import { NodeType } from '../constants/lines';

const StationsLineContainer = styled.section`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  max-width: 100vw;
  margin: 0;

  overflow: visible;
`;

const StationsWrapper = styled.div`
  display: flex;
  position: relative;
  padding: ${props => (props.noMargin ? '0' : '0 50vw')};
  font-size: 2em;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0.75em;
    left: ${props => (props.noMargin ? '0' : '50vw')};
    width: ${props => (props.noMargin ? '100%' : 'calc(100% - 100vw)')};
    height: 1em;

    background-color: ${props => props.lineColor};
    border-radius: 1em;
  }
`;

const StationsLine = ({
  stationsList,
  options,
  currentStationId,
  isNext,
  noMargin,
  noFirst,
}) => (
  <StationsLineContainer>
    <StationsWrapper lineColor={options.background} noMargin={noMargin}>
      {stationsList.map((node, i) => (node.type === NodeType.STATION ? (
        <Station
          key={node.id}
          station={node}
          isFirst={i === 0 && !noFirst}
          lineColor={options.background}
          isCurrent={node.id === currentStationId}
          isNext={isNext}
        />
      ) : (
        <Fork
          key={node.station.id}
          fork={node}
          isFirst={i === 0 && !noFirst}
          lineColor={options.background}
          isCurrent={node.station.id === currentStationId}
          isNext={isNext}
          currentStationId={currentStationId}
          options={options}
        />
      )))}
    </StationsWrapper>
  </StationsLineContainer>
);

StationsLine.propTypes = {
  stationsList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  options: PropTypes.objectOf(PropTypes.any).isRequired,
  currentStationId: PropTypes.string.isRequired,
  isNext: PropTypes.bool.isRequired,
  noMargin: PropTypes.bool,
  noFirst: PropTypes.bool,
};

StationsLine.defaultProps = {
  noMargin: false,
  noFirst: false,
};

export default StationsLine;
