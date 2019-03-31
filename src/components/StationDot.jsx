import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Neutrals } from '../constants';

const StationDotWrapper = styled.div`
  display: block;
  position: relative;
  width: 2.5em;
  height: 2.5em;

  border-radius: 50%;
  z-index: 1;

  ${props => props.isCurrent
    && !props.isNext
    && css`
      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        border-radius: 50%;
        border: 0.2em solid ${props.lineColor};
        transform: scale(0);
        opacity: 1;

        animation-name: Station-Dot_Bleep;
        animation-duration: 2s;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
        animation-delay: 0.5s;

        z-index: -1;
        pointer-events: none;
      }

      &::after {
        animation-delay: 1s;
      }
    `};
`;

const StationDotElement = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;

  background-color: ${Neutrals.white.lighter};
  border-radius: 50%;
  border: 0px solid transparent;

  transition-property: background-color, box-shadow, border;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  z-index: 1;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    color: ${props => (props.hasConnections ? 'white' : props.lineColor)};
    background-color: currentColor;
    box-shadow: 0 0 0 1px currentColor;
    border-radius: 50%;

    transition-property: color;
    transition-duration: 0.4s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  ${props => props.hasConnections
    && css`
      border: 0.3em solid #2f3542;
      box-shadow: 0 8px 0 -4px white;
    `};

  ${props => props.isCurrent
    && !props.isNext
    && css`
      border: 0.3em solid #2f3542;
      box-shadow: 0 0 0 4px white;

      &::before {
        color: ${props.lineColor};

        animation-name: Station-Dot_Blink;
        animation-duration: 1s;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    `}
`;

const StationDot = ({
  isCurrent, isNext, lineColor, hasConnections,
}) => (
  <StationDotWrapper
    isCurrent={isCurrent}
    isNext={isNext}
    lineColor={lineColor}
    hasConnections={hasConnections}
  >
    <StationDotElement
      isCurrent={isCurrent}
      isNext={isNext}
      lineColor={lineColor}
      hasConnections={hasConnections}
    />
  </StationDotWrapper>
);

StationDot.propTypes = {
  isCurrent: PropTypes.bool,
  isNext: PropTypes.bool,
  lineColor: PropTypes.string.isRequired,
  hasConnections: PropTypes.bool,
};

StationDot.defaultProps = {
  isCurrent: false,
  isNext: false,
  hasConnections: false,
};

export default StationDot;
