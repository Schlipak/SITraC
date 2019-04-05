import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LineIcon from './LineIcon';

import { lineTypeToIcon } from '../utils';
import { Neutrals } from '../constants';

const ConnectionsWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;

  font-size: 0.6em;
  opacity: ${props => (props.isCurrent ? 1 : 0.75)};

  transition-property: opacity;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: calc(-1 * (0.25em / 2));
    width: 0.25em;
    height: 100%;

    background-color: currentColor;
  }
`;

const ConnectionType = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 1.25em 0;
  padding-inline-start: 2em;

  &:last-child {
    margin-bottom: 1em;

    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: -0.5em;
      width: 1em;
      height: 1em;

      background-color: white;
      z-index: 100;
    }
  }
`;

export const ConnectionIcon = styled(LineIcon)`
  width: 1.75em;
  height: 1.75em;
  font-size: 1.75em;

  &:not(:last-child) {
    margin-right: 0.25em;
  }
`;

export const ConnectionTypeIcon = styled(ConnectionIcon)`
  position: absolute;
  left: 0;
  transform: translateX(-50%);
  box-shadow: 0 0 0 4px white;
`;

const StationConnections = ({ connections, isCurrent }) => (
  <ConnectionsWrapper isCurrent={isCurrent}>
    {Object.entries(connections).map(([type, entries]) => (
      <ConnectionType key={type}>
        <ConnectionTypeIcon
          background="white"
          foreground={Neutrals.black.dark}
          shape="circle"
          border={`0.15em solid ${Neutrals.black.dark}`}
        >
          <span>{lineTypeToIcon(type)}</span>
        </ConnectionTypeIcon>
        {entries.map((connection) => {
          const { line, station } = connection;

          return (
            <ConnectionIcon key={station.id} {...line.options}>
              {line.options.icon || line.name}
            </ConnectionIcon>
          );
        })}
      </ConnectionType>
    ))}
  </ConnectionsWrapper>
);

StationConnections.propTypes = {
  connections: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))),
  isCurrent: PropTypes.bool,
};

StationConnections.defaultProps = {
  connections: {},
  isCurrent: false,
};

export default StationConnections;
