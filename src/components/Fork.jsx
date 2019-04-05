import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Station from './Station';
import StationsLine from './StationsLine';

const ForkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const CurrentBranchWrapper = styled.div`
  position: relative;
  margin-left: 0em;

  font-size: 1rem;
  overflow: visible;
`;

const BranchesWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: calc(8em + 13em);

  font-size: 1rem;
  opacity: 0.5;

  z-index: -1;
`;

const SpacedStationsLine = styled.div`
  position: relative;
  margin-top: 10em;

  .station:not(:last-child) h2.station-name {
    display: none;
  }
`;

const BranchLine = styled.div`
  position: absolute;
  display: block;
  top: -2.5em;
  left: calc(-8em - 2.55em);

  width: 19em;
  height: 2em;

  transform-origin: left;
  transform: translateY(-50%) rotate(52.25deg);
  background-color: ${props => props.lineColor};
`;

const Fork = ({
  fork,
  isFirst,
  lineColor,
  isCurrent,
  isNext,
  currentStationId,
  options,
}) => {
  const { station, branches } = fork;
  const [firstBranch, ...otherBranches] = branches;

  return (
    <ForkWrapper>
      <Station
        station={station}
        isFirst={isFirst}
        lineColor={lineColor}
        isCurrent={isCurrent}
        isNext={isNext}
      />
      <CurrentBranchWrapper>
        <StationsLine
          key={firstBranch.id}
          stationsList={firstBranch.stations}
          options={options}
          currentStationId={currentStationId}
          isNext={isNext}
          noMargin
          noFirst
        />
      </CurrentBranchWrapper>
      <BranchesWrapper>
        {otherBranches.map(branch => (
          <Fragment key={branch.id}>
            <BranchLine lineColor={lineColor} />
            <SpacedStationsLine>
              <StationsLine
                stationsList={branch.stations}
                options={options}
                currentStationId={currentStationId}
                isNext={isNext}
                noMargin
                noFirst
              />
            </SpacedStationsLine>
          </Fragment>
        ))}
      </BranchesWrapper>
    </ForkWrapper>
  );
};

Fork.propTypes = {
  fork: PropTypes.objectOf(PropTypes.any).isRequired,
  isFirst: PropTypes.bool,
  isCurrent: PropTypes.bool,
  isNext: PropTypes.bool,
  lineColor: PropTypes.string,
  currentStationId: PropTypes.string.isRequired,
  options: PropTypes.objectOf(PropTypes.any).isRequired,
};

Fork.defaultProps = {
  isFirst: false,
  isCurrent: false,
  isNext: false,
  lineColor: 'red',
};

export default Fork;
