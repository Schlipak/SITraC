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

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 160%;
    height: 160%;

    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
    background-color: ${props => props.lineColor};
    opacity: 0.25;

    transition-property: transform, opacity;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-delay: 0s;

    z-index: -1;
    pointer-events: none;
  }

  &::after {
    width: 200%;
    height: 200%;
  }

  ${props => props.isCurrent
    && !props.isNext
    && css`
      &::before,
      &::after {
        transform: translate(-50%, -50%) scale(1);
        transition-delay: 0.2s;
      }

      &::after {
        transition-delay: 0.3s;
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
        animation-duration: 0.5s;
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
