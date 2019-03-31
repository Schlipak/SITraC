import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const NextStationIndicatorWrapper = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  left: -4em;
  width: 4em;
  height: 4em;
  padding: 0;

  transform: translate(-50%, -50%);
  opacity: 0;

  ${props => props.isCurrent
    && props.isNext
    && css`
      opacity: 1;
    `};

  transition-property: opacity;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  > .chevron {
    position: absolute;
    top: 0;
    left: 50%;
    font-size: 4em;

    stroke: white;
    stroke-width: 8px;

    animation-duration: 1s;
    animation-delay: 1s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

    @keyframes AnimationScrollDownArrowChevronEnter {
      from {
        transform: translate(-100%, 0) scale(0.5);
        opacity: 0;
      }

      75%,
      to {
        transform: translate(-50%, 0) scale(1);
        opacity: 1;
      }
    }

    @keyframes AnimationScrollDownArrowChevronLeave {
      from {
        transform: translate(-50%, 0) scale(1);
        opacity: 1;
      }

      75%,
      to {
        transform: translate(0, 0) scale(0.5);
        opacity: 0;
      }
    }

    &:first-child {
      animation-name: AnimationScrollDownArrowChevronEnter;
    }

    &:last-child {
      animation-name: AnimationScrollDownArrowChevronLeave;
    }
  }
`;

const NextStationIndicator = forwardRef(({ isCurrent, isNext }, ref) => {
  const elementRef = useRef();

  useImperativeHandle(ref, () => elementRef.current);

  return (
    <NextStationIndicatorWrapper isCurrent={isCurrent} isNext={isNext} ref={elementRef}>
      <FontAwesomeIcon icon={faChevronRight} className="chevron" />
      <FontAwesomeIcon icon={faChevronRight} className="chevron" />
    </NextStationIndicatorWrapper>
  );
});

NextStationIndicator.propTypes = {
  isCurrent: PropTypes.bool,
  isNext: PropTypes.bool,
};

NextStationIndicator.defaultProps = {
  isCurrent: false,
  isNext: false,
};

export default NextStationIndicator;
