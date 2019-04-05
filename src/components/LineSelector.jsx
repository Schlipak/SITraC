import React, {
  useState, useRef, useEffect, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import LineIcon from './LineIcon';

import { Neutrals } from '../constants';
import { lineTypeToIcon } from '../utils';

const SelectorWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding-top: 5em;

  background-color: ${Neutrals.white.light};

  transform-origin: top;
  transform: translateY(-5em);
  opacity: 0;
  pointer-events: none;

  transition-property: transform, opacity;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  cursor: default;
  overflow-y: auto;
  z-index: 900;

  ${props => props.isOpen
    && css`
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    `};
`;

const SelectorInner = styled.div`
  position: relative;
  display: grid;
  flex-shrink: 0;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-rows: 2em;
  max-width: 1000px;
  width: 100%;
`;

const LineTypeWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-shrink: 0;
`;

const LineTypeContents = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-shrink: 0;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 4px;
    left: calc(1.75em - (0.25em / 2));
    width: 0.25em;
    height: calc(100% - 4px);

    background-color: currentColor;
    border-radius: 0.25em;
    opacity: 0.5;
  }

  > *:first-child {
    box-shadow: 0 0 0 4px ${Neutrals.white.light};
  }
`;

const LineList = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  margin: 0;
  margin-left: 1em;

  list-style: none;
`;

const LineDisplay = styled.button`
  display: flex;
  position: relative;
  align-items: center;
  margin: 0;
  padding: 0;
  padding-right: 1em;

  outline: none;
  border: none;
  background: none;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 1em;
  }

  > span {
    font-size: 1.25em;
    color: ${Neutrals.black.dark};

    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  > *:not(:last-child) {
    margin-right: 0.5em;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 1.5em;
    width: calc(100% - 1.5em);
    height: 100%;

    background-color: ${props => props.background};
    border-radius: ${props => (props.shape === 'circle' ? '4em' : '4px')};
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    transform-origin: left;
    transform: scaleX(0.25);
    opacity: 0;

    transition-property: transform, opacity;
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

    z-index: -1;
  }

  &:hover,
  &:focus {
    > span {
      color: ${props => props.foreground || 'white'};
    }

    &::before {
      transform: scaleX(1);
      opacity: 1;
    }
  }
`;

const LineSelector = ({ network, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const gridRef = useRef();

  const sortedLines = network.reduce((acc, line) => {
    const { type } = line;

    if (acc[type]) {
      acc[type].push(line);
    } else {
      acc[type] = [line];
    }

    return acc;
  }, {});

  const resizeItem = (item, rowHeight, rowGap) => {
    const { ceil } = Math;
    const { height } = item.querySelector('.contents').getBoundingClientRect();
    const rowSpan = ceil((height + rowGap) / (rowHeight + rowGap));

    item.style.gridRowEnd = `span ${rowSpan}`;
  };

  const resizeAllItems = () => {
    const { current: grid } = gridRef;

    const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue('grid-auto-rows'), 10);
    const rowGap = parseInt(getComputedStyle(grid).getPropertyValue('grid-row-gap'), 10);
    const items = Array.from(grid.getElementsByClassName('type'));

    items.forEach(item => resizeItem(item, rowHeight, rowGap));
  };

  useLayoutEffect(() => {
    resizeAllItems();
  }, []);

  const handleToggleOpenState = (event) => {
    if (event.key === ' ') {
      document.activeElement.blur();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape' && isOpen) {
      document.activeElement.blur();
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleToggleOpenState);
    return () => document.removeEventListener('keydown', handleToggleOpenState);
  });

  const handleOnClick = (line) => {
    document.activeElement.blur();
    onSelectionChange(line);
    setIsOpen(false);
  };

  return (
    <SelectorWrapper isOpen={isOpen}>
      <SelectorInner ref={gridRef}>
        {Object.entries(sortedLines).map(([type, lines]) => (
          <LineTypeWrapper key={type} className="type">
            <LineTypeContents className="contents">
              <LineIcon
                background="white"
                foreground={Neutrals.black.dark}
                shape="circle"
                border={`0.15em solid ${Neutrals.black.dark}`}
              >
                {lineTypeToIcon(type)}
              </LineIcon>
              <LineList>
                {lines.map(line => (
                  <LineDisplay
                    key={line.name}
                    {...line.options}
                    onClick={() => handleOnClick(line)}
                  >
                    <LineIcon {...line.options}>{line.options.icon || line.name}</LineIcon>
                    <span>{line.options.longName || line.name}</span>
                  </LineDisplay>
                ))}
              </LineList>
            </LineTypeContents>
          </LineTypeWrapper>
        ))}
      </SelectorInner>
    </SelectorWrapper>
  );
};

LineSelector.propTypes = {
  network: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  onSelectionChange: PropTypes.func,
};

LineSelector.defaultProps = {
  onSelectionChange: () => {},
};

export default LineSelector;
