import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

export const LineIconContainer = styled.h1`
  position: relative;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 0;
  height: 1.75em;
  width: 1.75em;
  margin: 0;
  line-height: 0 !important;
  vertical-align: middle;

  font-weight: bold;
  color: ${props => props.foreground};
  background-color: ${props => props.background};
  border-radius: ${props => (props.shape === 'circle' ? '50%' : '4px')};
  ${props => props.border
    && css`
      border: ${props.border};
    `};

  z-index: 100;
`;

const LineIcon = (props) => {
  const { children } = props;

  return (
    <LineIconContainer {...props}>
      {typeof children === 'string' ? (
        <span style={{ fontSize: `${1 / Math.max(1, children.length / 2)}em` }}>{children}</span>
      ) : (
        children
      )}
    </LineIconContainer>
  );
};

LineIcon.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

LineIcon.defaultProps = {
  children: null,
};

export default LineIcon;
